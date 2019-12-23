//jshint esversion: 6
const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

// Login
router.get('/login', function (req, res) {
	res.render('login');
});

router.get('/', function (req, res) {
	// res.render('index');
	res.redirect('/');
});

// router.get('/login/signup', function (req, res) {
// 	// res.render('index');
// 	res.redirect('/');
// });

router.post('/login/signup', function (req, res) {
	let fname = req.body.fname;
	let sname = req.body.sname;
	let email = req.body.email;
	let password = req.body.password1;
	// console.log("email");
	// console.log("------");
	// console.log(req.body);
	// console.log("------");
	// req.body = [req.body];

	req.checkBody('fname', 'Fname is empty').notEmpty();
	req.checkBody('sname', 'Sname is empty').notEmpty();
	req.checkBody('email', 'Email is empty').notEmpty();
	req.checkBody('email', 'Invalid email').isEmail();
	req.checkBody('password1', 'Password is empty').notEmpty();
	req.checkBody('password2', 'Confirm is empty').notEmpty();
	req.checkBody('password2', 'Not simular passwords').equals(password);

	

	User.findUserbyEmail(email, (err,obj) => {
		
		if (obj) {
			req.checkBody('email', 'Email is already exists').not().equals(obj.email);
			// let errors = req.validationErrors();
		}
	
		let errors = req.validationErrors();
		// console.log("req.validationErrors()---------------");
		// console.log(errors);
		if (errors) {
			console.log(errors);
			res.render('login', {
				errors: errors
			});
			
		} else {
			let user = new User({
				'fname': fname,
				'sname': sname,
				'email': email,
				'password': password
			});
			
			// console.log("----------------------------");
			// console.log(user.crUser);
			// console.log("----------------------------");
			// console.log(User.crUser);
			// console.log("----------------------------");
	
			User.crUser(user, (err, usr) => {
				if(err) {
					console.log(user);
				}
			});
	
			req.flash('success_msg', 'Sucsecc you may log in');
			res.redirect('/users/login');
		}
	});

	// res.json(JSON.stringify({"aaa":"aaaa"}));
});

passport.use(new LocalStrategy(
	function (email, password, done) {
		User.findUserbyEmail(email, function (err, user) {
			if (err) { throw err; }
			if (!user) {
				return done(null, false, { message: 'Undefined User' });
			}

			User.isNotSamePassword(password, user.password, function (err, match) {
				if (err) { throw err; }
				if (match) {
					return done(null, user);
				} 
				else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
	});
}));

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});


// successRedirect: '/',
router.post('/login', 
	passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }),
	function (req, res) {
		// console.log(User.findUserbyEmail('aaa@aaa.com'));
		// console.log(User.findOne({ 'email': "aaa@aaa.com" }, (AAA) => {
		// 	console.log(AAA);
		// }));
		// console.log(req.body);
		req.flash('success_msg', 'Login');
		
		res.redirect('/');

		// console.log("------");
		// console.log(req.body);
		// console.log("------");
		

		// let email = req.body.emailL;
		// let password = req.body.passwordL;


		// req.checkBody('emailL', 'Email is empty').notEmpty();
		// req.checkBody('emailL', 'Invalid email').isEmail();
		// req.checkBody('passwordL', 'Password is empty').notEmpty();

		// let errors = req.validationErrors();
		// if (errors) {
		// 	console.log(errors);
		// 	res.render('login', {
		// 		errors: errors
		// 	});
			
		// } else {
		// 	console.log("OK");
		// }

	// console.log(email);

	// res.json(JSON.stringify({"aaa":"aaaa"}));
});

router.get('/logout', (req,res,next) => {
	req.logout();
	req.flash('success_msg', 'Loggout');
	res.redirect('/users/login');
});

module.exports = router;