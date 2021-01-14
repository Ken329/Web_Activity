var iconSideMenu = document.getElementById('side_menu_icon')
var sideMenu = document.getElementById('side_menu_container')
var dropDown = document.getElementById('drop_down_menu')

var btnLogout = document.getElementById('side_menu_logout')
var confirmBox = document.getElementById('confirm_box')
var btnCancel = document.getElementById('confirm_cancel')
var check = true

iconSideMenu.addEventListener('click', function(){
    if(check){
        if(screen.width > 1000){
            sideMenu.style.display = "block"
        }else{
            dropDown.style.display = "block"
        }
        check = false;
    }else{
        if(screen.width > 1000){
            sideMenu.style.display = "none"
        }else{
            dropDown.style.display = "none"
        }
        check = true;
    }
})

btnLogout.addEventListener('click', function(){
    confirmBox.style.display = "block"
})
btnCancel.addEventListener('click', function(){
    confirmBox.style.display = "none"
})