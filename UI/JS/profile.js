
const run = document.getElementById("run");
const petition = document.getElementById("petition");

const buttons = document.querySelectorAll("button");
const runButton = buttons[0];
const petitionButton = buttons[1];

runButton.className = "button_active3";
petitionButton.className = "button_login3";
petition.className ="layout_none";

runButton.onclick =()=>{
	runButton.className ="button_active3";
	petitionButton.className ="button_login3";
	run.className ="layout_block";
	petition.className ="layout_none";

}
petitionButton.onclick =()=>{
	petitionButton.className ="button_active3";
	runButton.className ="button_login3";
	run.className ="layout_none";
	petition.className ="layout_block";
}

const icon = document.getElementsByClassName('background_icon')[0]
const smallLink = document.getElementsByClassName('nav_horizontal_small')

icon.onclick =()=>{
  if(icon.className === "background_icon"){
    icon.className='background_icon1';
    for (let i=0; i< smallLink.length ; i++ ){
      smallLink[i].style.display='block'
    }
  }
  else{
    icon.className='background_icon'
    for (let i=0; i< smallLink.length ; i++ ){
      smallLink[i].style.display='none'
    }
  }

}

const uploadButton = document.querySelector(".button_btn");
const fileInfo = document.querySelector(".button_upload");
const realInput = document.getElementById("realInput");

uploadButton.addEventListener("click", () => {
  realInput.click();

});
realInput.addEventListener("change", () => {
  let reader = new FileReader();
  reader.onload =()=>{
		let previewed= document.getElementById("pix");
		previewed.src= reader.result;
    }
  reader.readAsDataURL(event.target.files[0])
});
const info =[
	{
		Candidate:"Prosper Umeytinwa-PDP",
		Type:"Federal",
		Office:"President-Nigeria"
	},
	{
		Candidate:"Chris Nwanba-APC",
		Type:"State",
		Office:"Governor-Anambara"
	},
	{
		Candidate:"Celestine Omin-PDP",
		Type:"Legislative",
		Office:"Senator-Anambara-Central"
	},
	{
		Candidate:"Ire Aderikon-FDP",
		Type:"Legislative",
		Office:"Representative-Anambara-Federal-Constituency-IV"
	},
	{
		Candidate:"Adaku Nyom-KOWA",
		Type:"Local Government",
		Office:"Chairman-Nnewi-North"
	},
];
const values= Object.values(info);
const valuesArray = Object.values(values);
const table=document.getElementById("voteActivity");
for(let i=0;i<= info.length; i++){
	let tr = document.createElement("tr");
	table.appendChild(tr);
	for(let j=0;j<3;j++){
	let td = document.createElement("td");
	td.setAttribute("class","layout_td")
	table.lastChild.appendChild(td);
	let val=Object.values(valuesArray[i])[j];
	tr.cells[j].innerHTML=val;
	}
}
