let express = require('express');
let router = express.Router();
let path = require('path');
let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  port 	   : '3306',
  user     : 'root',
  password : '123',
  database : 'temp'
});
connection.connect();

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

router.get('/', (req, res) => {
	var msg;
	var errMsg = req.flash('error');

	if (errMsg) {
		msg = errMsg;
	}

	res.render('join', { 'message' : msg });
});

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	done(null, id);
});

passport.use('local-join', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback : true
	}, (req, email, password, done) => {
		var query = connection.query('select * from user where email=?', [email], (err, rows) => {
			if (err) return done(err);

			if (rows.length) {
				console.log('exists user!!');
				return done(null, false, {message : 'your email is already user'});
			} else {
				var sql = {email: email, password: password};
				var query = connection.query('insert into user set ?', sql, (err, rows) => {
					if (err) throw err;

					return done(null, {'email' : email, id : rows.insertId});
				});
			}
		})
	}
));

// router.post('/', passport.authenticate('local-join', {
// 	successRedirect : '/main',
// 	failureRedirect : '/join',
// 	failureFlash : true
// }));

router.post('/', passport.authenticate('local-join', {
	successRedirect : '/main',
	failureRedirect : '/join',
	failureFlash : true
}));

module.exports = router;