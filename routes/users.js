var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

//
router.get('/userlist', function(req, res){
    var db = req.db; 
    db.collection('userlist').find().toArray( function(err, items){
        res.json(items);
    })
});

router.get('/showprofile/:id', function(req, res){
   var db = req.db; 
   var userToShow = req.params.id;
   db.collection('userlist').findById(userToShow, function(err, result){
       res.json( result );
   });
});

router.delete('/deleteuser/:id', function(req, res){
   var db = req.db;
   var userToDelete = req.params.id;
   db.collection('userlist').removeById(userToDelete, function(err, result){
       res.send((result === 1) ? { msg:'' } : { msg:"error" + err });
   });
});

router.post('/adduser', function(req, res){
    var db = req.db;
    db.collection('userlist').insert(req.body, function(err, result){
		res.send(
			{ 
				msg:(err === null) ? '' : err,
				_id: result[0]._id
			}
        );
    });
});

router.put('/updateuser/:id', function(req, res){
    var db = req.db;
    var userToUpdate = req.params.id;
	var valueToSet = {
		'name': req.body.name,
		'phone': req.body.phone,
		'facebook': req.body.facebook
	}
    db.collection('userlist').updateById( userToUpdate, valueToSet, function(err){
        res.send(
            (err === null) ?　{ msg:'' } : { msg:err }
        );
    });
});

module.exports = router;
