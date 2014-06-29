var app = app || {};

app.TagView = Backbone.View.extend({
	tagName: 'tr',
	
	events: {
	},
	
	initialize: function(){
		_.bindAll(this, 'render', 'unrender', 'remove');
		
		this.model.bind('change', this.render);
		this.model.bind('remove', this.unrender);
	},

	render: function(){
		var innerHtml = "";
		tableContent += "<td>" + this.model.get("key") + "</td>";
        tableContent += "<td>" + this.model.get("value") + "</td>";
        tableContent += "<td><a href='#' class='linkEditTag' rel='" + this.model.get("_id") + "'>Edit</a></td>";
        tableContent += "<td><a href='#' class='linkDeleteTag' rel='" + this.model.get("_id") + "'>Delete</a></td>";
		
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
			url: '/tags/deletetag/' + this.model.get("_id")
		}).done(function(response){
			if ( response.msg === '' ) {
		        self.model.destroy();
			}else{
				alert('Error ' + response.msg);
			}	   
			
		});		
	}
});