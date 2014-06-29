var app = app || {};

app.TagFieldView = Backbone.View.extend({
	el: '#tagField',
	
	initialize: function(){
		_.bindAll(this, 'render');
		
		this.model.bind('change', this.render);
		
		
		this.$el.on("userChange", this.changeUser);
		
		var tagList = new app.TagList();
		var tagListView = new app.TagListView(tagList);
		
	},
	
	render: function(){
		var self = this;
			
		},
	
	changeUser: function(){
		console.log("change user");
		
	}
	
});

