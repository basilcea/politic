/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/** Get Divs by their Id */
const run = document.getElementById('run');
const petition = document.getElementById('petition');
const candidate = document.getElementById('candidate');

/** Get all buttons on the page */
const buttons = document.querySelectorAll('button');
const Button0 = buttons[0];
const Button1 = buttons[1];
const Button2 = buttons[2];
const Button3 = buttons[3];
const Button4 = buttons[4];
const Button5 = buttons[5];

/**  Assign css classes to  each button to design the buttons
    Display run div as default div, hide others. */

Button0.className = 'button_active3';
Button1.className = 'button_login3';
Button2.className = 'button_login3';
Button3.className = 'button_active4';
Button4.className = 'button_login4';
Button5.className = 'button_login4';
petition.className = 'layout_none';
candidate.className = 'layout_none';

/** Trigger event when run button is clicked,
    Display only run div, hide others.
    change style of run button to active. */
Button0.onclick = () => {
  Button0.className = 'button_active3';
  Button1.className = 'button_login3';
  Button2.className = 'button_login3';
  run.className = 'layout_block';
  petition.className = 'layout_none';
  candidate.className = 'layout_none';
};
/** Trigger event when run button is clicked,
    Display only petition div, hide others.
    change style of petition button to active. */
Button1.onclick = () => {
  Button0.className = 'button_login3';
  Button1.className = 'button_active3';
  Button2.className = 'button_login3';
  run.className = 'layout_none';
  petition.className = 'layout_block';
  candidate.className = 'layout_none';
};


Button2.onclick = () => {
  Button0.className = 'button_login3';
  Button1.className = 'button_login3';
  Button2.className = 'button_active3';
  run.className = 'layout_none';
  petition.className = 'layout_none';
  candidate.className = 'layout_block';
};

Button3.onclick = () => {
  Button3.className = 'button_active4';
  Button4.className = 'button_login4';
  Button5.className = 'button_login4';
  run.className = 'layout_block';
  petition.className = 'layout_none';
  candidate.className = 'layout_none';
};
/** Trigger event when run button is clicked,
    Display only petition div, hide others.
    change style of petition button to active. */
Button4.onclick = () => {
  Button3.className = 'button_login4';
  Button4.className = 'button_active4';
  Button5.className = 'button_login4';
  run.className = 'layout_none';
  petition.className = 'layout_block';
  candidate.className = 'layout_none';
};


Button5.onclick = () => {
  Button3.className = 'button_login4';
  Button4.className = 'button_login4';
  Button5.className = 'button_active4';
  run.className = 'layout_none';
  petition.className = 'layout_none';
  candidate.className = 'layout_block';
};
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
};
