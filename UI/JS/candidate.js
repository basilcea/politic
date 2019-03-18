/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/** Get Divs by their Id */
const run = document.getElementById('run');
const petition = document.getElementById('petition');
const viewPetitions = document.getElementById('viewPetitions');
const viewInterests = document.getElementById('viewInterest');


/** Get all buttons on the page */
const buttons = document.querySelectorAll('button');
const Button0 = buttons[0];
const Button1 = buttons[1];
const Button2 = buttons[2];
const Button3 = buttons[3];
const Button4 = buttons[4];
const Button5 = buttons[5];
const Button6 = buttons[6];
const Button7 = buttons[7];

/* const Button12 = buttons[12];
const Button13 = buttons[13];
const Button14 = buttons[14];
const Button15 = buttons[15];
const Button16 = buttons[16];
const Button17 = buttons[17]; */

/**  Assign css classes to  each button to design the buttons
    Display run div as default div, hide others. */

Button0.className = 'button_active3';
Button1.className = 'button_login3';
Button2.className = 'button_login3';
Button3.className = 'button_login3';
Button4.className = 'button_login3';
Button5.className = 'button_login3';
Button6.className = 'button_active4';
Button7.className = 'button_login4';
run.className = 'layout_block';
petition.className = 'layout_none';
viewInterests.className = 'layout_none';
viewPetitions.className = 'layout_none';

/** Trigger event when run button is clicked,
    Display only run div, hide others.
    change style of run button to active. */
Button0.onclick = () => {
  Button0.className = 'button_active3';
  Button1.className = 'button_login3';
  Button2.className = 'button_login3';
  Button3.className = 'button_login3';
  run.className = 'layout_block';
  petition.className = 'layout_none';
  viewInterests.className = 'layout_none';
  viewPetitions.className = 'layout_none';
};
/** Trigger event when run button is clicked,
    Display only petition div, hide others.
    change style of petition button to active. */
Button1.onclick = () => {
  Button0.className = 'button_login3';
  Button1.className = 'button_active3';
  Button2.className = 'button_login3';
  Button3.className = 'button_login3';
  run.className = 'layout_none';
  viewInterests.className = 'layout_block';
  petition.className = 'layout_none';
  viewPetitions.className = 'layout_none';
};
Button2.onclick = () => {
  Button0.className = 'button_login3';
  Button1.className = 'button_login3';
  Button2.className = 'button_active3';
  Button3.className = 'button_login3';
  run.className = 'layout_none';
  viewInterests.className = 'layout_none';
  petition.className = 'layout_block';
  viewPetitions.className = 'layout_none';
};
Button3.onclick = () => {
  Button0.className = 'button_login3';
  Button1.className = 'button_login3';
  Button2.className = 'button_login3';
  Button3.className = 'button_active3';
  run.className = 'layout_none';
  viewInterests.className = 'layout_none';
  petition.className = 'layout_none';
  viewPetitions.className = 'layout_block';

};





/** Center all paragragphs */
const par = document.querySelectorAll('p');
for (let i = 0; i < par.length; i++) {
  par[i].className = 'text_centered';
}
const token = localStorage.getItem('token');
document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {
    office: document.getElementById('editOfficeName').value,
    party: document.getElementById('party').value,
  };
  fetch('https://cea-politico-gres.herokuapp.com/api/v1/interests', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then((res) => {
      if (res.status === 201) {
        // snackbar[0].innerHTML = 'Interest Successfully Indicated. Awaiting Admin Approval...';
        location.reload();
      } else {
        // eslint-disable-next-line prefer-destructuring
        snackbar[0].innerHTML = res.error;
      }
    });
});
