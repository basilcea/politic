const createParty = document.getElementById("create");
const editParty = document.getElementById("edit");
const deletedParty = document.getElementById("delete");
const createOffice = document.getElementById("office");

const buttons = document.querySelectorAll("button");
const createButton = buttons[0];
const editButton = buttons[1];
const deletedButton = buttons[2];
const createdButton = buttons[3];

createButton.className = "button_active2";
editButton.className = "button_login2";
deletedButton.className = "button_login2";
createdButton.className = "button_login2";
editParty.className = "layout_none";
deletedParty.className = "layout_none";
createOffice.className ="layout_none";

createButton.onclick =()=>{
	createButton.className ="button_active2";
	editButton.className ="button_login2";
	deletedButton.className = "button_login2";
	createdButton.className = "button_login2";
	createParty.className = "layout_block";
	editParty.className = "layout_none";
	deletedParty.className = "layout_none";
	createOffice.className ="layout_none";

}
editButton.onclick =()=>{
	editButton.className ="button_active2";
	createButton.className ="button_login2";
	deletedButton.className = "button_login2";
	createdButton.className = "button_login2";
	editParty.className = "layout_block";
	createParty.className = "layout_none";
	deletedParty.className = "layout_none";
	createOffice.className ="layout_none";

}

deletedButton.onclick =()=>{
	deletedButton.className ="button_active2";
	createButton.className ="button_login2";
	editButton.className = "button_login2";
	createdButton.className = "button_login2";
	deletedParty.className = "layout_block";
	createParty.className = "layout_none";
	editParty.className = "layout_none";
	createOffice.className ="layout_none";

}

let par = document.querySelectorAll("p");
for (let i=0; i<par.length; i++){
	par[i].className ="text_centered";
}

const uploadButton = document.querySelector(".button_btn");
const fileInfo = document.querySelector(".button_upload");
const realInput = document.getElementById("realInput");

uploadButton.addEventListener("click", () => {
	// trigger the click of the file upload input
  realInput.click();
});

// wheh file upload button is clicked b
realInput.addEventListener("change", () => {
	//change the value of the uplaoaded file by spliting it
  const name = realInput.value.split(/\\|\//).pop();
	// truncate it if is more than 12digits
  const truncated = name.length > 12
	? name.substr(name.length - 12)
	: name;
		//
  fileInfo.innerHTML = truncated;
		// read the value of the uploaded document.
  let reader = new FileReader();
  reader.onload =()=>{
		let previewed= document.getElementById("uploaded")
		previewed.src= reader.result;
    }
  reader.readAsDataURL(event.target.files[0]);
});

let buildOptions =(element,values) =>{
	let options=document.createElement("option");
	options.value =values[0];
	options.text = values[0];
	element.add(options);
	options.disabled=true;
	for(let i=1; i<values.length;i++){
		let options=document.createElement("option");
		options.value =values[i];
		options.text = values[i];
		element.add(options);
  }
}
const pParties=[
	"-- Select Party--","Accord Party (AP)"," Action Alliance Party (AA)"," Action Democratic Party (ADP)","	Advanced Congress Of Democrats Party (ACDP)",
	"Advanced Peoples Democratic Alliance (APDA)"," Advanced Democratic Congress (ADC)","	All Progressive Congress (APC)","	All Progressive Grand Alliance (APGA)",
	"Alliance for Democracy (AD)"," Allied Congress Party of Nigeria (ACPN)","African People Alliance (APA) ","Fresh Democratic Party (FDP)","Democratic Peoples Congress (DPC)",
	"Democratic Peoples Party (DPP)"," Hope Democratic Party (HDP)","Indepenedent Democrats (IDP)","	Kowa Party (KOWA)","	Labour Party (LP)",
	"Mega Progressive People Party (MPPP)","	National Conscience Party (NCP)" ,"Progressive People Alliance (PPA)"," 	People Democratic Party (PDP)",
	"New Nigeria Peoples Party (NNPP)","	People for Democratic Change (PDC) "," People Democratic Movement (PDM)","Peoples Party Of Nigeria (PPN)",
	"Social Democratic Party (SDP)","United Progressive Party (UPP)","	United Democratic Party (UDP)","Unity Party of Nigeria (UPN)"
]

let candidatePart=document.getElementById("candidatePart");
let candidateParty=document.getElementById("candidateParty");

buildOptions(candidatePart, pParties);
buildOptions(candidateParty, pParties);




