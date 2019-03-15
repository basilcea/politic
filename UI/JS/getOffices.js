const selectOfficeName = document.getElementById('editOfficeName');
const selectOfficeType = document.getElementById('editOfficeType');
const deleteOfficeType = document.getElementById('deleteOfficeType');
const deleteOfficeName = document.getElementById('deleteOfficeName');
const fetchOffice = (officeType, officeName) => {
  fetch('https://cea-politico-gres.herokuapp.com/api/v1/offices', {
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
        officeName.options.length = 0;
        options.value = 0;
        options.text = '-- Select Name of Office--';
        options.selected = true;
        options.disabled = true;
        officeName.add(options);
        for (let i = 1; i <= data.data.length; i++) {
          if (officeType.value === data.data[i - 1].type) {
            const options = document.createElement('option');
            options.value = data.data[i - 1].id;
            options.text = data.data[i - 1].name;
            officeName.add(options);
          }
        }
      }
      return data.error;
    });
};

if (selectOfficeType) {
  selectOfficeType.onchange = () => {
    fetchOffice(selectOfficeType, selectOfficeName);
  };
}

if (deleteOfficeType) {
  deleteOfficeType.onchange = () => {
    fetchOffice(deleteOfficeType, deleteOfficeName);
  };
}
const newtype = document.getElementById('newOfficeType');

selectOfficeName.onchange = () => {
  const id = Number(selectOfficeName.value);
  fetch(`https://cea-politico-gres.herokuapp.com/api/v1/offices/${id}`, {
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
        document.getElementById('hiddenOffice').className = '';
        if (newtype) {
          for (let i = 0; i < newtype.length; i++) {
            if (newtype.options[i].value === selectOfficeType.value) {
              newtype.options[i].selected = true;
            }
          }
        }
        if (document.getElementById('newOfficeName')) {
          document.getElementById('newOfficeName').placeholder = data.data.name;
          document.getElementById('editElectionDate').innerHTML = data.data.electdate;
        }
      }
      else {
        return data.error;
      }
    });
};
