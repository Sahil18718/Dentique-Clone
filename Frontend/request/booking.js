//localhost:8000/appointment/648d3d899798e7bd78bf52ad

//http://localhost:8000/appointment/patient

const allcartBox = document.getElementById("allcartBox")

function apiFeatch() {
  fetch("http://localhost:8000/appointment/patient")
    .then((res) => res.json())
    .then((data) => {
      cartbox(data)
    })
    .catch((err) => {
      console.log(err);
    });
}

function cartbox(data) {
    allcartBox.innerHTML=null;
    
    data.map((elem,index)=>{

    const cardAppend = 
        `
        <div id="cartbox">
          <h4>${elem.user[0].name}</h4>
          <h4>${elem.date}</h4>
          <h4>${elem.time}</h4>
          <div>
           <button onclick="updateStatus()" id="acc">Accepted</button>
           <button onclick="updateStatus()" id="rej">Rejected</button>
          </div>
          
       </div>
       `

    //    allcartBox.appendChild('div',cardAppend)
    allcartBox.insertAdjacentHTML("beforeend", cardAppend);
    })
 
}

apiFeatch()

//http://localhost:8000/appointment/648d3d899798e7bd78bf52ad

let url=`http://localhost:8000/appointment/`
function updateStatus(id,param){
    console.log(id)
    alert("hfchfhj")
    fetch(`${url}${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "status":`${param}`
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
        })
        .catch((error) => {
            console.log(error);
        });
      
}

 //updateStatus()
