/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */

/** Get the various divs */
const castVote = document.getElementById('cast');
const searchPoliticians = document.getElementById('search');
const checkResults = document.getElementById('check');


/** Get the buttons */
const buttons = document.querySelectorAll('button');
const Button0 = buttons[0];
const Button1 = buttons[1];
const Button2 = buttons[2];
const Button3 = buttons[3];
const Button4 = buttons[4];
const Button5 = buttons[5];


/** Style buttons by */
Button0.className = 'button_active3';
Button1.className = 'button_login3';
Button2.className = 'button_login3';
Button3.className = 'button_active4';
Button4.className = 'button_login4';
Button5.className = 'button_login4';
checkResults.className = 'layout_none';
searchPoliticians.className = 'layout_none';

Button0.onclick = () => {
  Button0.className = 'button_active3';
  Button1.className = 'button_login3';
  Button2.className = 'button_login3';
  castVote.className = 'layout_block';
  searchPoliticians.className = 'layout_none';
  checkResults.className = 'layout_none';
};

Button1.onclick = () => {
  Button0.className = 'button_login3';
  Button1.className = 'button_active3';
  Button2.className = 'button_login3';
  castVote.className = 'layout_none';
  searchPoliticians.className = 'layout_block';
  checkResults.className = 'layout_none';
};

Button2.onclick = () => {
  Button0.className = 'button_login3';
  Button1.className = 'button_login3';
  Button2.className = 'button_active3';
  castVote.className = 'layout_none';
  searchPoliticians.className = 'layout_none';
  checkResults.className = 'layout_block';
};

Button3.onclick = () => {
  Button3.className = 'button_active4';
  Button4.className = 'button_login4';
  Button5.className = 'button_login4';
  castVote.className = 'layout_block';
  searchPoliticians.className = 'layout_none';
  checkResults.className = 'layout_none';
};
Button4.onclick = () => {
  Button3.className = 'button_login4';
  Button4.className = 'button_active4';
  Button5.className = 'button_login4';
  castVote.className = 'layout_none';
  searchPoliticians.className = 'layout_block';
  checkResults.className = 'layout_none';
};

Button5.onclick = () => {
  Button3.className = 'button_login4';
  Button4.className = 'button_login4';
  Button5.className = 'button_active4';
  castVote.className = 'layout_none';
  searchPoliticians.className = 'layout_none';
  checkResults.className = 'layout_block';
}

/** get hamburger and nav bar for small screen sizes */
const icon = document.getElementsByClassName('background_icon')[0];
const smallLink = document.getElementsByClassName('nav_horizontal_small');

/** Make changes to Icon type */
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

/* eslint-disable no-undef */
/** implement toast for vote */
const vote = document.getElementById('vote');
vote.onclick = () => {
  const x = document.getElementById('snackbar');

  // Add the "show" class to DIV
  x.className = 'show';

  // After 3 seconds, remove the show class from DIV
  setTimeout(() => {
    x.className = x.className.replace('show', '');
  }, 3000);
};

// courtesy w3schools
