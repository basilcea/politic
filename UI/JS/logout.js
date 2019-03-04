

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

document.getElementById('logout_small').onclick = () => {
  logout(logoutUrl);
};

document.getElementById('logout_full').onclick = () => {
  logout(logoutUrl);
};

