var app = app || {};

app.AddTagFormView = Backbone.View.extend({
	el: '#addTagForm',
	
	events: {
		'click button#btnAddTag': 'addTag'
	},
	
	
	initialize: function(tagList, tagFieldModel){
        _.bindAll(this, 'render', 'addTag');
		
		this.collection = tagList;
		this.model= tagFieldModel;
	},

	render: function(){

		return this; // for chainable calls, like .render().el
	},
	
	
	addTag: function(){
        var self = this;
        var newTag = {
			user_id: this.model.get("user_id"),
            key: $("#addTagForm input#inputTagKey").val(),
            value: $("#addTagForm input#inputTagValue").val()
        };
        
        $.ajax({
            type: 'POST',       
            data: newTag,
            url: '/tags/addtag',      
            dataTye: 'JSON'
        }).done(function(response){
            
		//Check for successful (blank) response
            if ( response.msg === ''){
                $("#addTagForm input#inputTagKey").val("");
                $("#addTagForm input#inputTagValue").val("");
				
				//trigger the reload event let the tagList refresh
				//$('#tagField').trigger('reload');
				
				var tag = new app.Tag();
				newTag._id = response._id;
                tag.set(newTag);
				
                self.collection.add(tag);   
            
            }else{
                //If something goes wrong, alert the error message that our service returned 
                alert('Error: ' + respnse.msg);
            }
            
        });
        
	}
	
	
});