var express = require('express');
var path = require('path');
var router = express.Router();

/*
 * Serve the static pages
 */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'index.html'));
});

router.get('/main', function(req, res) {
  res.sendFile(path.join(__dirname + '/main/','main.html'));
});

router.get('/my-list', function(req, res) {
  res.sendFile(path.join(__dirname + '/my-list/', 'my-list.html'));
});


/*
 * GET all the what-to-dos
 */
router.get('/all-what-to-dos', function(req,res){
	var db = req.db;
	db.collection('whatToDos').find().toArray(function(err,items){
		res.json(items);
	});
});

/*
 * POST to add a new what-to-do
 */
router.post('/add-what-to-do', function(req,res){
	var db = req.db;
	db.collection('whatToDos').insert(req.body, function(err,result){
		res.send(
			(err === null) ? { msg: '' } : { msg: err } 
		);
	});
});

/*
 * POST to authenticate a user attempting to login
 */
router.post('/authenticate', function(req,res) {

  var db = req.db;
  db.collection('users').findOne({'user.id':req.body.username,'user.password':req.body.password},function(err,data) {
    
    // TO-DO: Find a better way to do error handling if no user exists
  	// If we don't find anybody in the DB, send an error 500 back
    if(data === null){
      res.status(500);
      res.send(null);
    } else {

      // return the user sans the password
      res.send({
        _id: data._id,
        user: {
          id: data.user.id
        }
      });
    }
  });
});

/*
 * POST to add a new what-to-do to a custom user list
 */
router.post('/my-list/add-what-to-do', function(req,res){
	var db = req.db;
	db.collection('myWhatToDos').insert(req.body, function(err,result){
		res.send(
			(err === null) ? { msg: '' } : { msg: err } 
		);
	});
});

/*
 * GET all the what-to-dos for a user
 */
router.get('/my-what-to-dos/:userId', function(req,res){
	var db = req.db;
	var userId = req.params.userId;
	db.collection('myWhatToDos').find({'userId':userId}).toArray(function(err,items){
		res.json(items);
	});
});

module.exports = router;