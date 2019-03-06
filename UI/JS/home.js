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


const viewParties = 'https://cea-politico-gres.herokuapp.com/api/v1/parties';
const viewOffices = 'https://cea-politico-gres.herokuapp.com/api/v1/offices';


window.onload = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location = 'index.html';
  }


  fetch(viewParties, {
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
        let div;
        console.log(data.data);
        const pictureDiv = document.getElementById('partyPix')
       ;
        for (let i = 0; i < data.data.length; i++) {
          const word = data.data[i].name.toLowerCase().split(' ');
          let acronymn;
          for (let j = 0; j < word.length; j++) {
            const letter = word[j].charAt(0).toUpperCase();
            acronymn = ''.concat(letter);
          }
          div = document.createElement('div');
          const figure = document.createElement('figure');
          const figCaption = document.createElement('figcaption');
          const image = document.createElement('img');
          image.src = data.data[i].logourl;
          figCaption.innerHTML = acronymn;
          figure.appendChild(image);
          figure.appendChild(figCaption);
          div.appendChild(figure);
          pictureDiv.appendChild(div);
        }

        const allDivs = document.getElementById('partyPix').querySelectorAll('div');
        console.log(pictureDiv);
        let counter = 0;
        for (let i = 0; i < allDivs.length; i++) {
          if (i % 5 === 0) {
            counter = 1;
          }
          else {
            counter++;
          }
          if (counter <= 5) {
            allDivs[i].className = `layout_left${counter}`;
          }
        }

      } else if (data.Message === 'Invalid Token') {
        window.location.replace('index.html');
      }
      else {
        return data.error;
      }
    });
};
