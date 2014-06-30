var app = app || {};

app.TagFieldView = Backbone.View.extend({
	el: '#tagField',
	
	initialize: function(){
		_.bindAll(this, 'render', 'changeUser');
		
		this.model.bind('change', this.render);
		
		this.$el.on("userChange", this.changeUser);
		this.$el.on("reload", this.render);
		
		this.tagList = new app.TagList();
		this.tagListView = new app.TagListView(this.tagList);
		this.addTagFormView = new app.AddTagFormView(this.tagList, this.model);
		
		
	},
	
	render: function(){
		var self = this;
		
		for(var i = this.tagList.length - 1; i >= 0 ; i-- ){
			this.tagList.remove(this.tagList.models[i]);
		}
		
		$.getJSON('/tags/usertaglist/' + this.model.get("user_id"), function(data){
			var tagListData = data;
			
			_(tagListData).each(function(tag){
				self.tagList.add(tag);
			}, this);
			
		});
		
		return this;
	},
	
	changeUser: function(event, user_id){
		this.model.set("user_id", user_id);
		
	}
	
});

