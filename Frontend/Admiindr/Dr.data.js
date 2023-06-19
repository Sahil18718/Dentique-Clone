if(!localStorage.getItem("token") || localStorage.getItem("token")=="undefined"){alert("please login")}
let form = document.getElementById("doctorform1");
let baseUrl = "https://greasy-sofa-244-production.up.railway.app"

form.addEventListener("submit",async(e)=>{
    try{
        e.preventDefault();
        let obj = {
            name : form.name.value,
            email: form.email.value,
            profilePic:form.imageURL.value,
            age : form.age.value,
            description:form.description.value,
            fees : form.fees.value,
            password:form.password.value,
            role: "Doctor",
        }
        if(!obj.name ){alert("please enter a name")}
        else if (!obj.email){alert("please enter an email")}
        else if (!obj.password){alert("please enter a password")}
        else if(!obj.profilePic){alert("please add a profile pic url")}
        else if(!obj.description){alert("please provide a description")}
        else if (!obj.fees){alert("please provide a consultation fees")}
        else{
           fetchAndUpdate(obj)
        }
       
    }catch(err){console.log(err)}
})



async function fetchAndUpdate(obj){
    
    try{
        loaderStart();
        let response = await fetch(`${baseUrl}/doctor/register`, {
                         method: 'POST',
                         body: JSON.stringify(obj),
                         headers: {
                           'Content-type': 'application/json; charset=UTF-8',
                           "token" : localStorage.getItem("token"),
                         },
                         });
        let json = await response.json();
        if(response.ok){
          loaderEnd()
          
          Swal.fire({
            icon:"success",
            title: 'Doctor Registered Successfully',
          
           
            
           
           
          })
      fetchAndUpdate()
      
        }
        //alert error
        else {
          loaderEnd();
        
        //   Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: `${json.msg}`,
         
        // })
    }
          
       }catch(err){
        console.log(err)
    }
   
      
}


//loader functionality
function loaderEnd(){
    let loader = document.getElementById("loader");
    loader.style.display="none";
  }
  
  function loaderStart(){
    let loader = document.getElementById("loader");
    loader.style.display="inline-block";
  }
 
   





  //lsiting all doctors
  let doctorsContainer = document.getElementById("doctorsContainer");
let data =[];
//________________________________________________________________________________________________________
fetchDoctors()
async function fetchDoctors(){
   loaderStart();
    let response = await fetch(`${baseUrl}/appointment/doctors`, {
      method: 'GET',
     
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        "token" : localStorage.getItem("token"),
      },
      });
    if(response.ok){loaderEnd()}
    let json     = await response.json();
    displayCards(json)

}

{/* <div class="col-lg-3 col-md-6 mb-4">

          <div class="card">

            <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light" >
              <img src="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg"
                class="w-100" />
              <a href="#!">
                <div class="mask">
                  <div class="d-flex justify-content-start align-items-end h-100">
                    <h5><span class="badge bg-dark ms-2">Dentist</span></h5>
                  </div>
                </div>
                <div class="hover-overlay">
                  <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                </div>
              </a>
            </div>



            <div class="card-body">
              <a href="" class="text-reset">
                <h5 class="card-title mb-2">Dr. Akash</h5>
              </a>

              <a href="" class="text-reset ">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, dignissimos.</p>
              </a>
              <h6 class="mb-3 price">$100</h6>
              <button  class="btn btn-dark">Book now</button>
            </div>


          </div>
        </div> */}






function displayCards(arr){
    arr.forEach((item,i)=>{
       let mainDiv =document.createElement("div");
       mainDiv.classList.add("col-lg-3","col-md-6", "mb-4");
         let card = document.createElement("div");
         card.classList.add("card");
          let top = document.createElement("div");
           top.classList.add("bg-image", "hover-zoom", "ripple", "ripple-surface", "ripple-surface-light");
            let image = document.createElement("img");
            image.classList.add("w-100","doctorImage")
            image.setAttribute("src",item.profilePic);
           top.append(image);
            let a = document.createElement("a");
            a.innerHTML=` <div class="mask">
             <div class="d-flex justify-content-start align-items-end h-100">
             <h5><span class="badge bg-dark ms-2">${item.department}</span></h5>
             </div>
             </div>
             <div class="hover-overlay">
             <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
             </div>`
           top.append(a);
           card.append(top);
           //card body
           let bottom = document.createElement("div");
              bottom.classList.add("card-body");
              let a1 = document.createElement("a");
              a1.classList.add("text-reset");
              a1.innerHTML=` <h5 class="card-title mb-2">${item.name}</h5>`
              bottom.append(a1);
              let a2 = document.createElement("a");
              a2.classList.add("text-reset");
              a2.innerHTML=`  <p>${item.description}</p>`
              bottom.append(a2);
              let h6 = document.createElement("h6");
              h6.classList.add("mb-3", "price");
              h6.innerText= `₹ ${item.fees}`;
              bottom.append(h6)
              let button = document.createElement("button");
              button.classList.add("btn", "btn-dark");
              button.innerHTML="Book Now"
              button.addEventListener("click",(e)=>{
                sessionStorage.setItem("doctor",JSON.stringify(item));
                window.location.href="./bookappointment.html";
              })
              let chatBtn = document.createElement("button");
              chatBtn.classList.add("btn","mr-1", "btn-success");
              chatBtn.innerHTML="<i class='fa-solid fa-comment'></i>"

              chatBtn.addEventListener("click",(e)=>{
               
                window.location.href="../chat/chat.html";
              })
              bottom.append(button);
              bottom.append(chatBtn);
           card.append(bottom);
    //card completed
    mainDiv.append(card);
    doctorsContainer.append(mainDiv)

    })
}

//loader functionality
function loaderEnd(){
  let loader = document.getElementById("loader");
  loader.style.display="none";
}

function loaderStart(){
  let loader = document.getElementById("loader");
  loader.style.display="inline-block";
}
