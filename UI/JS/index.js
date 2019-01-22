// Get Divs by their Id
const login = document.getElementById("login");
const signup = document.getElementById("signup");
const reset =  document.getElementById("reset");

//  Get all buttons on the page

const buttons = document.querySelectorAll("button");
const signupButton = buttons[0];
const loginButton = buttons[1];
const resetButton = buttons[2];

/*  Assign css classes to  each button to design the buttons
    Display Login div as default div, hide others.
*/

signupButton.className = "button_login";
loginButton.className = "button_active";
resetButton.className = "button_login";
signup.className = "layout_none";
reset.className = "layout_none";

/*  Trigger event when login button is clicked,
    Display only login div, hide others.
    change style of ogin button to active.
*/
loginButton.onclick =()=>{
	loginButton.className ="button_active";
	signupButton.className ="button_login";
	resetButton.className = "button_login";
	login.className = "layout_block";
	signup.className = "layout_none";
	reset.className = "layout_none";
}
/*  Trigger event when signup button is clicked.
    Display only signup div, hide others.
    change style of signup button to active.
*/
signupButton.onclick =()=>{
	signupButton.className ="button_active";
	loginButton.className ="button_login";
	resetButton.className = "button_login";
	signup.className = "layout_block";
	login.className = "layout_none";
	reset.className = "layout_none";
}
/* Trigger event when reset button is clicked,
   Display only reset div, hide others.
   change style of reset button to active.
*/
resetButton.onclick =()=>{
	resetButton.className ="button_active";
	loginButton.className ="button_login";
	signupButton.className = "button_login";
	reset.className = "layout_block";
	login.className = "layout_none";
	signup.className = "layout_none";
}
//  Center all paragragphs
let par = document.querySelectorAll("p");
for (let i=0; i<par.length; i++){
  par[i].className ="text_centered";
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
for(i=0;i<signupdetails[i].length;i++){
	if(signupdetails[i].value !==""){
		signin.disabled=false;
	}
}
for(i=0;i<enterdetails[i].length;i++){
  if(enterdetails[i].value !==""){
		enter.disabled=false;
  }
}
for(i=0;i<resetdetails[i].length;i++){
	if(resetdetails[i].value !==""){
		reseted.disabled=false;
  }
}
