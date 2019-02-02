<<<<<<< HEAD
/** Get Divs by their Id*/
=======
/** Get Divs by their Id */
>>>>>>> 2ffd4e67b9b936273f22bf5cc07d345319d155cc
const run = document.getElementById('run');
const petition = document.getElementById('petition');

/** Get all buttons on the page */
const buttons = document.querySelectorAll('button');
const runButton = buttons[0];
const petitionButton = buttons[1];

/**  Assign css classes to  each button to design the buttons
    Display run div as default div, hide others. */

runButton.className = 'button_active3';
petitionButton.className = 'button_login3';
petition.className = 'layout_none';

/** Trigger event when run button is clicked,
    Display only run div, hide others.
    change style of run button to active. */
runButton.onclick = () => {
  runButton.className = 'button_active3';
  petitionButton.className = 'button_login3';
  run.className = 'layout_block';
  petition.className = 'layout_none';
};
/** Trigger event when run button is clicked,
    Display only petition div, hide others.
    change style of petition button to active. */
petitionButton.onclick = () => {
  petitionButton.className = 'button_active3';
  runButton.className = 'button_login3';
  run.className = 'layout_none';
  petition.className = 'layout_block';
};
<<<<<<< HEAD

/**Center all paragragphs */
let par = document.querySelectorAll("p");
for (let i=0; i<par.length; i++){
  par[i].className ="text_centered";
}
const icon = document.getElementsByClassName('background_icon')[0]
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
=======
<<<<<<< HEAD

/** Center all paragragphs */
const par = document.querySelectorAll('p');
for (let i = 0; i < par.length; i++) {
  par[i].className = 'text_centered';
}
const icon = document.getElementsByClassName('background_icon')[0];
const smallLink = document.getElementsByClassName('nav_horizontal_small');
=======
>>>>>>> fix(endpoints): fix create party endpoint

/** Center all paragragphs */
const par = document.querySelectorAll('p');
for (let i = 0; i < par.length; i++) {
  par[i].className = 'text_centered';
}
const icon = document.getElementsByClassName('background_icon')[0];
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
<<<<<<< HEAD

}
=======
};
>>>>>>> fix(endpoints): fix create party endpoint
>>>>>>> 2ffd4e67b9b936273f22bf5cc07d345319d155cc
