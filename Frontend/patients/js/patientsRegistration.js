const baseServerUrl = 'https://greasy-sofa-244-production.up.railway.app/patient/register';
const nameEl = document.querySelector('input[type="text"]');
const emailEl = document.querySelector('input[type="email"]');
const ageEl = document.querySelector('input[type="number"]');
const passwordEl = document.querySelector('input[type="password"]');
const formEl = document.querySelector('#container .loginSection form');
// const queryString = window.location.search;
// let urlParams = decodeURIComponent(queryString);
// localStorage.getItem('token')||localStorage.setItem('token', urlParams.split('"')[1]);
// if(token!==undefined){
//     window.location.href = 'http://127.0.0.1:5500/Frontend/index.html'
// }

formEl.addEventListener('submit', (evnt)=>{
    evnt.preventDefault();
    let email = emailEl.value;
    let password = passwordEl.value;
    let name = nameEl.value;
    let age = ageEl.value;
    login(email, password, name, age);
})

const login = async (email, password, name, age) => {
    let result = await fetch(`${baseServerUrl}`,{
        body: JSON.stringify({...{email}, ...{password},...{name}, ...{age}}),
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    });
    if(result.ok){
        popup();
        window.location.href = 'login.html'
    }
}

const popup = ()=>{
    alert ('Registration Completed');
}
