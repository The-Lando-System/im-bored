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



module.exports = router;