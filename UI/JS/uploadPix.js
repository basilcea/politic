const uploadButton = document.querySelectorAll('.button_btn');
let previewed = document.getElementById('uploadedPassport');
const form = document.getElementById('petitionForm');
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
    if (edit) {
      edit.src = passport;
    }
  }
  if (window.location.href === `${host}/UI/admin.html`) {
    return [previewed.src, edit.src];
  }
  return previewed.src;
});
if (uploadButton[0]) {
  uploadButton[0].addEventListener('click', () => {
    if (window.location.href === `${host}/UI/candidate.html`) {
      const newImage = document.createElement('img');
      newImage.className = 'others_img layout_none';
      form.insertBefore(newImage, previewed);
      const imageNumber = form.querySelectorAll('img');
      for (let i = 0; i < imageNumber.length; i++) {
        imageNumber[1].id = 'uploadedPassport';
        previewed = document.getElementById('uploadedPassport');
        previewed.className = 'others_img';
        imageNumber[i].id = `uploadedPassport${i}`;
      }
    }
    mywidget.open();
    return evidenceArray;
  });
}
if (uploadButton[1]) {
  uploadButton[1].addEventListener('click', () => {
    // trigger the click of the file upload input
    mywidget.open();
  });
}
