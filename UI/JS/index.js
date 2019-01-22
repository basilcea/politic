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
    Display signup div as default div, hide others.
*/

signupButton.className = "button_active";
loginButton.className = "button_login";
resetButton.className = "button_login";
login.className = "layout_none";
reset.className = "layout_none";

/*  Trigger event when sign button is clicked,
    Display only signup div, hide others.
    change style of sign button to active.
*/

signupButton.onclick =()=>{
	signupButton.className ="button_active";
	loginButton.className ="button_login";
	resetButton.className = "button_login";
	signup.className = "layout_block";
	login.className = "layout_none";
	reset.className = "layout_none";
}

//  Center all paragragphs
let par = document.querySelectorAll("p");
for (let i=0; i<par.length; i++){
  par[i].className ="text_centered";
}

//  Get all forms
let form1 =document.getElementById("form1");

//  Get all submit buttons in the page
let signin =document.getElementById("signedin");


//  Get all requires form inputs
let signupdetails = form1.querySelectorAll("[required]");


/*  Ensure all required documents are inputted before submitting.
    Otherwise disable form submit button
*/
for(i=0;i<signupdetails[i].length;i++){
	if(signupdetails[i].value !==""){
		signin.disabled=false;
	}
}
