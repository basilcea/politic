const smallLogout = document.getElementById('logout_full');
const fullLogout = document.getElementById('logout_small');

const logoutUrl = 'https://cea-politico-gres.herokuapp.com/api/v1/auth/logout';
const index = 'index.html';

const logout = (url) => {
  fetch(url)
    .then(res => res.json())
    .then((res) => {
      if (res.status === 200) {
        localStorage.clear();
        window.location.replace(`${index}`);
      } else {
        return res.error;
      }
    });
};

smallLogout.onclick = () => {
  logout(logoutUrl);
};

fullLogout.onclick = () => {
  logout(logoutUrl);
};
