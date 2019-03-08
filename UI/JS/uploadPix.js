const uploadButton = document.querySelector('.button_btn');
const previewed = document.getElementById('uploadedPassport');


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
  }
  return previewed.src;
});

uploadButton.addEventListener('click', () => {
  // trigger the click of the file upload input
  mywidget.open();
});
