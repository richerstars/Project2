import './signUp.css';
import axios from "axios";

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');

form.addEventListener('submit', e => {
    e.preventDefault();
    checkInputs();
    axiosFetch();
});

async function axiosFetch() {
    try {
        const response = await axios.post(' https://wowmeup.pp.ua/user/sing_up', {
            password: password.value,
            login: username.value,
            first_name: firstName.value,
            last_name: lastName.value
        })
            .then(function (response) {
                switch (response) {
                    case response.status === 400 :
                        // peremennaya.innerHTML = "Validation errors";
                        break;
                    case response.status === 403:
                        // peremennaya.innerHTML = "User with login already exist";
                        break;
                    default:
                        // peremennaya.innerHTML = "Registration successful";
                        document.location = './src/pages/mainPage/mainScreen.html';
                        break;
                }
            })
    } catch (error) {
        console.log(error);
    }
}

function checkInputs() {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    console.log(!passwordValue.match(/(?=.*[0-9])(?=.*[a-zA-Z])/i));
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else if (!usernameValue[0].match(/[a-zA-Z]/i)) {
        setErrorFor(username, 'Login must starts with a letter');
    } else if (!!usernameValue.match(/[^a-zA-Z0-9]/i)) {
        setErrorFor(username, 'Login must contains only letters and numbers');
    } else {
        setSuccessFor(username)
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else if (!passwordValue.match(/(?=.*[0-9])(?=.*[a-zA-Z])/i)) {
        setErrorFor(password, 'Password must have at least one letter and one number');
    } else if (passwordValue.length < 8) {
        setErrorFor(password, 'Password must have minimum eight characters')
    } else {
        setSuccessFor(password)
    }


    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'form-control error';
        small.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }
}
