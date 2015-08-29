var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'index.html'));
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