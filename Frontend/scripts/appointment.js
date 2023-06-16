flatpickr("input[type='date-time-local']", {});

let input = document.querySelector("#date");
input.addEventListener("change",(e)=>{


    console.log(e.target.value)
})