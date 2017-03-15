let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let route 	= require('./router/index');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let session = require('express-session');
let flash = require('connect-flash');

app.listen(3000, (req, res) => {
	console.log('server listen...');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');

app.use(session({
	secret : 'keyboard cat',
	resave : false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(route);