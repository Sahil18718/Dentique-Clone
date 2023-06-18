if(!localStorage.getItem("token") || localStorage.getItem("token")=="undefined"){
  swal.fire({
      title : "Please Login",
      icon:"warning"
    }).then((result)=>{
      if(result.isConfirmed){  window.location.href="../index.html"}
    })
}


let baseUrl = "https://greasy-sofa-244-production.up.railway.app"
let doctor = JSON.parse( sessionStorage.getItem("doctor"));

// if(!user){window.location.href="./login.html"}
 if(!doctor){
    Swal.fire({
        title: 'Please Select a doctor',
        icon : 'error',
        confirmButtonText: 'Ok',
       
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.href="./doctors.html"
        } 
      })
  }

let doctorDetailsDiv = document.getElementById("doctorDetails");
doctorDetailsDiv.innerHTML=`  <img class="rounded-circle" style="width: 100px;height: 100px;" src=${doctor.profilePic} alt=${doctor.name}>
<div class="p-2">
  <h5>${doctor.name}</h5>
  <h6>${doctor.email}</h6>
  <h5><span class="badge bg-dark ms-2 ">${doctor.department}</span></h5>
  
</div>`

let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click",async(e)=>{
    try{
      e.preventDefault();
      let obj = {
        doctorId : doctor._id,
        date : document.getElementById("dateInput").value,
        time : document.getElementById("timeSlots").value,

      }
      
     
      // if(!obj.date){alert("select a date")}
      // else if(!obj.time){alert("select a time slot")}
      // else {
      //post request starts ______________________________________
        PostAppointment(obj)
        
      //post request ends ________________________________________
      //     }
    }catch(err){Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${err}`,
     
    })}
})


async function PostAppointment(obj){
 try{
  loaderStart();
  let response = await fetch(`${baseUrl}/appointment`, {
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
      title: 'Appointment Created Successfully',
      text : 'You can view your appointment status by clicking the button below',
     
      showCancelButton: true,
      confirmButtonText: 'View my appointment',
      cancelButtonText: `skip for now`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.location.href='./myappointments.html'
      } 
    })


  }
  //alert error
  else {
    loaderEnd();
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `${json}`,
   
  })}
    
 }catch(err){Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: `${err}`,
 
})}
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