const icon = document.getElementsByClassName('background_icon')[0]
const horizontal= document.getElementsByClassName('nav_horizontal')
const list =  document.querySelectorAll('li')

icon.onclick =()=>{
  if(icon.className ==="nav_menuButton background_icon"){
    icon.className ='nav_menuButton background_icon1'
    icon.parentNode.insertBefore(icon, list[0])

  }
  else{
    icon.className = "nav_menuButton background_icon"
  }
}