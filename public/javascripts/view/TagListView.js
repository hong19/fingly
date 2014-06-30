var app = app || {};

app.TagListView = Backbone.View.extend({
	el: '#tagList',
	
	initialize: function( tagList ){
		var self = this;
		_.bindAll(this, 'render', 'appendTag');
		
		
		this.collection = tagList;
		
        this.collection.bind('add', this.appendTag);
		//this.collection.bind('reset', this.cleanAllTag);
		
	},
	
	
	render: function(){
		var self = this;
		_(this.collection.models).each(function(tag){
			self.appendTag(tag);
		}, this);
	},
	
	
	appendTag: function(tag){
		var tagView = new app.TagView({
			model: tag
		});
		$('table tbody', this.el).append(tagView.render().el);
	}
	

});

