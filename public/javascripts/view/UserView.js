var app = app || {};

app.UserView = Backbone.View.extend({
	tagName: 'tr',
	
	events: {
		'click a.linkDeleteUser': 'remove',
		'click a.linkShowUserProfile': 'showProfile' 
	},
	
	initialize: function(){
		_.bindAll(this, 'render', 'unrender', 'remove', 'showProfile');
		
		this.model.bind('change', this.render);
		this.model.bind('remove', this.unrender);
	},

	render: function(){
		var innerHtml = "";
		innerHtml += "<td>" + this.model.get("name") + "</td>";
        innerHtml += "<td><a href='#' class='linkShowUserProfile' rel='" + this.model.get("_id") + "'>Details</a></td>";
        innerHtml += "<td><a href='#' class='linkEditUser' rel='" + this.model.get("_id") + "'>Edit</a></td>";
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
		$('#tagField').trigger('userChange');
	
	
		//not complete
	    $.getJSON('/tags/usertaglist/' +  this.model.get("_id") , function(data){
            var tagListData = data;
            
            $.each(data, function(){
		
			
			//self.collection.add({ name:'honghong'});
			
			    _(tagListData).each(function(tag){
				    self.collection.add(tag);
			    }, this);
			
			//self.render();
		    });      
	    });
	 
	    
	},
	
	
	
	
		
});