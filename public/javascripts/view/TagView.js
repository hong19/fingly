var app = app || {};

app.TagView = Backbone.View.extend({
	tagName: 'tr',
	
	events: {
		'click a.linkDeleteTag': 'remove',
		'click a.linkUpdateTag': 'update'
	},
	
	initialize: function(){
		_.bindAll(this, 'render', 'unrender', 'remove', 'update');
		
		this.model.bind('change', this.render);
		this.model.bind('remove', this.unrender);
		
	},

	render: function(){
		var innerHtml = "";
		innerHtml += "<td>" + this.model.get("key") + "</td>";
        innerHtml += "<td>" + this.model.get("value") + "</td>";
        innerHtml += "<td><a href='#' class='linkUpdateTag' rel='" + this.model.get("_id") + "'>Update</a></td>";
        innerHtml += "<td><a href='#' class='linkDeleteTag' rel='" + this.model.get("_id") + "'>Delete</a></td>";
		
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
	},
	
	update: function(){
		var self = this;
		var tag2Update = {
			'_id': $('a.linkUpdateTag', this.$el).attr('rel'),
			'key': $("#addTagForm input#inputTagKey").val(),
			'value': $("#addTagForm input#inputTagValue").val()
		};
	
		$.ajax({
			type: 'POST',
			data: tag2Update,
			url: '/tags/updatetag',
			dataTye: 'JSON'
		}).done(function(response){
				
			//Check for successful (blank) response
			if ( response.msg === ''){
				
				$("#addTagForm input#inputTagKey").val("");
				$("#addTagForm input#inputTagValue").val("");
				self.model.set(tag2Update);
				
			}else{
				//If something goes wrong, alert the error message that our service returned 
				alert('Error: ' + response.msg);
			}
		});
	}
});