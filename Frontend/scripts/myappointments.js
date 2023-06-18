if(!localStorage.getItem("token") || localStorage.getItem("token")=="undefined" ){
    swal.fire({
        title : "Please Login",
        icon:"warning"
      }).then((result)=>{
        if(result.isConfirmed){  window.location.href="../index.html"}
      })
  }

let baseUrl = "https://greasy-sofa-244-production.up.railway.app"
let appointMentDiv = document.getElementById("appointMentDiv")
fetchAppointments()



async function fetchAppointments(){
    try{
    loaderStart();
  
    let res = await fetch(`${baseUrl}/appointment`, {
        method: 'GET',
       
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "token" : localStorage.getItem("token"),
        },
        });
    let json = await res.json();
    if(res.ok){
        loaderEnd()
        displayCards(json);
        
    }
   
    }catch(err){console.log(err)}
}



function displayCards(arr){
    appointMentDiv.innerHTML=null;
    if(arr.length==0){appointMentDiv.innerHTML=`<img style="width: 50%;height:400px; " src="https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-486.jpg" alt="">
    `}else{
 arr.forEach((item,i)=>{
   
    let maindiv = document.createElement("div");
        maindiv.classList.add("col-sm-5" ,"m-4")
    let card = document.createElement("div");
    card.classList.add("card");
    let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        let image = document.createElement("img");
             image.setAttribute("src",item.doctor[0].profilePic);
             image.setAttribute("style","width: 150px; height: 150px;");
             image.classList.add("rounded-circle");
        cardBody.append(image);
        let h5 = document.createElement("h5");
            
            h5.classList.add("card-title");
            h5.innerText=item.doctor[0].name;
        cardBody.append(h5);
        let p = document.createElement("p");
            p.classList.add("card-text");
            p.innerText=item.doctor[0].description;
        cardBody.append(p);
        let a1 = document.createElement("a");
            let color = "light";
            if(item.status=="pending"){color="info"}
            else if(item.status=="accepted"){color="success"}
            else if(item.status=="rejected"){color="warning"}
            a1.classList.add("btn",`btn-${color}`,"m-2");
            a1.innerText= item.status;
        cardBody.append(a1);
        let a2 = document.createElement("a");
            a2.classList.add("btn","m-2");
            a2.innerText= `${item.date} , ${item.time}`;
        cardBody.append(a2);
        let a31 = document.createElement("a");
        a31.classList.add("btn-success","btn","m-2");
        a31.innerHTML= "<i class='fa-sharp fa-solid fa-comment'></i>";
        a31.addEventListener("click",()=>{
            window.location.href="../chat/chat.html";
        })
        cardBody.append(a31);
        let a3 = document.createElement("a");
            a3.classList.add("btn-danger","btn","m-2");
            a3.innerHTML= "Delete";
            a3.addEventListener("click",()=>{
                deleteAppointment(item._id);
            })
        cardBody.append(a3);
    card.append(cardBody);
  maindiv.append(card)
  appointMentDiv.append(maindiv);

 })
}

}





async function fetchAndUpdate(id,status){
    try{
        let res = await fetch(`${baseUrl}/appointment/648c554010fe263473afa362`, {
                  method: 'PATCH',
                  body: JSON.stringify({status}),
                  headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token' :localStorage.getItem("token")
                  },

                                                                                  })
        let json = await res.json();
        alert(JSON.stringify(json,2,null))
    }catch(err){console.log(err)}

}

async function deleteAppointment(id){
 try{
   let res = await  fetch(`${baseUrl}/appointment/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'token' :localStorage.getItem("token")
          },
               });
  if(res.ok){
    location.reload();
  }
  else {alert("error occured");}
 }catch(err){alert(err);}
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