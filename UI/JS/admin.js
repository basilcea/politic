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

createdButton.onclick =()=>{
	deletedButton.className ="button_login2";
	createButton.className ="button_login2";
	editButton.className = "button_login2";
	createdButton.className = "button_active2";
	deletedParty.className = "layout_none";
	createParty.className = "layout_none";
	editParty.className = "layout_none";
	createOffice.className ="layout_block";

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







