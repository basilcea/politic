const selectList = document.getElementsByClassName('candidateParty');
window.onload = () => {
  fetch('https://cea-politico-gres.herokuapp.com/api/v1/parties', {
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
          const options = document.createElement('option');
          options.disabled = true;
        options.value = 0;
        options.text = '-- Select Party--';
        selectList[0].add(options);
        for (let j = 1; j <= data.data.length; j++) {
          const options = document.createElement('option');
          options.value = data.data[j - 1].id;
          options.text = data.data[j - 1].name;
          selectList[0].add(options);
        }
      }


      return data.error;

    });
};

selectList[0].onclick = () => {
  const id = Number(selectList[0].value);
  fetch(`https://cea-politico-gres.herokuapp.com/api/v1/parties/${id}`, {
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
        document.getElementById('hiddenInputs').className = '';
        document.getElementById('uploaded').src = data.data.logourl;
        document.getElementById('editPartyName').placeholder = data.data.name;
        document.getElementById('editPartyAddress').placeholder = data.data.hqaddress;
      }
      else {
        return data.error;
      }
    });
};
