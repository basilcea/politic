const uploadButton = document.querySelectorAll('.button_btn');
const previewed = document.getElementById('uploadedPassport');
const edit = document.getElementById('uploaded');

let passport;
const mywidget = cloudinary.createUploadWidget({
  cloudName: 'basilcea',
  uploadPreset: 'cea_politico',
  folder: 'politico',
  cropping: true,
},
(error, result) => {
  if (result && result.event === 'success') {
    passport = result.info.url;
    previewed.src = passport;
    edit.src = passport;
  }
  return [previewed.src, edit.src];
});

uploadButton[0].addEventListener('click', () => {
  // trigger the click of the file upload input
  mywidget.open();
});

uploadButton[1].addEventListener('click', () => {
  // trigger the click of the file upload input
  mywidget.open();
});
