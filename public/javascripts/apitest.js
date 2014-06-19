$(document).ready(function(){
    
    showUserList();
    
	//users
    $('#btnAddUser').on('click', addUser);
    
    $('#userList table tbody').on('click', 'td a.linkDeleteUser', deleteUser );
    
	$('#userList table tbody').on('click', 'td a.linkShowUserProfile', showUserProfile );
	
	$('#userList table tbody').on('click', 'td a.linkEditUser', updateUser );
	
	//tags
	$('#btnAddTag').on('click', addTag);
});

function updateUser(event){
	event.preventDefault();
	
	var updateUser = {
		'_id': $(this).attr('rel'),
        'name': $("#addUserForm input#inputUserName").val(),
        'phone': $("#addUserForm input#inputUserPhone").val(),
        'facebook': $("#addUserForm input#inputUserFacebook").val()
    };
	
	$.ajax({
		type: 'POST',
		data: updateUser,
		url: '/users/updateuser',
		dataTye: 'JSON'
	}).done(function(response){
			
		//Check for successful (blank) response
		if ( response.msg === ''){
			$('#debug').html("update success");
			$("#addUserForm input#inputUserName").val("");
            $("#addUserForm input#inputUserPhone").val("");
            $("#addUserForm input#inputUserFacebook").val("");
			
			showUserList();
		}else{
			//If something goes wrong, alert the error message that our service returned 
			//alert('Error: ' + response.msg);
			console.log("Error:" );
			console.log( response.msg );
		}
	});
}

function showUserList(){
    $.getJSON('/users/userlist', function(data){
        var userListData = data;
        var tableContent = "";
        
        
        $.each(data, function(){
           tableContent += "<tr>";
           tableContent += "<td>" + this.name + "</td>";
           tableContent += "<td><a href='#' class='linkShowUserProfile' rel='" + this._id + "'>Details</a></td>";
           tableContent += "<td><a href='#' class='linkEditUser' rel='" + this._id + "'>Edit</a></td>";
           tableContent += "<td><a href='#' class='linkDeleteUser' rel='" + this._id + "'>Delete</a></td>";
           tableContent += "</tr>";
        });
	
        $('#userList table tbody').html( tableContent );
    });
}

function showUserProfile(event){
	 event.preventDefault();
	 
	 $.getJSON('/users/showprofile/' +  $(this).attr('rel'), function(data){
        var userListData = data;
        $('#showUserId').html( data._id );
		$('#showUserName').html( data.name );
		$('#showUserPhone').html( data.phone );
		$('#showUserFacebook').html( data.facebook );
		

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
			$("#addUserForm input#inputUserName").val("");
            $("#addUserForm input#inputUserPhone").val("");
            $("#addUserForm input#inputUserFacebook").val("");
			 
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
	
	