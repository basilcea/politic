/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/** -----for small screen sizes------- */

const viewParties = 'https://cea-politico-gres.herokuapp.com/api/v1/parties';
const token = localStorage.getItem('token');
const viewOffices = 'https://cea-politico-gres.herokuapp.com/api/v1/offices';
window.onload = () => {
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
        const pictureDiv = document.getElementById('partyPix')
       ;
        for (let i = 0; i < data.data.length; i++) {
          const word = data.data[i].name.toLowerCase().split(' ');
          let acronymn = '';
          let letter;
          for (let j = 0; j < word.length; j++) {
            letter = word[j].charAt(0).toUpperCase();
            acronymn += letter;
          }
          div = document.createElement('div');
          const figure = document.createElement('figure');
          const figCaption = document.createElement('figcaption');
          const image = document.createElement('img');
          image.src = data.data[i].logourl;
          image.className = 'others_img2';
          figCaption.innerHTML = acronymn;
          figure.appendChild(image);
          figure.appendChild(figCaption);
          div.appendChild(figure);
          pictureDiv.appendChild(div);
        }

        const allDivs = document.getElementById('partyPix').querySelectorAll('div');
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

      }
      else {
        return data.error;
      }
    });
};
