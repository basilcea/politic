// Get Divs by their Id
const run = document.getElementById("run");
const petition = document.getElementById("petition");

//  Get all buttons on the page
const buttons = document.querySelectorAll("button");
const runButton = buttons[0];
const petitionButton = buttons[1];

/*  Assign css classes to  each button to design the buttons
    Display run div as default div, hide others.
*/
runButton.className = "button_active3";
petitionButton.className = "button_login3";
petition.className ="layout_none";

/*  Trigger event when run button is clicked,
    Display only run div, hide others.
    change style of run button to active.
*/
runButton.onclick =()=>{
	runButton.className ="button_active3";
	petitionButton.className ="button_login3";
	run.className ="layout_block";
	petition.className ="layout_none";
}

//  Center all paragragphs
let par = document.querySelectorAll("p");
for (let i=0; i<par.length; i++){
  par[i].className ="text_centered";
}