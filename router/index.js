let express = require('express');
let router = express.Router();
let path = require('path');
let user = require('./user');
let join = require('./join');
let main = require('./main');
let login = require('./login');

router.get('/', (req, res) => {
	res.render(path.join(__dirname, '../views/index.ejs'));
})

router.use('/user', user);
router.use('/join', join);
router.use('/main', main);
router.use('/login', login);

module.exports = router;