const allInterests = document.getElementById('allInterests');

const fetching = (newDiv, par2, par3, par4, button12, button13, office, party, message, message2) => {
  fetch(`https://cea-politico-gres.herokuapp.com/api/v1/offices/${office}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then(res => res.json())
    .then((newData) => {

      if (newData.status === 200) {
        par2.innerHTML = `Office Type : ${newData.data.type}`;
        par3.innerHTML = `Office Name : ${newData.data.name}`;
        newDiv.appendChild(par2);
        newDiv.appendChild(par3);
        fetch(`https://cea-politico-gres.herokuapp.com/api/v1/parties/${party}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
          },
        })
          .then(res => res.json())
          .then((anotherData) => {
            if (anotherData.status === 200) {
              par4.innerHTML = `Party : ${anotherData.data.name}`;
              newDiv.appendChild(par4);
              button12.innerHTML = `Edit ${message}`;
              button12.className = `${message}`;
              newDiv.appendChild(button12);
              button13.innerHTML = message2;
              button13.className = `${message2}`;
              newDiv.appendChild(button13);
            }

          });
      }
    });
};

const editInterest = (id, formData) => {
  fetch(`https://cea-politico-gres.herokuapp.com/api/v1/interests/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(formData),

  })
    .then(res => res.json())
    .then((data) => {
      if (data.status === 201) {
        location.reload();
      }
      return data.error;
    });
};

const deleteInterest = (id) =>{
  fetch(`https://cea-politico-gres.herokuapp.com/api/v1/interests/${id}`, {
    method: 'DELETE',
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
        location.reload()
      }
    })
  }

const fetchAllInterests = () => {
  fetch('https://cea-politico-gres.herokuapp.com/api/v1/interests', {
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
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[0].userInfo) {
            const newDiv = document.createElement('div');
            const img = document.createElement('img');
            const par1 = document.createElement('p');
            img.src = data.data[i].userInfo[0].passporturl;
            par1.innerHTML = `Name :  ${data.data[i].userInfo[0].firstname} ${data.data[i].userInfo[0].lastname} ${data.data[i].userInfo[0].othername}  `;
            newDiv.appendChild(img);
            newDiv.appendChild(par1);
            const par2 = document.createElement('p');
            const par3 = document.createElement('p');
            const par4 = document.createElement('p');
            const button12 = document.createElement('button');
            const button13 = document.createElement('button');
            const office = data.data[i].interestInfo.office;
            const party = (data.data[i].interestInfo.party);
            fetching(newDiv, par2, par3, par4, button12, button13, office, party, 'layout_none', 'Approve');
            allInterests.appendChild(newDiv);
            button13.onclick = () => {
              const par5 = document.createElement('p');
              const id = data.data[i].userInfo[0].id;
              // aproval(office,id,)
            };
          }
          else {
            const newDiv = document.createElement('div');
            const par2 = document.createElement('p');
            const par3 = document.createElement('p');
            const par4 = document.createElement('p');
            const button12 = document.createElement('button');
            const button13 = document.createElement('button');
            const office = Number(data.data[i].office);
            const party = Number(data.data[i].party);
            allInterests.appendChild(newDiv);
            fetching(newDiv, par2, par3, par4, button12, button13, office, party, 'Interest', 'Delete');
            button12.onclick = () => {
              const interest = Number(data.data[i].id);
              document.getElementById('viewInterests').className = 'layout_none';
              document.getElementById('editInterest').className = 'layout_block';
              document.getElementById('editInterestForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const editFormData = {
                  office: document.getElementById('deleteOfficeName').value,
                  party: selectList[1].value,
                };
                editInterest(interest, editFormData);
              });

            };
            button13.onclick = (e)=>{
              const id = Number(data.data[i].id)
              e.preventDefault();
              deleteInterest(id);
            }
          }
        }
      }
      return data.error;
    });
};
addEventListener('load', window, fetchAllInterests());
