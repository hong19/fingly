var app = app || {};

app.UserView = Backbone.View.extend({
	tagName: 'tr',
	
	events: {
		'click a.linkDeleteUser': 'remove',
		'click a.linkShowUserProfile': 'showProfile',
		'click a.linkUpdateUser': 'updateUser'
	},
	
	initialize: function(){
		_.bindAll(this, 'render', 'unrender', 'remove', 'showProfile', 'updateUser');
		
		this.model.bind('change', this.render);
		this.model.bind('remove', this.unrender);
	},

	render: function(){
		var innerHtml = "";
		innerHtml += "<td>" + this.model.get("name") + "</td>";
        innerHtml += "<td><a href='#' class='linkShowUserProfile' rel='" + this.model.get("_id") + "'>Details</a></td>";
        innerHtml += "<td><a href='#' class='linkUpdateUser' rel='" + this.model.get("_id") + "'>Update</a></td>";
        innerHtml += "<td><a href='#' class='linkDeleteUser' rel='" + this.model.get("_id") + "'>Delete</a></td>";
		
		$(this.el).html(innerHtml);

		return this; // for chainable calls, like .render().el
	},
	
	unrender: function(){
		$(this.el).remove();
	},
	
	remove: function(){
		var self = this;
		$.ajax({
			type: 'DELETE',
			url: '/users/deleteuser/' + this.model.get("_id")
		}).done(function(response){
			if ( response.msg === '' ) {
		        self.model.destroy();
			}else{
				alert('Error ' + response.msg);
			}	   
			
		});		
	},
	
	showProfile: function(){
        $('#showUserId').html(this.model.get("_id"));
        $('#showUserName').html(this.model.get("name"));
        $('#showUserPhone').html(this.model.get("phone"));
        $('#showUserFacebook').html(this.model.get("facebook"));
		
		//trigger the event of tagField
		$('#tagField').trigger('userChange', this.model.get("_id"));	 
	    
	},
	
	updateUser: function(){
		var self = this;
		var user2Update = {
			'_id': $('a.linkUpdateUser', this.$el).attr('rel'),
			'name': $("#addUserForm input#inputUserName").val(),
			'phone': $("#addUserForm input#inputUserPhone").val(),
			'facebook': $("#addUserForm input#inputUserFacebook").val()
		};
		
		$.ajax({
			type: 'POST',
			data: user2Update,
			url: '/users/updateuser',
			dataTye: 'JSON'
		}).done(function(response){
				
			//Check for successful (blank) response
			if ( response.msg === ''){
				
				$("#addUserForm input#inputUserName").val("");
				$("#addUserForm input#inputUserPhone").val("");
				$("#addUserForm input#inputUserFacebook").val("");
				
				self.model.set( user2Update );
					
			}else{
				//If something goes wrong, alert the error message that our service returned 
				//alert('Error: ' + response.msg);
				console.log("Error:" );
				console.log( response.msg );
			}
		});
	}
	
		
});