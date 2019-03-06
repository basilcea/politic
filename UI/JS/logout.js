

const logoutUrl = 'https://cea-politico-gres.herokuapp.com/api/v1/auth/logout';
const index = 'index.html';
const token = localStorage.getItem('token');
const logout = (url) => {
  fetch(url, {
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
        // eslint-disable-next-line no-undef
        localStorage.clear();
        window.location.replace(`${index}`);
      } else {
        return info.error;

      }
    });
};

document.getElementById('logout_small').onclick = () => {
  logout(logoutUrl);
};

document.getElementById('logout_full').onclick = () => {
  logout(logoutUrl);
};
