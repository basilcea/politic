/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/** Get Divs by their Id */
const login = document.getElementById('login');
const logon = document.getElementById('log');
const signup = document.getElementById('signup');
const signon = document.getElementById('sign');
const reset = document.getElementById('reset');
const icon = document.getElementById('hamburger');
const loginLink = document.getElementById('loginLink');
const backLink = document.getElementById('backLink');
const signupLink = document.getElementById('signupLink');
const resetLink = document.getElementById('resetLink');


/**  Get all buttons on the page */

const buttons = document.querySelectorAll('button');
const signupButton = buttons[0];
const loginButton = buttons[1];

/** Assign css classes to  each button to design the buttons
    Display Login div as default div, hide others.
*/

signupButton.className = 'button_login';
loginButton.className = 'button_active';
signup.className = 'layout_none';
reset.className = 'layout_none';

/** Trigger event when login button is clicked,
    Display only login div, hide others.
    change style of login button to active. */

loginButton.onclick = () => {
  location.href = 'home.html';
  loginButton.className = 'button_active';
  signupButton.className = 'button_login';
  login.className = 'layout_block';
  signup.className = 'layout_none';
  reset.className = 'layout_none';
  icon.className = 'background_icon';
};
/** Trigger event when signup button is clicked.
    Display only signup div, hide others.
    change style of signup button to active. */

signupButton.onclick = () => {
  signupButton.className = 'button_active';
  loginButton.className = 'button_login';
  signup.className = 'layout_block';
  login.className = 'layout_none';
  reset.className = 'layout_none';
  icon.className = 'background_icon';
};

/** Trigger event when reset link is clicked.
    Display only login div, with rest password content.
    change style of signup button to active. */

resetLink.onclick = () => {
  signupButton.className = 'button_login';
  loginButton.className = 'button_active';
  signup.className = 'layout_none';
  login.className = 'layout_none';
  reset.className = 'layout_block';
  icon.className = 'background_icon';
};

/** when go back linke is clicked, it should return you to login Div */
backLink.onclick = () => {
  loginButton.onclick();
};
/** when already signed up link is clicked, it should return you to login Div */
loginLink.onclick = () => {
  loginButton.onclick();
};
/** when signup link is clicked it should take you back to sign up div */
signupLink.onclick = () => {
  signupButton.onclick();
};

/** ------------- for small screen sizes -------------------*/

/** when signon link is clicked link back to signup div */
signon.onclick = () => {
  signupButton.onclick();
};
/** when lognon link is clicked link back to signup div */
logon.onclick = () => {
  loginButton.onclick();
};
/** style signup and login links for small screen sizes */
const smallLink = document.getElementsByClassName('nav_horizontal_small');

icon.onclick = () => {
  if (icon.className === 'background_icon') {
    icon.className = 'background_icon1';
    for (let i = 0; i < smallLink.length; i++) {
      smallLink[i].style.display = 'block';
    }
  } else {
    icon.className = 'background_icon';
    for (let i = 0; i < smallLink.length; i++) {
      smallLink[i].style.display = 'none';
    }
  }
};
/** Get all forms */




const previewed = document.getElementById('uploadedPassport');

const uploadButton = document.querySelector('.button_btn');


const minWidth = window.matchMedia('(min-width: 1040px)');
if (minWidth.matches) {
  uploadButton.style.marginLeft = '9vw';
  previewed.style.paddingLeft = '9vw';
} else {
  uploadButton.style.marginLeft = '';
  previewed.style.paddingLeft = '';
}

const loginData = {
  email: document.getElementById('login_email').value,
  password: document.getElementById('login_password').value,
};
const resetData = document.getElementById('reset_email').value;

const mywidget = cloudinary.createUploadWidget({
  cloudName: 'basilcea',
  uploadPreset: 'cea_politico',
  folder: 'politico',
  form: '#signupForm',
  fieldName: 'passportUrl',
  cropping: true,
},
(error, result) => {
  if (result && result.event === 'success') {
    passport = result.info.url;
    previewed.src = passport;
  }
  return previewed.src;
});

uploadButton.addEventListener('click', () => {
  // trigger the click of the file upload input
  mywidget.open();
});

host = 'https://cea-politico-gres.herokuapp.com';
signupError = document.getElementById('signupErrors');
loginError = document.getElementById('loginErrors');

// eslint-disable-next-line no-shadow

const createUser = (url, formData, errorDiv) => {
  const home = 'home.html';
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then((res) => {
      if (res.status === 201) {
        const { token, user } = res.data;
        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        errorDiv.innerHTML = ' Signup successful';
        window.location.replace(`${home}`);
      } else {
        // eslint-disable-next-line prefer-destructuring
        errorDiv.innerHTML = res.error;
      }
    });
};

document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const signupData = {
    firstname: document.getElementById('signup_firstname').value,
    lastname: document.getElementById('signup_lastname').value,
    othername: document.getElementById('signup_othername').value,
    email: document.getElementById('signup_email').value,
    passportUrl: previewed.src,
    phoneNumber: document.getElementById('signup_phonenumber').value,
    password: document.getElementById('signup_password').value,
    confirmPassword: document.getElementById('signup_confirmpassword').value,
    registerAs: document.getElementById('usertype').value,
  };
  createUser(`${host}/api/v1/auth/signup`, signupData, signupError);
});


document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const loginData = {
    email: document.getElementById('login_email').value,
    password: document.getElementById('login_password').value,

  };
  createUser(`${host}/api/v1/auth/login`, loginData , loginError);
});
