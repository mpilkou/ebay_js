//jshint esversion: 6
const express = require('express');
const router = express.Router();

const User = require('../model/user');
const Lot = require('../model/lot');

function isUserAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		// res.render('/users/login');
		res.redirect('/users/login');
	}
}

// Settings
// router.get('/settings', isUserAuthenticated, function (req, res) {
// 	res.render('settings');
// });

router.get('/history', isUserAuthenticated, function (req, res) {
	res.render('history');
});

router.post('/history', (req, res) => {
	// console.log("post");
	Lot.findByIdUser(res.locals.user._id, (err, obj) => {
		// console.log(obj);
		res.json(JSON.stringify(obj));
	});
	// let tab;
});


router.post('/getLot', (req,res) => {
	let params = req.body.params;

	// console.log(res.locals.user._id);

	Lot.updateLot(params, res.locals.user._id, (err, obj) => {
		if (err) return handleError(err);
		res.json(JSON.stringify({}));
	});
	
});

router.post('/getBuy', (req,res) => {
	let params = req.body.params;
	// console.log("params");
	// console.log(params);
	// console.log(res.locals.user._id);

	
	// console.log("aaa");
	// // Lot.disable(params, (err, obj) => {
	// 	console.log("aaa");
	// 	// if (err) return handleError(err);
		Lot.updateBuy(params, res.locals.user._id, (err, obj) => {
			if (err) return handleError(err);
			res.json(JSON.stringify({}));
		});
	// });

	// res.redirect('../');
});

router.get('/addLot', isUserAuthenticated, function (req, res) {
	res.render('addLot');
});

router.post('/addLot',isUserAuthenticated, function (req, res) {
	let name = req.body.name;
	let text = req.body.description;
	let prise = req.body.prise;
	let type = req.body.type;
	let date = req.body.date;
	let time = req.body.time;
	let id = res.locals.user._id;
	// let large = req.body.large;
	// console.log(req.locals);
	// console.log(id);
	// console.log(req.body);
	// console.log(req.body.date);
	// console.log(req.body.time);
	
	if (name) {
		console.log("lot");
		Lot.findLotbyName(name, (err,obj) => {
			console.log("lot");
			console.log(obj);
			if (err) {
				console.log(`errors: ${err}`);
			} else {
				console.log("lot");
				// console.log(obj);
				let lot = new Lot({
					name: name,
					text: text,
					prise: prise,
					type: type,
					owner: id,
					buy: id,
					isActive: true,
					time: new Date(`${date}T${time}`)
				});
				
				Lot.crLot(lot, (err,obj) => {
					if (err) {
						console.log(`loterr: ${obj}`);
					}
				});
			}
		});
	}

	res.redirect('../user/addLot');
});

router.get('/messages',isUserAuthenticated, (req,res) => {
	res.render('messages');
});

router.post('/messages', (req,res) => {
	// res.render('messages');
	// console.log(res.locals.user);
	// console.log(req.locals.user);
	// console.log(req.locals.user);
	User.getMessages(res.locals.user._id, (err, obj) => {
		// console.log(obj);
		res.json(JSON.stringify({params: obj}));
	});
});
// const bodyParser = require('body-parser');

router.get('/mail/:idLot',isUserAuthenticated, (req,res) => {
	res.render('writeMessage');
});

router.post('/mail/:idLot',isUserAuthenticated, (req,res) => {
	let idLot = req.params.idLot;
	let mail = req.body.mailText;
	let from = res.locals.user._id;

	Lot.findOwner(idLot, (err, obj) => {
		// console.log('aaaa');
		// console.log(obj.owner);
		User.addMessage(obj.owner, from, mail, (err,obj) => {

		});
	});
	res.render('writeMessage');
});

router.get('/ansver/:idUser',isUserAuthenticated, (req,res) => {
	res.render('writeAnsver');
});

router.post('/ansver/:idUser',isUserAuthenticated, (req,res) => {
	let idUser = req.params.idUser;
	let mail = req.body.mailText;
	let from = res.locals.user._id;
	// idUser = ;
	// idUser.slice(1,0);
	
	User.findById(idUser, (err, obj) => {
		// console.log(idUser);
		User.addMessage(idUser, from, mail, (err,obj) => {
			
		});

	});


	res.render('writeAnsver');
		
	// });
	// res.json(JSON.stringify({params: obj}));
});


module.exports = router;