// Get Divs by their Id
<<<<<<< HEAD
const login = document.getElementById('login');
const signup = document.getElementById('signup');
const reset = document.getElementById('reset');
const icon = document.getElementById('hamburger');
const loginLink = document.getElementById('loginLink');
const backLink = document.getElementById('backLink');
const signupLink = document.getElementById('signupLink');
const resetLink = document.getElementById('resetLink');
=======
const login = document.getElementById("login");
const logon = document.getElementById("log");
const signup = document.getElementById("signup");
const signon = document.getElementById("sign");
const reset =  document.getElementById("reset");
const icon =  document.getElementById("hamburger");
const loginLink = document.getElementById('loginLink')
const backLink = document.getElementById('backLink')
const signupLink = document.getElementById('signupLink')
const resetLink = document.getElementById('resetLink')

>>>>>>> ft-ui-pages-163295058

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
<<<<<<< HEAD
loginButton.onclick = () => {
  loginButton.className = 'button_active';
  signupButton.className = 'button_login';
  login.className = 'layout_block';
  signup.className = 'layout_none';
  reset.className = 'layout_none';
  icon.className = 'background_icon';
};
=======
loginButton.onclick =()=>{
  location.href='home.html'
	loginButton.className ="button_active";
	signupButton.className ="button_login";
	login.className = "layout_block";
	signup.className = "layout_none";
	reset.className = "layout_none";
  icon.className ="background_icon";
}
>>>>>>> ft-ui-pages-163295058
/*  Trigger event when signup button is clicked.
    Display only signup div, hide others.
    change style of signup button to active.
*/
signupButton.onclick =()=>{
	signupButton.className ="button_active";
	loginButton.className ="button_login";
	signup.className = "layout_block";
	login.className = "layout_none";
	reset.className = "layout_none";
  icon.className ="background_icon"
}
resetLink.onclick =()=>{
	signupButton.className ="button_login";
	loginButton.className ="button_active";
	signup.className = "layout_none";
	login.className = "layout_none";
	reset.className = "layout_block";
  icon.className ="background_icon"
}
backLink.onclick =()=>{
  loginButton.onclick()
}
loginLink.onclick =()=>{
  loginButton.onclick()
}
signupLink.onclick =()=>{
  signupButton.onclick()
}
signon.onclick =()=>{
  signupButton.onclick()
}
logon.onclick =()=>{
  loginButton.onclick()
}
const smallLink = document.getElementsByClassName('nav_horizontal_small')
icon.onclick =()=>{
  if(icon.className === "background_icon"){
    icon.className='background_icon1';
    for (let i=0; i< smallLink.length ; i++ ){
      smallLink[i].style.display='block'
    }
  }
  else{
    icon.className='background_icon'
    for (let i=0; i< smallLink.length ; i++ ){
      smallLink[i].style.display='none'
    }
  }

}
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
<<<<<<< HEAD
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
=======
>>>>>>> ft-ui-pages-163295058
