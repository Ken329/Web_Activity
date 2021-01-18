// button side menu
var iconSideMenu = document.getElementById('side_menu_icon')

// container side menu
var sideMenu = document.getElementById('side_menu_container')
var dropDown = document.getElementById('drop_down_menu')

// confirmation box
var confirmBox = document.getElementById('confirm_box')
var btnCancel = document.getElementById('confirm_cancel')

// side menu button
var btnHome = document.getElementById('side_menu_home')
var btnUser = document.getElementById('side_menu_user')
var btnPost = document.getElementById('side_menu_post')
var btnMember = document.getElementById('side_menu_member')
var btnLogout = document.getElementById('side_menu_logout')

//container function
var conHome = document.getElementById('main_container')
var conUser = document.getElementById('user_container')
var conPost = document.getElementById('post_container')
var conMember = document.getElementById('member_container')

var check = true
var title = document.getElementById('header_title')

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
btnCancel.addEventListener('click', function(){
    confirmBox.style.display = "none"
})
btnHome.addEventListener('click', function(){
    conHome.style.display = "block"
    conPost.style.display = 'none'
    conUser.style.display = 'none'
    conMember.style.display = 'none'

    sideMenu.style.display = 'none'
    dropDown.style.display = "none"
    check = true;
    title.innerHTML = 'User Activity - Home'
})
btnPost.addEventListener('click', function(){
    conHome.style.display = "none"
    conPost.style.display = 'block'
    conUser.style.display = 'none'
    conMember.style.display = 'none'

    sideMenu.style.display = 'none'
    dropDown.style.display = "none"
    check = true;
    title.innerHTML = 'User Activity - Post'
})
btnUser.addEventListener('click', function(){
    conHome.style.display = "none"
    conPost.style.display = 'none'
    conUser.style.display = 'block'
    conMember.style.display = 'none'

    sideMenu.style.display = 'none'
    dropDown.style.display = "none"
    check = true;
    title.innerHTML = 'User Activity - User'
})
btnMember.addEventListener('click', function(){
    conHome.style.display = "none"
    conPost.style.display = 'none'
    conUser.style.display = 'none'
    conMember.style.display = 'block'

    sideMenu.style.display = 'none'
    dropDown.style.display = "none"
    check = true;
    title.innerHTML = 'User Activity - Member'
})
btnLogout.addEventListener('click', function(){
    confirmBox.style.display = "block"
})

// database connection for mainIndex
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data => loadMainHtml(data['data']))
})
function loadMainHtml(data){
    const table = document.getElementById('main_tbody')
    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='2'>No Data</td></tr>"
        return;
    }
    let tableHtml = ""
    data.forEach(function({post_id, post_name, post_activity}){
        tableHtml += "<tr>"
        tableHtml += `<td>${post_id}</td>`
        tableHtml += `<td>${post_name}</td>`
        tableHtml += `<td>${post_activity}</td>`
        tableHtml += "</tr>"
    })
    table.innerHTML = tableHtml
}
// get all data for UserIndex
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getUserData')
    .then(response => response.json())
    .then(data => loadUserHtml(data['data']))
})
function loadUserHtml(data){
    var id = document.getElementById('user_id')
    var name = document.getElementById('user_name')
    var password = document.getElementById('user_pass')
    var age = document.getElementById('user_age')

    id.value = data[0].user_id
    name.innerHTML = data[0].user_name
    password.value = data[0].user_password
    age.value = data[0].user_age
}
var userBtn = document.getElementById('user_btn')
userBtn.addEventListener('click', function(){
    var name = document.getElementById('user_name').innerHTML
    var id = document.getElementById('user_id').value
    var pass = document.getElementById('user_pass').value
    var age = document.getElementById('user_age').value
    fetch('http://localhost:3000/updateUser?id='+id+"&name="+name+"&pass="+pass+"&age="+age,{
        method: 'PATCH',
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            location.reload()
        }
    })
})
// datbase connection for postIndex
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getPostData')
    .then(response => response.json())
    .then(data => loadPostHtml(data['data']))
})
function loadPostHtml(data){
    const table = document.getElementById('post_tbody')
    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
        return;
    }
    let tableHtml = ""
    data.forEach(function({post_id, post_name, post_activity}){
        tableHtml += "<tr>"
        tableHtml += `<td>${post_id}</td>`
        tableHtml += `<td>${post_name}</td>`
        tableHtml += `<td>${post_activity}</td>`
        tableHtml += `<td><button class="edit-row-btn" data-id=${post_id}>Edit</td>`
        tableHtml += `<td><button class="delete-row-btn" data-id=${post_id}>Delete</td>`
        tableHtml += "</tr>"
    })
    table.innerHTML = tableHtml
}
document.getElementById('post_tbody').addEventListener('click', function(event){
    if(event.target.className === 'delete-row-btn'){
        deletePost(event.target.dataset.id)
    }
    if(event.target.className === 'edit-row-btn'){
        editPost(event.target.dataset.id)
    }
})

// get all data for memberIndex
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getMemberData')
    .then(response => response.json())
    .then(data => loadMemberHtml(data['data']))
})
function loadMemberHtml(data){
    const table = document.getElementById('member_tbody')
    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data colspan='3>No Data</tr></td>"
        return 
    }
    let tableHtml = ""
    data.forEach(function({user_id, user_name, user_age}){
        tableHtml += "<tr>"
        tableHtml += `<td>${user_id}</td>`
        tableHtml += `<td>${user_name}</td>`
        tableHtml += `<td>${user_age}</td>`
        tableHtml += "</td>"
    })
    table.innerHTML = tableHtml
}

// insert, update and delete post
const btnUpdate = document.getElementById('post_btn')
document.getElementById('body_container_enter').addEventListener('click', function(){
    var input = document.getElementById('body_container_activity').value
    fetch('http://localhost:3000/inserting/' + input, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            document.getElementById('body_container_activity').value = ''
            location.reload()
        }
    })
})
function deletePost(id){
    fetch('http://localhost:3000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            location.reload()
        }
    })
}
function editPost(id){
    document.querySelector('#post_input').style.display = "block"
    document.querySelector('#post_btn').dataset.id = id
}
btnUpdate.onclick = function(){
    var id = document.querySelector('#post_btn').dataset.id
    var input = document.getElementById('post_edit').value
    fetch('http://localhost:3000/update?id='+id+"&name="+input,{
        method: 'PATCH',
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            document.getElementById('post_edit').value = ''
            location.reload()
        }
    })
}
