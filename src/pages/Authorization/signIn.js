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
                switch (response) {
                    case response.status === 400 :
                        // peremennaya.innerHTML = response;
                        break;
                    case response.status === 401 :
                        // peremennaya.innerHTML = response;
                        break;
                    case response.status === 403:
                        // peremennaya.innerHTML = "User with login already exist";
                        break;
                    default:
                        // peremennaya.innerHTML = response;
                        //document.location='./src/pages/mainPage/mainScreen.html';
                        break;
                }
            })
    } catch (error) {
        console.log(error);
    }
}