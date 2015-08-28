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


module.exports = router;