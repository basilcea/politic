
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
        if (selectList[0]) {
          const options = document.createElement('option');
          options.value = 0;
          options.selected = true;
          options.text = '-- Select Party--';
          options.disabled = true;
          selectList[0].add(options);

          for (let j = 1; j <= data.data.length; j++) {
            const options = document.createElement('option');
            options.value = data.data[j - 1].id;
            options.text = data.data[j - 1].name;
            selectList[0].add(options);
          }
        }

        if (selectList[1]) {
          const options = document.createElement('option');
          options.value = 0;
          options.text = '-- Select Party--';
          selectList[1].add(options);
          options.disabled = true;
          for (let j = 1; j <= data.data.length; j++) {
            const options = document.createElement('option');
            options.value = data.data[j - 1].id;
            options.text = data.data[j - 1].name;
            selectList[1].add(options);
          }
        }
      }


      return data.error;

    });
};

if (selectList[0]) {
  selectList[0].onchange = () => {
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
          if (document.getElementById('hiddenInputs')) {
            document.getElementById('hiddenInputs').className = '';
            document.getElementById('uploaded').src = data.data.logourl;
            document.getElementById('editPartyName').placeholder = data.data.name;
            document.getElementById('editPartyAddress').placeholder = data.data.hqaddress;
          }
        }
        else {
          return data.error;
        }
      });
  };
}