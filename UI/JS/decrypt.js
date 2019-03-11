let infot;
const decrypt = () => {
    const token = localStorage.getItem('token');
    const snackbar = document.getElementById('snackbar');
  if (!token) {
    window.location = 'index.html';
  }
  fetch('https://cea-politico-gres.herokuapp.com/api/v1/auth/decrypt', {
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
      if (data.Message === 'Invalid Token') {
        window.location.replace('index.html');
      }
      if (data.status === 200) {
        infot = data.data;
        /** get hamburger icon */
        const icon = document.getElementsByClassName('background_icon')[0];
        /** get nav list  */
        const smallLink = document.getElementsByClassName('nav_horizontal_small');
        if (infot.admin === true) {
          document.getElementById('fullAdmin').className += ' layout_block';
          document.getElementById('fullPolitician').className = 'layout_none';

        }
        else if (infot.status === 'politician') {
          document.getElementById('fullPolitician').className = 'layout_block';
          document.getElementById('fullAdmin').className = 'layout_none';
        }
        else {
          document.getElementById('fullAdmin').className = 'layout_none';
          document.getElementById('fullPolitician').className = 'layout_none';
        }

        /** style nav menu */
        icon.onclick = () => {
          if (icon.className === 'background_icon') {
            icon.className = 'background_icon1';
            for (let i = 0; i < smallLink.length; i++) {
              smallLink[i].className = 'nav_horizontal_small layout_block';
              if (infot.admin === true) {
                document.getElementById('smallAdmin').className += ' layout_block';
                document.getElementById('smallPolitician').className = 'layout_none';
              }
              else if (infot.status === 'politician') {
                document.getElementById('smallPolitician').className = 'layout_block';
                document.getElementById('smallAdmin').className = 'layout_none';
              }
              else {
                document.getElementById('smallAdmin').className = 'layout_none';
                document.getElementById('fullAdmin').className = 'layout_none';
                document.getElementById('smallPolitician').className = 'layout_none';
                document.getElementById('fullPolitician').className = 'layout_none';
              }
            }
          } else {
            icon.className = 'background_icon';
            for (let i = 0; i < smallLink.length; i++) {
              smallLink[i].className = 'nav_horizontal_small layout_none';
            }
          }

        };

      }
      return infot;
    });


};

decrypt();
