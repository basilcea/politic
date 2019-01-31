// Get Divs by their Id
const login = document.getElementById('login');
const signup = document.getElementById('signup');
const reset = document.getElementById('reset');
const icon = document.getElementById('hamburger');
const loginLink = document.getElementById('loginLink');
const backLink = document.getElementById('backLink');
const signupLink = document.getElementById('signupLink');
const resetLink = document.getElementById('resetLink');

//  Get all buttons on the page

const buttons = document.querySelectorAll('button');
const signupButton = buttons[0];
const loginButton = buttons[1];

/*  Assign css classes to  each button to design the buttons
    Display Login div as default div, hide others.
*/

signupButton.className = 'button_login';
loginButton.className = 'button_active';
signup.className = 'layout_none';
reset.className = 'layout_none';

/*  Trigger event when login button is clicked,
    Display only login div, hide others.
    change style of ogin button to active.
*/
loginButton.onclick = () => {
  loginButton.className = 'button_active';
  signupButton.className = 'button_login';
  login.className = 'layout_block';
  signup.className = 'layout_none';
  reset.className = 'layout_none';
  icon.className = 'background_icon';
};
/*  Trigger event when signup button is clicked.
    Display only signup div, hide others.
    change style of signup button to active.
*/
signupButton.onclick = () => {
  signupButton.className = 'button_active';
  loginButton.className = 'button_login';
  signup.className = 'layout_block';
  login.className = 'layout_none';
  reset.className = 'layout_none';
  icon.className = 'background_icon';
};
resetLink.onclick = () => {
  signupButton.className = 'button_login';
  loginButton.className = 'button_active';
  signup.className = 'layout_none';
  login.className = 'layout_none';
  reset.className = 'layout_block';
  icon.className = 'background_icon';
};
backLink.onclick = () => {
  loginButton.onclick();
};
loginLink.onclick = () => {
  loginButton.onclick();
};
signupLink.onclick = () => {
  signupButton.onclick();
};
icon.onclick = () => {
  if (icon.className === 'background_icon') {
    icon.parentNode.insertBefore(icon, loginButton);
    icon.className = 'background_icon1';
    if (signupButton.className === 'button_active') {
      loginButton.className = 'button_full';
    } else {
      signupButton.className = 'button_full';
    }
  } else {
    icon.className = 'background_icon';
    if (signupButton.className === 'button_active') {
      loginButton.className = 'button_login';
    } else {
      signupButton.className = 'button_login';
    }
  }
};
//  Get all forms
const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
const form3 = document.getElementById('form3');

//  Get all submit buttons in the page
const signin = document.getElementById('signedin');
const enter = document.getElementById('enter');
const reseted = document.getElementById('reseted');

//  Get all requires form inputs
const signupdetails = form1.querySelectorAll('[required]');
const enterdetails = form2.querySelectorAll('[required]');
const resetdetails = form3.querySelectorAll('[required]');

/*  Ensure all required documents are inputted before submitting.
    Otherwise disable form submit button
*/
for (i = 0; i < signupdetails[i].length; i++) {
  if (signupdetails[i].value !== '') {
    signin.disabled = false;
  }
}
for (i = 0; i < enterdetails[i].length; i++) {
  if (enterdetails[i].value !== '') {
    enter.disabled = false;
  }
}
for (i = 0; i < resetdetails[i].length; i++) {
  if (resetdetails[i].value !== '') {
    reseted.disabled = false;
  }
}
