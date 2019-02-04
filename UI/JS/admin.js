/** Get divs by their office */
const createParty = document.getElementById('create');
const editParty = document.getElementById('edit');
const deletedParty = document.getElementById('delete');
const createOffice = document.getElementById('office');

/** Get buttons */
const buttons = document.querySelectorAll('button');
const createButton = buttons[0];
const editButton = buttons[1];
const deletedButton = buttons[2];
const createdButton = buttons[3];

/** Style buttons and div functionality */
createButton.className = 'button_active2';
editButton.className = 'button_login2';
deletedButton.className = 'button_login2';
createdButton.className = 'button_login2';
editParty.className = 'layout_none';
deletedParty.className = 'layout_none';
createOffice.className = 'layout_none';

/** Trigger event when create button is clicked,
    Display only create div, hide others.
    change style of login button to active. */

createButton.onclick = () => {
  createButton.className = 'button_active2';
  editButton.className = 'button_login2';
  deletedButton.className = 'button_login2';
  createdButton.className = 'button_login2';
  createParty.className = 'layout_block';
  editParty.className = 'layout_none';
  deletedParty.className = 'layout_none';
  createOffice.className = 'layout_none';
};
/** Trigger event when edit button is clicked,
    Display only edit div, hide others.
    change style of login button to active. */

editButton.onclick = () => {
  editButton.className = 'button_active2';
  createButton.className = 'button_login2';
  deletedButton.className = 'button_login2';
  createdButton.className = 'button_login2';
  editParty.className = 'layout_block';
  createParty.className = 'layout_none';
  deletedParty.className = 'layout_none';
  createOffice.className = 'layout_none';
};
/** Trigger event when delete button is clicked,
    Display only delete div, hide others.
    change style of login button to active. */

deletedButton.onclick = () => {
  deletedButton.className = 'button_active2';
  createButton.className = 'button_login2';
  editButton.className = 'button_login2';
  createdButton.className = 'button_login2';
  deletedParty.className = 'layout_block';
  createParty.className = 'layout_none';
  editParty.className = 'layout_none';
  createOffice.className = 'layout_none';
};
/** Trigger event when create office button is clicked,
    Display only create office div, hide others.
    change style of login button to active. */
createdButton.onclick = () => {
  deletedButton.className = 'button_login2';
  createButton.className = 'button_login2';
  editButton.className = 'button_login2';
  createdButton.className = 'button_active2';
  deletedParty.className = 'layout_none';
  createParty.className = 'layout_none';
  editParty.className = 'layout_none';
  createOffice.className = 'layout_block';
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
const fileInfo = document.querySelector('.button_upload');
const realInput = document.getElementById('realInput');

uploadButton.addEventListener('click', () => {
  // trigger the click of the file upload input
  realInput.click();
});

// wheh file upload button is clicked b
realInput.addEventListener('change', () => {
  // change the value of the uplaoaded file by spliting it
  const name = realInput.value.split(/\\|\//).pop();
  // truncate it if is more than 12digits
  const truncated = name.length > 12 ? name.substr(name.length - 12) : name;
  //
  fileInfo.innerHTML = truncated;
  // read the value of the uploaded document.
  const reader = new FileReader();
  reader.onload = () => {
    const previewed = document.getElementById('uploaded');
    previewed.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
});
