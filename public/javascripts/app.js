var app = app || {};

$(document).ready( function(){
	
	var userList = new app.UserList();
	var userListView = new app.UserListView(userList);
	var userAddUserFormView = new app.AddUserFormView(userList);
	
});