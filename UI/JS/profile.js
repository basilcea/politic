/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */

/** Get the various divs */
const viewProfile = document.getElementById('view');
const editProfile = document.getElementById('edit');
const voteActivity = document.getElementById('activity');
const deleteProfile = document.getElementById('delete');
const changePassword = document.getElementById('change');

/** Get the buttons */
const buttons = document.querySelectorAll('button');
const Button0 = buttons[0];
const Button1 = buttons[1];
const Button2 = buttons[2];
const Button3 = buttons[3];
const Button4 = buttons[4];
const Button5 = buttons[5];
const Button6 = buttons[6];
const Button7 = buttons[7];
const Button8 = buttons[8];
const Button9 = buttons[9];

/** Style buttons by */
Button0.className = 'button_active3';
Button1.className = 'button_login3';
Button2.className = 'button_login3';
Button3.className = 'button_login3';
Button4.className = 'button_login3';
Button5.className = 'button_active3';
Button6.className = 'button_login3';
Button7.className = 'button_login3';
Button8.className = 'button_login3';
Button9.className = 'button_login3';
editProfile.className = 'layout_none';
voteActivity.className = 'layout_none';
deleteProfile.className = 'layout_none';
changePassword.className = 'layout_none';

Button0.onclick = () => {
  Button0.className = 'button_active3';
  Button1.className = 'button_login3';
  Button2.className = 'button_login3';
  Button3.className = 'button_login3';
  Button4.className = 'button_login3';
  viewProfile.className = 'layout_block';
  editProfile.className = 'layout_none';
  voteActivity.className = 'layout_none';
  deleteProfile.className = 'layout_none';
  changePassword.className = 'layout_none';
};

Button1.onclick = () => {
  Button0.className = 'button_login3';
  Button1.className = 'button_active3';
  Button2.className = 'button_login3';
  Button3.className = 'button_login3';
  Button4.className = 'button_login3';
  viewProfile.className = 'layout_none';
  editProfile.className = 'layout_block';
  voteActivity.className = 'layout_none';
  deleteProfile.className = 'layout_none';
  changePassword.className = 'layout_none';
};

Button2.onclick = () => {
  Button0.className = 'button_login3';
  Button1.className = 'button_login3';
  Button2.className = 'button_active3';
  Button3.className = 'button_login3';
  Button4.className = 'button_login3';
  viewProfile.className = 'layout_none';
  editProfile.className = 'layout_none';
  voteActivity.className = 'layout_block';
  deleteProfile.className = 'layout_none';
  changePassword.className = 'layout_none';
};

Button3.onclick = () => {
  Button0.className = 'button_login3';
  Button1.className = 'button_login3';
  Button2.className = 'button_login3';
  Button3.className = 'button_active3';
  Button4.className = 'button_login3';
  viewProfile.className = 'layout_none';
  editProfile.className = 'layout_none';
  voteActivity.className = 'layout_none';
  deleteProfile.className = 'layout_none';
  changePassword.className = 'layout_block';
};
Button4.onclick = () => {
  Button0.className = 'button_login3';
  Button1.className = 'button_login3';
  Button2.className = 'button_login3';
  Button3.className = 'button_login3';
  Button4.className = 'button_active3';
  viewProfile.className = 'layout_none';
  editProfile.className = 'layout_none';
  voteActivity.className = 'layout_none';
  deleteProfile.className = 'layout_block';
  changePassword.className = 'layout_none';
};

Button5.onclick = () => {
  Button5.className = 'button_active3';
  Button6.className = 'button_login3';
  Button7.className = 'button_login3';
  Button8.className = 'button_login3';
  Button9.className = 'button_login3';
  viewProfile.className = 'layout_block';
  editProfile.className = 'layout_none';
  voteActivity.className = 'layout_none';
  deleteProfile.className = 'layout_none';
  changePassword.className = 'layout_none';
};

Button6.onclick = () => {
  Button5.className = 'button_login3';
  Button6.className = 'button_active3';
  Button7.className = 'button_login3';
  Button8.className = 'button_login3';
  Button9.className = 'button_login3';
  viewProfile.className = 'layout_none';
  editProfile.className = 'layout_block';
  voteActivity.className = 'layout_none';
  deleteProfile.className = 'layout_none';
  changePassword.className = 'layout_none';
};

Button7.onclick = () => {
  Button5.className = 'button_login3';
  Button6.className = 'button_login3';
  Button7.className = 'button_active3';
  Button8.className = 'button_login3';
  Button9.className = 'button_login3';
  viewProfile.className = 'layout_none';
  editProfile.className = 'layout_none';
  voteActivity.className = 'layout_block';
  deleteProfile.className = 'layout_none';
  changePassword.className = 'layout_none';
};

Button8.onclick = () => {
  Button5.className = 'button_login3';
  Button6.className = 'button_login3';
  Button7.className = 'button_login3';
  Button8.className = 'button_active3';
  Button9.className = 'button_login3';
  viewProfile.className = 'layout_none';
  editProfile.className = 'layout_none';
  voteActivity.className = 'layout_none';
  deleteProfile.className = 'layout_none';
  changePassword.className = 'layout_block';
};
Button9.onclick = () => {
  Button5.className = 'button_login3';
  Button6.className = 'button_login3';
  Button7.className = 'button_login3';
  Button8.className = 'button_login3';
  Button9.className = 'button_active3';
  viewProfile.className = 'layout_none';
  editProfile.className = 'layout_none';
  voteActivity.className = 'layout_none';
  deleteProfile.className = 'layout_block';
  changePassword.className = 'layout_none';
};


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
/** Functionality for upload and preview image */
const uploadButton = document.querySelector('.button_btn');
const realInput = document.getElementById('realInput');

uploadButton.addEventListener('click', () => {
  realInput.click();
});
realInput.addEventListener('change', () => {
  const reader = new FileReader();
  reader.onload = () => {
    const previewed = document.getElementById('pix');
    previewed.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
});
/** Seed data structure for front end */
const info = [
  {
    Candidate: 'Prosper Umeytinwa-PDP',
    Type: 'Federal',
    Office: 'President-Nigeria',
  },
  {
    Candidate: 'Chris Nwanba-APC',
    Type: 'State',
    Office: 'Governor-Anambara',
  },
  {
    Candidate: 'Celestine Omin-PDP',
    Type: 'Legislative',
    Office: 'Senator-Anambara-Central',
  },
  {
    Candidate: 'Ire Aderikon-FDP',
    Type: 'Legislative',
    Office: 'Representative-Anambara-Federal-Constituency-IV',
  },
  {
    Candidate: 'Adaku Nyom-KOWA',
    Type: 'Local Government',
    Office: 'Chairman-Nnewi-North',
  },
];

/** Input seed database into table */
const values = Object.values(info);
const valuesArray = Object.values(values);
const table = document.getElementById('voteActivity');
for (let i = 0; i < info.length; i++) {
  const tr = document.createElement('tr');
  table.appendChild(tr);
  for (let j = 0; j < 3; j++) {
    const td = document.createElement('td');
    td.setAttribute('class', 'layout_td');
    table.lastChild.appendChild(td);
    const val = Object.values(valuesArray[i])[j];
    tr.cells[j].innerHTML = val;
  }
}
