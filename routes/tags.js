var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/usertaglist/:id', function(req, res){
   var db = req.db; 
   var userId = req.params.id;
   db.collection('tagpool').find( { 'user_id' : userId } ).toArray( function(err, items){
		res.json(items);
   });
});

router.post('/addtag', function(req, res){
    var db = req.db;
	
    db.collection('tagpool').insert( req.body, function(err , result){
        res.send(
            { 
				msg:(err === null) ? '' : err,
				_id: result[0]._id
			}
        );
    });
});


router.delete('/deletetag/:id', function(req, res){
	var db = req.db;
	var tagId = req.params.id;
	db.collection('tagpool').removeById(tagId, function(err){
		res.send(
			(err === null) ? { msg:'' } : { msg:err }
		);
	});
});


router.put('/updatetag/:id', function(req, res){
    var db = req.db;
    var tagId = req.params._id;
	var valueToSet = {
		$set: {
			'key': req.body.key,
			'value': req.body.value
		}
	}
    db.collection('tagpool').updateById( tagId, valueToSet, function(err){
        res.send(
            (err === null) ? { msg:'' } : { msg:err }
        );
    });
});



module.exports = router;