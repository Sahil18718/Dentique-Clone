const baseServerUrl = 'http://localhost:8998/patient/login';
const emailEl = document.querySelector('input[type="email"]');
const passwordEl = document.querySelector('input[type="password"]');
const formEl = document.querySelector('#container .loginSection form');
formEl.addEventListener('submit', (evnt)=>{
    evnt.preventDefault();
    let email = emailEl.value;
    let password = passwordEl.value;
    login(email, password);
})

const login = async (email, password) => {
    let result = await fetch(`${baseServerUrl}`,{
        body: JSON.stringify({...{email}, ...{password}}),
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    });
    if(result.ok){
        alert('Login Successful');
    }
}