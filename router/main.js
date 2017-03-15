let express = require('express');
let router = express.Router();
let path = require('path');
let mysql      = require('mysql');

router.get('/', (req, res) => {
	console.log('main js loaded ' , req.user);
	var id = req.user;
	res.render('join/success', { id : id});
})


module.exports = router