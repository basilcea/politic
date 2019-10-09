const resultOffice = document.getElementById('resultOfficeType');
const resultName = document.getElementById('resultOfficeName');
const voteDiv = document.getElementsByClassName('candidateProfile');
const castVoteDiv = document.getElementById('cast');


const getCandidateById = (officeId ,result ) => {
  fetch(`https://cea-politico-gres.herokuapp.com/api/v1/candidates/user/${officeId}`, {
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
        let votes
        if (result === '1') {
           votes = 'vote'
        }
        else {
          votes ='votes'
        }
        const party = data.data[0].partyname
        const candidate = data.data[0].username
        const dataObj = {
          party,
          candidate,
          result: `${result} ${votes}`
        }
        const table = document.getElementById('resultsTable');
        for (let i = 0; i < data.data.length; i++) {
          const tr = document.createElement('tr');
          const array = Object.values(dataObj);
          table.appendChild(tr);
          for (let j = 0; j < 3; j++) {
            const td = document.createElement('td');
            td.setAttribute('class', 'layout_td');
            table.lastChild.appendChild(td);
            tr.cells[j].innerHTML = array[j];
          }
        }
      }
      else {
        return data.error
      }
    })
}

resultOffice.onchange = () => {
  fetchOffice(resultOffice, resultName);
};
resultName.onchange = () => {
  const officeId = Number(resultName.value);
  fetch(`https://cea-politico-gres.herokuapp.com/api/v1/offices/${officeId}/result`, {
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
        const result = data.data[0].result
        getCandidateById(data.data[0].candidate,  result)
      }
    });
};

const createVote = (formData) => {
  fetch('https://cea-politico-gres.herokuapp.com/api/v1/votes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then((res) => {
      if (res.status === 201) {
      }
      else {
        return res.error;
      }
    });
};


const searchCandidate = (officeId) => {
  fetch(`https://cea-politico-gres.herokuapp.com/api/v1/offices/${officeId}/candidates`, {
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
          console.log(data.data);
          const candidateName = `${data.data[i].username}`;
          const partyName = data.data[i].partyname;
          const div = document.createElement('div');
          const majorDiv = document.createElement('div');
          majorDiv.className = 'voteInfo';
          const anotherDiv = document.createElement('div');
          const anotherfigure = document.createElement('figure');
          const anotherfigCaption = document.createElement('figcaption');
          const span = document.createElement('span');
          const image = document.createElement('img');
          const candidateImage = document.createElement('img');
          candidateImage.src = data.data[i].passport;
          anotherfigCaption.innerHTML = candidateName;
          anotherfigure.appendChild(candidateImage);
          anotherfigure.appendChild(anotherfigCaption);
          anotherDiv.append(anotherfigure);
          image.src = data.data[i].logo;
          image.className = 'others_img2';
          span.innerHTML = partyName;
          div.appendChild(image);
          div.appendChild(span);
          majorDiv.appendChild(anotherDiv);
          majorDiv.appendChild(div);
          if (castVoteDiv.className === 'layout_block') {
            const button = document.createElement('button');
            button.className = ' voteAction';
            button.innerHTML = 'Vote';
            majorDiv.appendChild(button);
            voteDiv[0].appendChild(majorDiv);
            button.onclick = (e) => {
              e.preventDefault();
              const id = data.data[i].user;
              fetch(`https://cea-politico-gres.herokuapp.com/api/v1/candidates/${id}`, {
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
                  const newId = data.data[0].id;
                  const formdata = {
                    office: officeId,
                    candidate: newId,
                  };
                  createVote(formdata);
                });

            };

          }
          else {
            voteDiv[1].appendChild(majorDiv);
          }

        }
        const allDivs = document.getElementsByClassName('voteInfo');
        let counter = 0;
        for (let i = 0; i < allDivs.length; i++) {
          if (i % 5 === 0) {
            counter = 1;
          }
          else {
            counter++;
          }
          if (counter <= 5) {
            allDivs[i].className = `layout_left${counter}`;
          }
        }

      }
      else {
        return data.error;
      }
    });

}
