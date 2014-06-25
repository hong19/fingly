var app = app || {};

app.User = Backbone.Model.extend({
	defaults:{
		_id: '0',
		name: 'no input',
		phone: 'no input',
		facebook: 'no input'
	}
});