let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let router = express.Router();

router.get('/', (req, res) => {
	res.render('login');
});

module.exports = router


