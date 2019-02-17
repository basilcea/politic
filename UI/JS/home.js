/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/** -----for small screen sizes------- */

/** get hamburger icon */
const icon = document.getElementsByClassName('background_icon')[0];

/** get nav list  */
const smallLink = document.getElementsByClassName('nav_horizontal_small');

/** style nav menu */
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
