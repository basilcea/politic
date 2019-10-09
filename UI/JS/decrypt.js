let infot;
const host = 'http://127.0.0.1:8080' || 'https://basilcea.github.io/politico';
const decrypt = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location = 'index.html';
  }
  if (token !== null && window.location === `${host}/UI/`) {
    window.location = 'home.html';
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
      infot = data.data;
      if (data.status === 200) {
        /** get hamburger icon */
        const icon = document.getElementsByClassName('background_icon')[0];
        /** get nav list  */
        const smallLink = document.getElementsByClassName('nav_horizontal_small');
        if (infot.admin === true) {
          document.getElementById('fullAdmin').className = 'nav_horizontal layout_block';
          document.getElementById('fullPolitician').className = 'nav_horizontal layout_block';
          if (window.location.href === `${host}/UI/candidate.html`) {
            run.className = 'layout_none';
            petition.className = 'layout_none';
            viewInterests.className = 'layout_block';
            viewPetitions.className = 'layout_none';
            Button0.className = 'layout_none';
            Button2.className = 'layout_none';
            Button3.className = 'layout_none';
            Button1.className = 'button_active3';
            Button1.disabled = true
          }
        }
          else if (infot.status === 'politician') {
            document.getElementById('fullPolitician').className = 'nav_horizontal layout_block';
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
                  document.getElementById('smallAdmin').className = 'nav_horizontal_small layout_block';
                  document.getElementById('smallPolitician').className = 'nav_horizontal_small layout_block';
                   if (window.location.href === `${host}/UI/candidate.html`) {
                    Button4.className = 'layout_none';
                    Button6.className = 'layout_none';
                    Button7.className = 'layout_none';
                    Button5.className = 'layout_none';
                  }
                }
                else if (infot.status === 'politician') {
                  document.getElementById('smallPolitician').className = 'nav_horizontal_small layout_block';
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
    });
};

window.onload = decrypt();
