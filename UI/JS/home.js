/** -----for small screen sizes------- */

<<<<<<< HEAD
/**get hamburger icon */
const icon = document.getElementsByClassName('background_icon')[0]

/** get nav list  */
const smallLink = document.getElementsByClassName('nav_horizontal_small')

/** style nav menu */
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

/** implement toast for vote */
let vote= document.getElementById('vote')
vote.onclick=()=>{

  let x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

// courtesy w3schools tutorials

=======
/** get hamburger icon */
const icon = document.getElementsByClassName('background_icon')[0];

/** get nav list  */
const smallLink = document.getElementsByClassName('nav_horizontal_small');

/** style nav menu */
icon.onclick = () => {
  if (icon.className === 'background_icon') {
    icon.className = 'background_icon1';
    for (let i = 0; i < smallLink.length; i++) {
      smallLink[i].style.display = 'block';
    }
  } else {
    icon.className = 'background_icon';
    for (let i = 0; i < smallLink.length; i++) {
      smallLink[i].style.display = 'none';
    }
  }
};

/** implement toast for vote */
const vote = document.getElementById('vote');
vote.onclick = () => {
  const x = document.getElementById('snackbar');

  // Add the "show" class to DIV
  x.className = 'show';

  // After 3 seconds, remove the show class from DIV
  setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
};

// courtesy w3schools tutorials
>>>>>>> 2ffd4e67b9b936273f22bf5cc07d345319d155cc
