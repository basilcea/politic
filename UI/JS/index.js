// Get Divs by their Id
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



/**  Get all buttons on the page */

const buttons = document.querySelectorAll('button');
const signupButton = buttons[0];
const loginButton = buttons[1];

/** Assign css classes to  each button to design the buttons
    Display Login div as default div, hide others.
*/

signupButton.className = "button_login";
loginButton.className = "button_active";
signup.className = "layout_none";
reset.className = "layout_none";


/*  Trigger event when login button is clicked,
    Display only login div, hide others.
    change style of ogin button to active.
*/
loginButton.onclick =()=>{
  location.href='home.html'
	loginButton.className ="button_active";
	signupButton.className ="button_login";
	login.className = "layout_block";
	signup.className = "layout_none";
	reset.className = "layout_none";
  icon.className ="background_icon";
}
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
let form1 =document.getElementById("form1");
let form2 =document.getElementById("form2");
let form3 =document.getElementById("form3");

//  Get all submit buttons in the page
let signin =document.getElementById("signedin");
let enter =document.getElementById("enter");
let reseted =document.getElementById("reseted");

//  Get all requires form inputs
let signupdetails = form1.querySelectorAll("[required]");
let enterdetails = form2.querySelectorAll("[required]");
let resetdetails = form3.querySelectorAll("[required]");

/*  Ensure all required documents are inputted before submitting.
    Otherwise disable form submit button
*/
