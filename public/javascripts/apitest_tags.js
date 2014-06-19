

function addTag(event){
    event.preventDefault();
        
    var newTag = {
		'user_id': $("#showUserId").html(),
        'key': $("#addTagForm input#inputTagKey").val(),
        'value': $("#addUserForm input#inputTagValue").val()
    };
    
    $.ajax({
		type: 'POST',
		data: newTag,
		url: '/tags/addtag',
		dataTye: 'JSON'
	}).done(function(response){
			
		//Check for successful (blank) response
		if ( response.msg === ''){
			$('#debug').html("add tag success");
			$("#addTagForm input#inputTagKey").val("");
            $("#addTagForm input#inputTagValue").val("");
       
			//to do: show tag list
		}else{
			//If something goes wrong, alert the error message that our service returned 
			alert('Error: ' + respnse.msg);
		}
	});
}

