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

const token = localStorage.getItem('token');
const snackbar = document.getElementsByClassName('snackbar');

window.onload = () => {
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
        informat.editlastname.placeholder = data.data.lastname || 'last name';
        informat.editothername.placeholder = data.data.othername || 'other name';
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
        snackbar[0].innerHTML = 'Profile Edited successfully';
        if (data.data.info.registeras === 'politician' && data.data.info.isadmin === true) {
          localStorage.clear();
          window.location.replace('index.html');
        }
        else {
          window.location = 'profile.html';
        }
      }
      else {
        snackbar[0].innerHTML = data.error;
      }
    });
});

document.getElementById('changeForm').addEventListener('submit', (e) => {
  e.preventDefault();
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
        snackbar[1].innerHTML = 'Password change successful';
        document.getElementById('changeForm').reset();
      }
      else {
        snackbar[1].innerHTML = data.error;
      }
    });
});


const choice = document.getElementById('agreement');
const storedFirstname = localStorage.getItem('firstname');
let val;
document.getElementById('deletefirstname').oninput = () => {
  val = document.getElementById('deletefirstname').value.toLowerCase();
  if (val === storedFirstname.toLowerCase()) { document.getElementById('deleteButton').disabled = false; }
  else { document.getElementById('deleteButton').disabled = true; }
};
document.getElementById('deleteForm').addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('https://cea-politico-gres.herokuapp.com/api/v1/users/me', {
    method: 'DELETE',
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
        localStorage.clear();
        snackbar[2].innerHTML = 'Profile Deleted';
        window.location = 'index.html';
      }
      else {
        snackbar[2].innerHTML = data.error;
      }
    });
});


const fetchCandidatebyId = (id) => {
  fetch(`https://cea-politico-gres.herokuapp.com/api/v1/candidates/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  }).then(res => res.json())
    .then((data) => {
      if (data.status === 200) {

      }
    });

};
const fetchActivities = () => {
  fetch('https://cea-politico-gres.herokuapp.com/api/v1/users/me/votes', {
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
      console.log(data.data);
      if (data.status === 200) {
        const date = new Date(data.data[0].createdon).toLocaleString();
        console.log(date);
        const candidateId = data.data[0].candidate;
        fetch(`https://cea-politico-gres.herokuapp.com/api/v1/candidates/user/${candidateId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
          },
        })
          .then(res => res.json())
          .then((info) => {
            if (info.status === 200) {
              console.log(info.data);
              const officeName = info.data[0].officeName;
              const partyname = info.data[0].partyname;
              const candidateName = info.data[0].username;
              const tableObj = {
                officeName,
                partyname,
                candidateName,
                date,
              };
              const table = document.getElementById('voteActivity');
              for (let i = 0; i < data.data.length; i++) {
                const tr = document.createElement('tr');
                const array = Object.values(tableObj);
                table.appendChild(tr);
                for (let j = 0; j < 4; j++) {
                  const td = document.createElement('td');
                  td.setAttribute('class', 'layout_td');
                  table.lastChild.appendChild(td);
                  tr.cells[j].innerHTML = array[j];
                }
              }
            }
          });
      }
    });
};

addEventListener('load', window, fetchActivities());
