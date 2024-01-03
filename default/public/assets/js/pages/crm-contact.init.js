function timeConvert(e){var t=new Date(e);time_s=t.getHours()+":"+t.getMinutes();var a=time_s.split(":"),n=a[0],i=a[1],l=n>=12?"PM":"AM";return(n=(n%=12)||12)+":"+(i=i<10?"0"+i:i)+l}function formatDate(e){var t=new Date(e),a=""+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],n=""+t.getDate(),i=t.getFullYear();return a.length<2&&(a="0"+a),n.length<2&&(n="0"+n),[n+" "+a,i].join(", ")}var checkAll=document.getElementById("checkAll");checkAll&&(checkAll.onclick=function(){for(var e=document.querySelectorAll('.form-check-all input[type="checkbox"]'),t=document.querySelectorAll('.form-check-all input[type="checkbox"]:checked').length,a=0;a<e.length;a++)e[a].checked=this.checked,e[a].checked?e[a].closest("tr").classList.add("table-active"):e[a].closest("tr").classList.remove("table-active");document.getElementById("remove-actions").style.display=t>0?"none":"block"});var perPage=8,editlist=!1,options={valueNames:["id","name","company_name","designation","date","email_id","phone","lead_score","tags"],page:perPage,pagination:!0,plugins:[ListPagination({left:2,right:2})]},contactList=new List("contactList",options).on("updated",(function(e){0==e.matchingItems.length?document.getElementsByClassName("noresult")[0].style.display="block":document.getElementsByClassName("noresult")[0].style.display="none";var t=1==e.i,a=e.i>e.matchingItems.length-e.page;document.querySelector(".pagination-prev.disabled")&&document.querySelector(".pagination-prev.disabled").classList.remove("disabled"),document.querySelector(".pagination-next.disabled")&&document.querySelector(".pagination-next.disabled").classList.remove("disabled"),t&&document.querySelector(".pagination-prev").classList.add("disabled"),a&&document.querySelector(".pagination-next").classList.add("disabled"),e.matchingItems.length<=perPage?document.querySelector(".pagination-wrap").style.display="none":document.querySelector(".pagination-wrap").style.display="flex",e.matchingItems.length>0?document.getElementsByClassName("noresult")[0].style.display="none":document.getElementsByClassName("noresult")[0].style.display="block"}));const xhttp=new XMLHttpRequest;xhttp.onload=function(){var e=JSON.parse(this.responseText);Array.from(e).forEach((function(e){var t=e.tags,a="";Array.from(t).forEach(((e,t)=>{a+='<span class="badge bg-primary-subtle text-primary me-1">'+e+"</span>"})),contactList.add({id:`<a href="javascript:void(0);" class="fw-medium link-primary">#VZ${e.id}</a>`,name:'<div class="d-flex align-items-center">            <div class="flex-shrink-0"><img src="'+e.name[0]+'" alt="" class="avatar-xs rounded-circle"></div>            <div class="flex-grow-1 ms-2 name">'+e.name[1]+"</div>            </div>",company_name:e.company_name,desc:e.desc,designation:e.designation,date:formatDate(e.date)+' <small class="text-muted">'+timeConvert(e.date)+"</small>",email_id:e.email_id,phone:e.phone,lead_score:e.lead_score,tags:a}),contactList.sort("id",{order:"desc"}),refreshCallbacks()})),contactList.remove("id",'<a href="javascript:void(0);" class="fw-medium link-primary">#VZ001</a>')},xhttp.open("GET","assets/json/contact-list.json"),xhttp.send(),isCount=(new DOMParser).parseFromString(contactList.items.slice(-1)[0]._values.id,"text/html"),document.querySelector("#customer-image-input").addEventListener("change",(function(){var e=document.querySelector("#customer-img"),t=document.querySelector("#customer-image-input").files[0],a=new FileReader;a.addEventListener("load",(function(){e.src=a.result}),!1),t&&a.readAsDataURL(t)}));var idField=document.getElementById("id-field"),customerImg=document.getElementById("customer-img"),customerNameField=document.getElementById("customername-field"),company_nameField=document.getElementById("company_name-field"),designationField=document.getElementById("designation-field"),email_idField=document.getElementById("email_id-field"),phoneField=document.getElementById("phone-field"),lead_scoreField=document.getElementById("lead_score-field"),addBtn=document.getElementById("add-btn"),editBtn=document.getElementById("edit-btn"),removeBtns=document.getElementsByClassName("remove-item-btn"),editBtns=document.getElementsByClassName("edit-item-btn");viewBtns=document.getElementsByClassName("view-item-btn"),refreshCallbacks(),document.getElementById("showModal").addEventListener("show.bs.modal",(function(e){e.relatedTarget.classList.contains("edit-item-btn")?(document.getElementById("exampleModalLabel").innerHTML="Edit Contact",document.getElementById("showModal").querySelector(".modal-footer").style.display="block",document.getElementById("add-btn").innerHTML="Update"):e.relatedTarget.classList.contains("add-btn")?(document.getElementById("exampleModalLabel").innerHTML="Add Contact",document.getElementById("showModal").querySelector(".modal-footer").style.display="block",document.getElementById("add-btn").innerHTML="Add Contact"):(document.getElementById("exampleModalLabel").innerHTML="List Contact",document.getElementById("showModal").querySelector(".modal-footer").style.display="none")})),ischeckboxcheck(),document.getElementById("showModal").addEventListener("hidden.bs.modal",(function(e){clearFields()})),document.querySelector("#contactList").addEventListener("click",(function(){ischeckboxcheck()}));var table=document.getElementById("customerTable"),tr=table.getElementsByTagName("tr"),trlist=table.querySelectorAll(".list tr"),dateValue=(new Date).toUTCString().slice(5,16);function currentTime(){var e=(new Date).getHours()>=12?"PM":"AM",t=(new Date).getHours()>12?(new Date).getHours()%12:(new Date).getHours(),a=(new Date).getMinutes()<10?"0"+(new Date).getMinutes():(new Date).getMinutes();return t<10?"0"+t+":"+a+" "+e:t+":"+a+" "+e}setInterval(currentTime,1e3);var count=11,tagInputField=new Choices("#taginput-choices",{removeItemButton:!0}),tagInputFieldValue=tagInputField.getValue(!0),tagHtmlValue="";Array.from(tagInputFieldValue).forEach(((e,t)=>{tagHtmlValue+='<span class="badge bg-primary-subtle text-primary me-1">'+e+"</span>"}));var forms=document.querySelectorAll(".tablelist-form");function ischeckboxcheck(){Array.from(document.getElementsByName("chk_child")).forEach((function(e){e.addEventListener("change",(function(t){1==e.checked?t.target.closest("tr").classList.add("table-active"):t.target.closest("tr").classList.remove("table-active");var a=document.querySelectorAll('[name="chk_child"]:checked').length;t.target.closest("tr").classList.contains("table-active"),document.getElementById("remove-actions").style.display=a>0?"block":"none"}))}))}function refreshCallbacks(){removeBtns&&Array.from(removeBtns).forEach((function(e){e.addEventListener("click",(function(e){e.target.closest("tr").children[1].innerText,itemId=e.target.closest("tr").children[1].innerText;var t=contactList.get({id:itemId});Array.from(t).forEach((function(e){deleteid=(new DOMParser).parseFromString(e._values.id,"text/html");var t=deleteid.body.firstElementChild;deleteid.body.firstElementChild.innerHTML==itemId&&document.getElementById("delete-record").addEventListener("click",(function(){contactList.remove("id",t.outerHTML),document.getElementById("deleteRecord-close").click()}))}))}))})),editBtns&&Array.from(editBtns).forEach((function(e){e.addEventListener("click",(function(e){e.target.closest("tr").children[1].innerText,itemId=e.target.closest("tr").children[1].innerText;var t=contactList.get({id:itemId});Array.from(t).forEach((function(e){isid=(new DOMParser).parseFromString(e._values.id,"text/html");var t=isid.body.firstElementChild.innerHTML,a=(new DOMParser).parseFromString(e._values.tags,"text/html").body.querySelectorAll("span.badge");t==itemId&&(editlist=!0,idField.value=t,customerImg.src=(new DOMParser).parseFromString(e._values.name,"text/html").body.querySelector("img").src,customerNameField.value=(new DOMParser).parseFromString(e._values.name,"text/html").body.querySelector(".name").innerHTML,company_nameField.value=e._values.company_name,designationField.value=e._values.designation,email_idField.value=e._values.email_id,phoneField.value=e._values.phone,lead_scoreField.value=e._values.lead_score,a&&Array.from(a).forEach((e=>{tagInputField.setChoiceByValue(e.innerHTML)})))}))}))})),Array.from(viewBtns).forEach((function(e){e.addEventListener("click",(function(e){e.target.closest("tr").children[1].innerText,itemId=e.target.closest("tr").children[1].innerText;var t=contactList.get({id:itemId});Array.from(t).forEach((function(e){if(isid=(new DOMParser).parseFromString(e._values.id,"text/html"),isid.body.firstElementChild.innerHTML==itemId){var t=`\n                        <div class="card-body text-center">\n                            <div class="position-relative d-inline-block">\n                                <img src="${(new DOMParser).parseFromString(e._values.name,"text/html").body.querySelector("img").src}" alt=""\n                                    class="avatar-lg rounded-circle img-thumbnail object-fit-cover">\n                                <span class="contact-active position-absolute rounded-circle bg-success"><span\n                                        class="visually-hidden"></span>\n                            </div>\n                            <h5 class="mt-4 mb-1">${(new DOMParser).parseFromString(e._values.name,"text/html").body.querySelector(".name").innerHTML}</h5>\n                            <p class="text-muted">${e._values.company_name}</p>\n\n                            <ul class="list-inline mb-0">\n                                <li class="list-inline-item avatar-xs">\n                                    <a href="javascript:void(0);"\n                                        class="avatar-title bg-success-subtle text-success fs-15 rounded">\n                                        <i class="ri-phone-line"></i>\n                                    </a>\n                                </li>\n                                <li class="list-inline-item avatar-xs">\n                                    <a href="javascript:void(0);"\n                                        class="avatar-title bg-danger-subtle text-danger fs-15 rounded">\n                                        <i class="ri-mail-line"></i>\n                                    </a>\n                                </li>\n                                <li class="list-inline-item avatar-xs">\n                                    <a href="javascript:void(0);"\n                                        class="avatar-title bg-warning-subtle text-warning fs-15 rounded">\n                                        <i class="ri-question-answer-line"></i>\n                                    </a>\n                                </li>\n                            </ul>\n                        </div>\n                        <div class="card-body">\n                            <h6 class="text-muted text-uppercase fw-semibold mb-3">Personal Information</h6>\n                            <p class="text-muted mb-4">${e._values.desc}</p>\n                            <div class="table-responsive table-card">\n                                <table class="table table-borderless mb-0">\n                                    <tbody>\n                                        <tr>\n                                            <td class="fw-medium" scope="row">Designation</td>\n                                            <td>${e._values.designation}</td>\n                                        </tr>\n                                        <tr>\n                                            <td class="fw-medium" scope="row">Email ID</td>\n                                            <td>${e._values.email_id}</td>\n                                        </tr>\n                                        <tr>\n                                            <td class="fw-medium" scope="row">Phone No</td>\n                                            <td>${e._values.phone}</td>\n                                        </tr>\n                                        <tr>\n                                            <td class="fw-medium" scope="row">Lead Score</td>\n                                            <td>${e._values.lead_score}</td>\n                                        </tr>\n                                        <tr>\n                                            <td class="fw-medium" scope="row">Tags</td>\n                                            <td>${e._values.tags}</td>\n                                        </tr>\n                                        <tr>\n                                            <td class="fw-medium" scope="row">Last Contacted</td>\n                                            <td>${e._values.date} <small class="text-muted"></small></td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>`;document.getElementById("contact-view-detail").innerHTML=t}}))}))}))}function clearFields(){customerImg.src="assets/images/users/user-dummy-img.jpg",customerNameField.value="",company_nameField.value="",designationField.value="",email_idField.value="",phoneField.value="",lead_scoreField.value="",tagInputField.removeActiveItems(),tagInputField.setChoiceByValue("0")}function deleteMultiple(){ids_array=[];var e=document.getElementsByName("chk_child");for(i=0;i<e.length;i++)if(1==e[i].checked){var t=e[i].parentNode.parentNode.parentNode.querySelector("td a").innerHTML;ids_array.push(t)}"undefined"!=typeof ids_array&&ids_array.length>0?Swal.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonClass:"btn btn-primary w-xs me-2 mt-2",cancelButtonClass:"btn btn-danger w-xs mt-2",confirmButtonText:"Yes, delete it!",buttonsStyling:!1,showCloseButton:!0}).then((function(e){if(e.value){for(i=0;i<ids_array.length;i++)contactList.remove("id",`<a href="javascript:void(0);" class="fw-medium link-primary">${ids_array[i]}</a>`);document.getElementById("remove-actions").style.display="none",document.getElementById("checkAll").checked=!1,Swal.fire({title:"Deleted!",text:"Your data has been deleted.",icon:"success",confirmButtonClass:"btn btn-info w-xs mt-2",buttonsStyling:!1})}})):Swal.fire({title:"Please select at least one checkbox",confirmButtonClass:"btn btn-info",buttonsStyling:!1,showCloseButton:!0})}Array.prototype.slice.call(forms).forEach((function(e){e.addEventListener("submit",(function(t){if(e.checkValidity())if(t.preventDefault(),""===customerNameField.value||""===company_nameField.value||""===email_idField.value||""===phoneField.value||""===lead_scoreField.value||""===designationField.value||editlist){if(""!==customerNameField.value&&""!==company_nameField.value&&""!==email_idField.value&&""!==phoneField.value&&""!==lead_scoreField.value&&""!==designationField.value&&editlist){var a=contactList.get({id:idField.value});Array.from(a).forEach((function(e){isid=(new DOMParser).parseFromString(e._values.id,"text/html");var t=isid.body.firstElementChild.innerHTML,a=tagInputField.getValue(!0),n="";Array.from(a).forEach(((e,t)=>{n+='<span class="badge bg-primary-subtle text-primary me-1">'+e+"</span>"})),t==itemId&&e.values({id:`<a href="javascript:void(0);" class="fw-medium link-primary">#VZ${idField.value}</a>`,name:'<div class="d-flex align-items-center">                            <div class="flex-shrink-0"><img src="'+customerImg.src+'" alt="" class="avatar-xs rounded-circle object-fit-cover"></div>                            <div class="flex-grow-1 ms-2 name">'+customerNameField.value+"</div>                            </div>",company_name:company_nameField.value,designation:designationField.value,email_id:email_idField.value,phone:phoneField.value,lead_score:lead_scoreField.value,tags:n,date:dateValue+' <small class="text-muted">'+currentTime()+"</small>"})})),document.getElementById("close-modal").click(),clearFields(),Swal.fire({position:"center",icon:"success",title:"Contact updated Successfully!",showConfirmButton:!1,timer:2e3,showCloseButton:!0})}}else{var n=tagInputField.getValue(!0),i="";Array.from(n).forEach(((e,t)=>{i+='<span class="badge bg-primary-subtle text-primary me-1">'+e+"</span>"})),contactList.add({id:`<a href="javascript:void(0);" class="fw-medium link-primary">#VZ${count}</a>`,name:'<div class="d-flex align-items-center">                    <div class="flex-shrink-0"><img src="'+customerImg.src+'" alt="" class="avatar-xs rounded-circle object-fit-cover"></div>                    <div class="flex-grow-1 ms-2 name">'+customerNameField.value+"</div>                    </div>",company_name:company_nameField.value,designation:designationField.value,email_id:email_idField.value,phone:phoneField.value,lead_score:lead_scoreField.value,tags:i,date:dateValue+' <small class="text-muted">'+currentTime()+"</small>"}),contactList.sort("id",{order:"desc"}),document.getElementById("close-modal").click(),clearFields(),refreshCallbacks(),count++,Swal.fire({position:"center",icon:"success",title:"Contact inserted successfully!",showConfirmButton:!1,timer:2e3,showCloseButton:!0})}else t.preventDefault(),t.stopPropagation()}),!1)})),document.querySelector(".pagination-next").addEventListener("click",(function(){document.querySelector(".pagination.listjs-pagination")&&(document.querySelector(".pagination.listjs-pagination").querySelector(".active")&&document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling.children[0].click())})),document.querySelector(".pagination-prev").addEventListener("click",(function(){document.querySelector(".pagination.listjs-pagination")&&(document.querySelector(".pagination.listjs-pagination").querySelector(".active")&&document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling.children[0].click())}));