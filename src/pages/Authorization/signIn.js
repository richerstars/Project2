import './sign.css';
import axios from "axios";

const form = document.getElementById('form');
const password = document.getElementById('password');
const username = document.getElementById('username');

form.addEventListener('submit', e => {
    e.preventDefault();

    authorizate();
})

async function authorizate() {
    try {
        await axios.post('https://wowmeup.pp.ua/user/sign_in', {
            "login": username.value,
            "password": password.value
        })

            .then(function (response) {
                switch (true) {
                    case response.status === 400 :
                        // peremennaya.innerHTML = response;
                        break;
                    case response.status === 401 :
                      //  setErrorFor(username,response);
                        // peremennaya.innerHTML = response;
                        break;
                    case response.status === 403:
                     //   setErrorFor(username,"User with login already exist");
                        break;
                    default:
                        // peremennaya.innerHTML = response;
                        //document.location='./src/pages/mainPage/mainScreen.html';
                        break;
                }
            })
    } catch (error) {
        console.error(error);
    }
}
// function setErrorFor(input, message) {
//     const formControl = input.parentElement;
//     const small = formControl.querySelector('small');
//     formControl.className = 'form-control error';
//     small.innerText = message;
// }