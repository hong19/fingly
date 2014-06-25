
var app = app || {};

app.AddUserFormView = Backbone.View.extend({
	el: '#addUserForm',
	
	events: {
		'click button#btnAddUser': 'addUser'
	},
	
	
	initialize: function(userList){
        _.bindAll(this, 'render', 'addUser');
		
		this.collection = userList;
	},

	render: function(){

		return this; // for chainable calls, like .render().el
	},
	
	
	addUser: function(){
        var self = this;
        var newUser = {
            name: $("input#inputUserName").val(),
            phone: $("input#inputUserPhone").val(),
            facebook: $("input#inputUserFacebook").val()
        };
        
        $.ajax({
            type: 'POST',       
            data: newUser,
            url: '/users/adduser',      
            dataTye: 'JSON'
        }).done(function(response){
            
		//Check for successful (blank) response
            if ( response.msg === ''){
                $("input#inputUserName").val("");
                $("input#inputUserPhone").val("");
                $("input#inputUserFacebook").val("");
                
                var user = new app.User();
                user.set(newUser);
                
                self.collection.add(user);
                //problem: _id => undefined
            
            }else{
                //If something goes wrong, alert the error message that our service returned 
                alert('Error: ' + respnse.msg);
            }
            
        });
        
	}
	
	
});