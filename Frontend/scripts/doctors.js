let baseUrl = `http://localhost:8000`
let doctorsContainer = document.getElementById("doctorsContainer");
let data =[];
//________________________________________________________________________________________________________
fetchDoctors()
async function fetchDoctors(){
    let response = await fetch(`${baseUrl}/appointment/doctors`);
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
              button.innerText="Book Now"
              button.addEventListener("click",(e)=>{
                alert("clicked me")
              })
              bottom.append(button);
           card.append(bottom);
    //card completed
    mainDiv.append(card);
    doctorsContainer.append(mainDiv)

    })
}
