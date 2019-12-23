//jshint node: true, esversion: 6

var express = require('express');
var router = express.Router();

const Lot = require('../model/lot');
const App = require('../app');

const server = require('http').createServer(router);
// obsługa Socket.io
// const io = socketio.listen(server);
const io = require('socket.io')(server);

// Get Homepage
router.get('/', (req, res) => {
	// console.log(Lot);
	// console.log(App);
	res.render('index');
});

router.post('/', (req, res) => {
	if (req.body.params === 0) {
		Lot.first((err, obj) => {
			// res.json(JSON.stringify(obj));
			let result;
			now = new Date();
			current_date = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
			// end_date = obj.end_date (Mon, 02 Apr 2012 20:16:35 GMT);
			
			obj.forEach(element => {
				// end_date = element.time;
				// element.time = (end_date.getTime() -  current_date.getTime())/1000;
				// console.log(element.time);

				let temp = element.time - now;
				console.log("obj");
				console.log(now);
				console.log(element.time);
				console.log(temp);
				console.log("obj");
				// temp = temp/ 1000;
				// temp/= 60;
				// console.log(temp);
				// element.time = Math.abs(Math.round(temp));
				if (temp <= 0) {
					Lot.disable(element._id);
					obj.slice(obj.indexOf(element), 1);
				}

				if (!res.locals.user) {
					element.type = undefined;
				}
			});
			
			
			// console.log(obj);
			// var millisDiff = end_date.getTime() -  current_date.getTime();
			// console.log(millisDiff / 1000);


			res.json(JSON.stringify(obj));
		});
	} else {
		// console.log(req.body.params);
		// console.log("----");
		// console.log(res.locals.user);
		// console.log("----");

		Lot.next(req.body.params, (err, obj) => {
			// console.log(obj);
			let result;
			now = new Date();
			current_date = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
			// end_date = obj.end_date (Mon, 02 Apr 2012 20:16:35 GMT);
			
			obj.forEach(element => {
				// end_date = element.time;
				// element.time = end_date.getTime() -  current_date.getTime();
				
				let temp = element.time - now;

				// console.log("obj");
				// console.log(element.time);
				// console.log(now);
				// console.log(temp);
				// console.log("obj");

				if (temp <= 0) {
					Lot.disable(element._id);
					obj.slice(obj.indexOf(element), 1);
				}

				if (!res.locals.user) {
					//  || res.locals === undefined
					// console.log("----");
					// console.log(res.locals.user);
					// console.log(res.locals);
					// console.log("----");
					element.type = undefined;
				}
			});
			
			
			// var millisDiff = end_date.getTime() -  current_date.getTime();
			// console.log(millisDiff / 1000);

			// console.log();
			res.json(JSON.stringify(obj));
		});
	}
});

function isUserAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.render('/users/login');
		// res.redirect('/users/login');
	}
}

module.exports = router;

// // Get Homepage
// router.get('/', function(req, res){
// 	res.render('index');
// });

// function ensureAuthenticated(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	} else {
// 		//req.flash('error_msg','You are not logged in');
// 		res.redirect('/users/login');
// 	}
// }

// {
//     router
//     // FunLogIn,
//     // FunSignUp
// };