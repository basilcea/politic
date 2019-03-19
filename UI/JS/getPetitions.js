let officeType = document.getElementById('petitionOfficeType')
let officeName = document.getElementById('petitionOfficeName')

officeType.onchange = () => {
    fetchOffice(officeType,officeName)
}
const form = document.getElementById('petitionForm')
const evidence = form.querySelectorAll('img')
const evidenceArray = []
for (let i = 0; i < evidence.length; i++){
    evidenceArray.push(evidence[i].src)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = {
        office: officeName.value,
        subject: document.getElementById('complaintSubject').value,
        body: document.getElementById('complaint').value,
        evidence:evidenceArray,
    }

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
                console.log(res.data)
            }
        })

})