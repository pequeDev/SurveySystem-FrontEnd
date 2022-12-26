const SERVERURL="http://api.surveysystem.xyz/";let NameData=document.getElementById("form-name-input"),DescriptionData=document.getElementById("form-description-input"),ResponseTables=document.getElementById("ResponseTables");async function add(){let{value:e}=await Swal.fire({title:"Ingresa la opcion",input:"text",inputPlaceholder:"",inputAttributes:{maxlength:16,autocapitalize:"off",autocorrect:"off"}});if(e){let t=document.createDocumentFragment(),a=t.appendChild(document.createElement("tr"));a.innerHTML=`
                          <td class="text-start py-2">${e}</td>
                          <td>
                          <button class="btn p-0 border-none mx-2"  type="button">
                          <i class="bi bi-pencil"></i>                          
                        </button>
                            <button class="btn p-0 border"  type="button">
                              <i class="bi bi-trash"></i>
                            </button>
                          </td>
    
                        `,ResponseTables.appendChild(a),save()}}async function edit(e){let{value:t}=await Swal.fire({title:"Edit option",input:"text",inputLabel:"Option",inputValue:e.path[3].children[0].innerText,inputAttributes:{maxlength:16,autocapitalize:"off",autocorrect:"off"}});t&&(e.path[3].children[0].innerText=t,save())}function send(e){ResponseTables.children.length>1&&(save(),(async()=>{try{await fetch("http://api.surveysystem.xyz/",{method:"POST",body:JSON.stringify({name:NameData.value,description:DescriptionData.value,data:localStorage.getItem("userData")})}).then(()=>{Swal.fire("Recibido","Tu encuesta fue recibida! <br> Link: (Disable Option)","success"),localStorage.clear(),ResponseTables.innerHTML=""})}catch(e){Swal.fire("ERROR","Tu encuesta fue NO pudo ser recibida!","error")}})())}function recuperate(){if(localStorage.getItem("userData")){ResponseTables.innerHTML="";let e=JSON.parse(localStorage.getItem("userData"));console.log(e),e.forEach(e=>{let t=document.createDocumentFragment(),a=t.appendChild(document.createElement("tr"));a.innerHTML=`
                          <td class="text-start py-2">${e}</td>
                          <td>
                          <button class="btn p-0 border-none mx-2"  type="button">
                          <i class="bi bi-pencil"></i>                          
                        </button>
                            <button class="btn p-0 border"  type="button">
                              <i class="bi bi-trash"></i>
                            </button>
                          </td>
    
                        `,ResponseTables.appendChild(a),save()})}}function save(){let e=[];Array.prototype.forEach.call(ResponseTables.children,function(t){e.push(t.children[0].innerText)}),localStorage.setItem("userData",JSON.stringify(e))}function clearAll(){Swal.fire({title:"Quieres borrar todos las opciones?",showCancelButton:!0,confirmButtonText:"Borrar"}).then(e=>{e.isConfirmed&&(localStorage.clear(),window.location.pathname=window.location.pathname)})}ResponseTables.addEventListener("click",e=>{"bi bi-trash"==e.target.className?Swal.fire({title:"Deseas Borrar esta respuesta?",showDenyButton:!0,confirmButtonText:"Borrar",denyButtonText:"Cancelar"}).then(t=>{t.isConfirmed&&(e.path[3].remove(),Swal.fire("Borrado!","","success"),save())}):"bi bi-pencil"==e.target.className&&edit(e)}),recuperate();