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

window.onload = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location = 'index.html';
  }

  const informat = {
    firstname: document.getElementById('firstname'),
    lastname: document.getElementById('lastname'),
    othername: document.getElementById('othername'),
    email: document.getElementById('email'),
    phone: document.getElementById('phonenumber'),
    passport: document.getElementById('uploaded'),
    status: document.getElementById('status'),
    editfirstname: document.getElementById('editFirstname'),
    editlastname: document.getElementById('editLastname'),
    editothername: document.getElementById('editOthername'),
    editemail: document.getElementById('editEmail'),
    editphone: document.getElementById('editPhonenumber'),
    editpassport: document.getElementById('uploadedPassport'),


  };


  fetch('https://cea-politico-gres.herokuapp.com/api/v1/users/me', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then(res => res.json())
    .then((data) => {
      if (data.status === 200) {
        informat.firstname.innerHTML = data.data.firstname;
        informat.lastname.innerHTML = data.data.lastname;
        informat.othername.innerHTML = data.data.othername;
        informat.email.innerHTML = data.data.email.toLowerCase();
        informat.phone.innerHTML = data.data.phonenumber;
        informat.status.innerHTML = data.data.registeras;
        informat.passport.src = data.data.passporturl;
        informat.editfirstname.placeholder = data.data.firstname;
        informat.editlastname.placeholder = data.data.lastname;
        informat.editothername.placeholder = data.data.othername;
        informat.editemail.placeholder = data.data.email.toLowerCase();
        informat.editphone.placeholder = data.data.phonenumber;
        informat.editpassport.src = data.data.passporturl;


      }
      else if (data.Message === 'Invalid Token') {
        window.location.replace('index.html');
      }
      else {
        return data.error;
      }
    });
};

document.getElementById('editProfileForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const editProf = {
    firstname: document.getElementById('editFirstname').value,
    lastname: document.getElementById('editLastname').value,
    othername: document.getElementById('editOthername').value,
    email: document.getElementById('editEmail').value,
    phoneNumber: document.getElementById('editPhonenumber').value,
    passportUrl: previewed.src,
    registerAs: document.getElementById('editStatus').value,
  };

  fetch('https://cea-politico-gres.herokuapp.com/api/v1/users/me/edit', {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(editProf),

  })
    .then(res => res.json())
    .then((data) => {
      if (data.status === 200) {
        window.location = 'profile.html';
      }
      else {
        document.getElementById('editError').innerHTML = data.error;
      }
    });
});

document.getElementById('changeForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const changePass = {
    oldPassword: document.getElementById('oldPword').value,
    newPassword: document.getElementById('newPword').value,
    confirmPassword: document.getElementById('confirmPword').value,


  };

  fetch('https://cea-politico-gres.herokuapp.com/api/v1/users/me/password', {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(changePass),

  })
    .then(res => res.json())
    .then((data) => {
      if (data.status === 200) {
        document.getElementById('changeError').innerHTML = 'Password change successful';
        document.getElementById('changeForm').reset();
      }
      else {
        document.getElementById('changeError').innerHTML = data.error;
      }
    });
  changePass.oldPassword = '';
  changePass.newPassword = '';
  changePass.confirmPassword = '';
});

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
