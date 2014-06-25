var app = app || {};

app.UserListView = Backbone.View.extend({
	el: '#userList',
	
	initialize: function( userList ){
		var self = this;
		_.bindAll(this, 'render', 'appendUser');
		
		this.collection = userList;
        this.collection.bind('add', this.appendUser);
		
		$.getJSON('/users/userlist', function(data){
			var userListData = data;
			
			//self.collection.add({ name:'honghong'});
			
			_(userListData).each(function(user){
				self.collection.add(user);
			}, this);
			
			//self.render();
		});
		
		
	},
	
	render: function(){
		var self = this;
		_(this.collection.models).each(function(user){
			self.appendUser(user);
		}, this);
	},
	
	
	appendUser: function(user){
		var userView = new app.UserView({
			model: user
		});
		$('table tbody', this.el).append(userView.render().el);
	}
	
});