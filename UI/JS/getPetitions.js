const officeType = document.getElementById('petitionOfficeType');
const editOfficeType = document.getElementById('editPetitionType');
const officeName = document.getElementById('petitionOfficeName');
const editOfficeName = document.getElementById('editPetitionOffice');
const subject = document.getElementById('complaintSubject');
const complaint = document.getElementById('complaint');
const petitionDiv = document.getElementById('viewPetitions');
const petitionSubject = document.getElementById('editComplaintSubject');
const petitionBody = document.getElementById('editComplaint');
const evidenceArray = [];

officeType.onchange = () => {
  fetchOffice(officeType, officeName);
};
editOfficeType.onchange = () => {
  fetchOffice(editOfficeType, editOfficeName);
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const allImages = form.querySelectorAll('img');
  for (let i = 0; i < allImages.length; i++) {
    evidenceArray.push(allImages[i].src);
  }
  const formData = {
    office: officeName.value,
    subject: subject.value,
    body: complaint.value,
    evidence: evidenceArray,
  };

  fetch('https://cea-politico-gres.herokuapp.com/api/v1/petitions', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then((res) => {
      if (res.status === 201) {
        location.reload();
      }
    });

});
const editPetitions = (id) => {
  fetch(`https://cea-politico-gres.herokuapp.com/api/v1/petitions/${id}`, {
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
        petitionDiv.className = 'layout_none';
        document.getElementById('editPetitions').className = 'layout_block';
        petitionSubject.placeholder = data.data.subject;
        petitionBody.placeholder = data.data.body;
        document.getElementById('editPetitionForm').addEventListener('submit', (e) => {
          const formData = {
            office: editOfficeName.value,
            subject: petitionSubject.value,
            body: petitionBody.value,
          };
          e.preventDefault()
          fetch(`https://cea-politico-gres.herokuapp.com/api/v1/petitions/${id}`, {
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
            });
        })
      }
    });

};

const deletePetitions = (id) => {
  fetch(`https://cea-politico-gres.herokuapp.com/api/v1/petitions/${id}`, {
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
        location.reload();
      }
      console.log(data.error)
    });
};
const fetchPetitions = () => {
  const token = localStorage.getItem('token');
  fetch('https://cea-politico-gres.herokuapp.com/api/v1/petitions', {
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
          const par = document.createElement('p');
          const newPar = document.createElement('p');
          const button1 = document.createElement('button');
          const button2 = document.createElement('button');
          par.innerHTML = data.data[i].subject;
          const fullBody = data.data[i].body;
          const bodyArray = fullBody.split(' ').slice(0, 30);
          const newContent = bodyArray.join(' ');
          newPar.innerHTML = newContent;
          button1.innerHTML = 'Edit Petition';
          button2.innerHTML = 'Delete Petition';
          petitionDiv.appendChild(par);
          petitionDiv.appendChild(newPar);
          petitionDiv.appendChild(button1);
          petitionDiv.appendChild(button2);
          button1.onclick = () => {
            editPetitions(data.data[i].id);
          };
          button2.onclick = () => {
            deletePetitions(data.data[i].id);
          };
        }
      }
    });

};

addEventListener('load', window, fetchPetitions());
