

function showUserTagList(){
    
    $.getJSON('/tags/usertaglist/' +  $(this).attr('rel') , function(data){
        var tagListData = data;
        var tableContent = "";
        
        console.log(data);
        
        $.each(data, function(){
           tableContent += "<tr>";
           tableContent += "<td>" + this.key + "</td>";
           tableContent += "<td>" + this.value + "</td>";
           tableContent += "<td><a href='#' class='linkDeleteTag' rel='" + this._id + "'>Delete</a></td>";
           tableContent += "</tr>";
        });
	
        $('#tagTimeLine table tbody').html( tableContent );
    });
}


function addTag(event){
    event.preventDefault();
        
    var newTag = {
		'user_id': $("#showUserId").html(),
        'key': $("#addTagForm input#inputTagKey").val(),
        'value': $("#addTagForm input#inputTagValue").val()
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

function deleteTag(event) {
	event.preventDefault();
	
    $.ajax({
        type: 'DELETE',
        url: '/tags/deletetag/' + $(this).attr('rel')
        
    }).done(function(response){
        if ( response.msg === '' ) {
		
		}else{
			alert('Error ' + response.msg);
		}
    
    });
    
	
}