$(document).ready(function(){
    
    showUserList();
    
    $('#btnAddUser').on('click', addUser);
    
    $('#userList table tbody').on('click', 'td a.linkDeleteUser', deleteUser );
    
});

function showUserList(){
    $.getJSON('/users/userlist', function(data){
        var userListData = data;
        var tableContent = "";
        
        
        $.each(data, function(){
           tableContent += "<tr>";
           tableContent += "<td>" + this.name + "</td>";
           tableContent += "<td>" + this.phone + "</td>";
           tableContent += "<td>" + this.facebook + "</td>";
           tableContent += "<td><a href='#' class='linkShowUser' rel='" + this._id + "'>Details</a></td>";
           tableContent += "<td><a href='#' class='linkEditUser' rel='" + this._id + "'>Edit</a></td>";
           tableContent += "<td><a href='#' class='linkDeleteUser' rel='" + this._id + "'>Delete</a></td>";
           tableContent += "</tr>";
        });
	
        $('#userList table tbody').html( tableContent );
    });
}

function addUser(event){
    event.preventDefault();
        
    var newUser = {
        'name': $("#addUserForm input#inputUserName").val(),
        'phone': $("#addUserForm input#inputUserPhone").val(),
        'facebook': $("#addUserForm input#inputUserFacebook").val()
    };
    
    $.ajax({
		type: 'POST',
		data: newUser,
		url: '/users/adduser',
		dataTye: 'JSON'
	}).done(function(response){
			
		//Check for successful (blank) response
		if ( response.msg === ''){
			$('#debug').html("post success");
			showUserList();
		}else{
			//If something goes wrong, alert the error message that our service returned 
			alert('Error: ' + respnse.msg);
		}
	});
}


function deleteUser(event) {
	event.preventDefault();
	
    $.ajax({
        type: 'DELETE',
        url: '/users/deleteuser/' + $(this).attr('rel')
        
    }).done(function(response){
        if ( response.msg === '' ) {
		
		}else{
			alert('Error ' + response.msg);
		}
        
         showUserList();
    });
    
	
}
	
	