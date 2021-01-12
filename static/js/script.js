var iconSideMenu = document.getElementById('side_menu_icon');
var sideMenu = document.getElementById('side_menu_container');
var check = true;

iconSideMenu.addEventListener('click', function(){
    if(check){
        sideMenu.style.display = "block";
        check = false;
    }else{
        sideMenu.style.display = "none";
        check = true;
    }
});