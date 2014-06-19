$(document).ready(function(){
    
    
    $('#btnAddUser').on('click', addUser);
    
    
});

function showUserList(){
    $.getJSON('/users/userlist', function(data){
        var userListData = data;
        var content2Show;
        
        $.each(data, function(){
            content2Show += this.name;
            content2Show += '<br>';
        });
	
        $('#debug').html( content2Show );
    });
}

function addUser(){
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

