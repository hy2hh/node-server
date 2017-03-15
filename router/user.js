let express = require('express');
let router = express.Router();
let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  port 	   : '3306',
  user     : 'root',
  password : '123',
  database : 'temp'
});

router.use(timeLog = (req, res, next) => {
	console.log('Time: ', Date.now());
	next();
})

router.get('/', (req, res) => {
	console.log(123);
	res.send('123');
});

router.post('/', (req, res) => {
	var name = req.body.name;
	var responseData = {};

	var query = connection.query('select * from job where id=' + name, (err, rows) => {
		if (err) throw err;

		if (rows[0]) {
			responseData = {
				result : 'ok',
				resultData : rows 
			}
		} else {
			responseData = {
				result : 'ok',
				resultData : '' 
			}
		}

		res.json(responseData);
	});
});

module.exports = router;