
/** Get the various divs */
const run = document.getElementById('run');
const petition = document.getElementById('petition');

/** Get the  the run and petition buttons */
const buttons = document.querySelectorAll('button');
const runButton = buttons[0];
const petitionButton = buttons[1];

/** Style the run and petition buttons by attaching */
runButton.className = 'button_active3';
petitionButton.className = 'button_login3';
petition.className = 'layout_none';

/** When run button is clicked it should make return only run div and makes changes to the button */
runButton.onclick = () => {
  runButton.className = 'button_active3';
  petitionButton.className = 'button_login3';
  run.className = 'layout_block';
  petition.className = 'layout_none';
};
/** When petition button is clicked  */
petitionButton.onclick = () => {
  petitionButton.className = 'button_active3';
  runButton.className = 'button_login3';
  run.className = 'layout_none';
  petition.className = 'layout_block';
};

/** get hamburger and nav bar for small screen sizes */
const icon = document.getElementsByClassName('background_icon')[0];
const smallLink = document.getElementsByClassName('nav_horizontal_small');
<<<<<<< HEAD

const icon = document.getElementsByClassName('background_icon')[0]
const smallLink = document.getElementsByClassName('nav_horizontal_small')
=======
>>>>>>> fix(endpoints): fix create party endpoint

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
const fileInfo = document.querySelector('.button_upload');
const realInput = document.getElementById('realInput');

<<<<<<< HEAD
}

=======
>>>>>>> fix(endpoints): fix create party endpoint
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
    Office: 'President-Nigeria'
  },
  {
    Candidate: 'Chris Nwanba-APC',
    Type: 'State',
    Office: 'Governor-Anambara'
  },
  {
    Candidate: 'Celestine Omin-PDP',
    Type: 'Legislative',
    Office: 'Senator-Anambara-Central'
  },
  {
    Candidate: 'Ire Aderikon-FDP',
    Type: 'Legislative',
    Office: 'Representative-Anambara-Federal-Constituency-IV'
  },
  {
    Candidate: 'Adaku Nyom-KOWA',
    Type: 'Local Government',
    Office: 'Chairman-Nnewi-North'
  }
];

/** Input seed database into table */
const values = Object.values(info);
const valuesArray = Object.values(values);
const table = document.getElementById('voteActivity');
for (let i = 0; i <= info.length; i++) {
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
