/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/** Get divs by their office */
const partyDiv = document.getElementById('partyDiv');
const officeDiv = document.getElementById('officeDiv');
const createParty = document.getElementById('createPart');
const editParty = document.getElementById('editPart');
const deleteParty = document.getElementById('deletePart');
const createOffice = document.getElementById('createOff');
const editOffice = document.getElementById('editOff');
const deleteOffice = document.getElementById('deleteOff');
/** Get buttons */
const buttons = document.querySelectorAll('button');
Button0 = buttons[0];
Button1 = buttons[1];
Button2 = buttons[2];
Button3 = buttons[3];
Button4 = buttons[4];
Button5 = buttons[5];
Button6 = buttons[6];
Button7 = buttons[7];
Button4 = buttons[4];
Button8 = buttons[8];
Button9 = buttons[9];
Button10 = buttons[10];
Button13 = buttons[13];
Button14 = buttons[14];
Button15 = buttons[15];
/** Style buttons and div functionality */
Button0.className = 'button_active3';
Button1.className = 'button_login3';
Button8.className = 'button_active4';
Button9.className = 'button_login4';
Button10.className = 'button_login4';
Button2.className = 'button_active5';
Button3.className = 'button_login5';
Button4.className = 'button_login5';
Button5.className = 'button_login5';
Button6.className = 'button_login5';
Button7.className = 'button_login5';
Button13.className = 'button_active4';
Button14.className = 'button_login4';
Button15.className = 'button_login4';
officeDiv.className = 'layout_none';
editParty.className = 'layout_none';
deleteParty.className = 'layout_none';

Button0.onclick = () => {
  Button0.className = 'button_active3';
  Button1.className = 'button_login3';
  Button8.className = 'button_active4';
  Button9.className = 'button_login4';
  Button10.className = 'button_login4';
  officeDiv.className = 'layout_none';
  partyDiv.className = 'layout_centered1 card_party';
  createParty.className = 'layout_block';
  editParty.className = 'layout_none';
  deleteParty.className = 'layout_none';
};


Button8.onclick = () => {
  Button8.className = 'button_active4';
  Button9.className = 'button_login4';
  Button10.className = 'button_login4';
  createParty.className = 'layout_block';
  editParty.className = 'layout_none';
  deleteParty.className = 'layout_none';
};


Button9.onclick = () => {
  Button8.className = 'button_login4';
  Button9.className = 'button_active4';
  Button10.className = 'button_login4';
  createParty.className = 'layout_none';
  editParty.className = 'layout_block';
  deleteParty.className = 'layout_none';
};


Button10.onclick = () => {
  Button8.className = 'button_login4';
  Button9.className = 'button_login4';
  Button10.className = 'button_active4';
  createParty.className = 'layout_none';
  editParty.className = 'layout_none';
  deleteParty.className = 'layout_block';
};

Button1.onclick = () => {
  Button0.className = 'button_login3';
  Button1.className = 'button_active3';
  partyDiv.className = 'layout_none';
  officeDiv.className = 'layout_centered1 card_party';
  createOffice.className = 'layout_block';
  editOffice.className = 'layout_none';
  deleteOffice.className = 'layout_none';
};

Button13.onclick = () => {
  Button13.className = 'button_active4';
  Button14.className = 'button_login4';
  Button15.className = 'button_login4';
  createOffice.className = 'layout_block';
  editOffice.className = 'layout_none';
  deleteOffice.className = 'layout_none';
};


Button14.onclick = () => {
  Button13.className = 'button_login4';
  Button14.className = 'button_active4';
  Button15.className = 'button_login4';
  createOffice.className = 'layout_none';
  editOffice.className = 'layout_block';
  deleteOffice.className = 'layout_none';
};


Button15.onclick = () => {
  Button13.className = 'button_login4';
  Button14.className = 'button_login4';
  Button15.className = 'button_active4';
  createOffice.className = 'layout_none';
  editOffice.className = 'layout_none';
  deleteOffice.className = 'layout_block';
};

Button2.onclick = () => {
  Button2.className = 'button_active5';
  Button3.className = 'button_login5';
  Button4.className = 'button_login5';
  Button5.className = 'button_login5';
  Button6.className = 'button_login5';
  Button7.className = 'button_login5';
  officeDiv.className = 'layout_none';
  partyDiv.className = 'layout_centered1 card_party';
  createParty.className = 'layout_block';
  editParty.className = 'layout_none';
  deleteParty.className = 'layout_none';
  createOffice.className = 'layout_none';
  editOffice.className = 'layout_none';
  deleteOffice.className = 'layout_none';
};

Button3.onclick = () => {
  Button2.className = 'button_login5';
  Button3.className = 'button_active5';
  Button4.className = 'button_login5';
  Button5.className = 'button_login5';
  Button6.className = 'button_login5';
  Button7.className = 'button_login5';
  officeDiv.className = 'layout_none';
  partyDiv.className = 'layout_centered1 card_party';
  createParty.className = 'layout_none';
  editParty.className = 'layout_block';
  deleteParty.className = 'layout_none';
  createOffice.className = 'layout_none';
  editOffice.className = 'layout_none';
  deleteOffice.className = 'layout_none';
};

Button4.onclick = () => {
  Button2.className = 'button_login5';
  Button3.className = 'button_login5';
  Button4.className = 'button_active5';
  Button5.className = 'button_login5';
  Button6.className = 'button_login5';
  Button7.className = 'button_login5';
  officeDiv.className = 'layout_none';
  partyDiv.className = 'layout_centered1 card_party';
  createParty.className = 'layout_none';
  editParty.className = 'layout_none';
  deleteParty.className = 'layout_block';
  createOffice.className = 'layout_none';
  editOffice.className = 'layout_none';
  deleteOffice.className = 'layout_none';
};
Button5.onclick = () => {
  Button2.className = 'button_login5';
  Button3.className = 'button_login5';
  Button4.className = 'button_login5';
  Button5.className = 'button_active5';
  Button6.className = 'button_login5';
  Button7.className = 'button_login5';
  officeDiv.className = 'layout_centered1 card_party';
  partyDiv.className = 'layout_none';
  createParty.className = 'layout_none';
  editParty.className = 'layout_none';
  deleteParty.className = 'layout_none';
  createOffice.className = 'layout_block';
  editOffice.className = 'layout_none';
  deleteOffice.className = 'layout_none';
};

Button6.onclick = () => {
  Button2.className = 'button_login5';
  Button3.className = 'button_login5';
  Button4.className = 'button_login5';
  Button5.className = 'button_login5';
  Button6.className = 'button_active5';
  Button7.className = 'button_login5';
  officeDiv.className = 'layout_centered1 card_party';
  partyDiv.className = 'layout_none';
  createParty.className = 'layout_none';
  editParty.className = 'layout_none';
  deleteParty.className = 'layout_none';
  createOffice.className = 'layout_none';
  editOffice.className = 'layout_block';
  deleteOffice.className = 'layout_none';
};

Button7.onclick = () => {
  Button2.className = 'button_login5';
  Button3.className = 'button_login5';
  Button4.className = 'button_login5';
  Button5.className = 'button_login5';
  Button6.className = 'button_login5';
  Button7.className = 'button_active5';
  officeDiv.className = 'layout_centered1 card_party';
  partyDiv.className = 'layout_none';
  createParty.className = 'layout_none';
  editParty.className = 'layout_none';
  deleteParty.className = 'layout_none';
  createOffice.className = 'layout_none';
  editOffice.className = 'layout_none';
  deleteOffice.className = 'layout_block';
};


/** ----------for small screen sizes */

/** get hamburger */
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
const par = document.querySelectorAll('p');
for (let i = 0; i < par.length; i++) {
  par[i].className = 'text_centered';
}

/** image upload and preview */
const uploadButton = document.querySelector('.button_btn');
const realInput = document.getElementById('realInput');

uploadButton.addEventListener('click', () => {
  // trigger the click of the file upload input
  realInput.click();
});

// wheh file upload button is clicked b
realInput.addEventListener('change', () => {
  // read the value of the uploaded document.
  const reader = new FileReader();
  reader.onload = () => {
    const previewed = document.getElementById('uploaded');
    previewed.src = reader.result;
  };
  // eslint-disable-next-line no-restricted-globals
  reader.readAsDataURL(event.target.files[0]);
});
