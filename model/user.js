//jshint node: true, esversion: 6

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// const lotSchema = mongoose.Schema({
// 	title: String,
// 	text: String,
// 	prise: Number,
// 	isActive: Boolean
// });

const schemaUser = mongoose.Schema({
    fname: String,
    sname: String,
    email: String,
    password: {
        type: String
	},
	messages: Array
});
// lot: Array
// lot:[lotSchema]

// const exp = mongoose.model('User', schemaUser);
// exp.crUser = (user, ansver) => {
//     bcrypt.genSalt(10, function(err, salt) {
// 	    bcrypt.hash(user.password, salt, function(err, hash) {
// 	        user.password = hash;
// 	        user.save(ansver);
// 	    });
// 	});
// };

module.exports = mongoose.model('User', schemaUser);
const User = module.exports;

// module.exports.addLot = () => {
// };

module.exports.crUser = (user, ansver) => {
    bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(user.password, salt, function(err, hash) {
	        user.password = hash;
	        user.save(ansver);
	    });
	});
};

module.exports.findUserbyEmail = (email, ansver) => {
	// console.log(User.findOne({'email':email}));
	const question = { 'email': email };
	User.findOne(question, ansver);
};

// module.exports.findById = (id, ansver) => {
// 	// const question = { 'id': id };
// 	console.log("sss");
// 	User.findOne(ObjectId(id), ansver);
// };

module.exports.addMessage = (idUser, from, message, ansver) => {
	// User.findById(idUser, ansver);

	User.findById(idUser, function (err, obj) {
		if (err) return handleError(err);

		User.findById(from, (err1, obj1) => {

			// console.log(obj.prise);
			obj.messages.push({
				text: message,
				from: from,
				fromName: obj1.email,
				unread: true
			});
			obj.save((err, ansver));
		});
		
	});
};


module.exports.getMessages = (idUser, ansver) => {
	// User.findById(idUser, ansver);

	User.findById(idUser, ansver);
		// function (err, obj) {
		// if (err) return handleError(err);

		// // console.log(obj.prise);
		// // obj.messages.push({
		// // 	text: message,
		// // 	unread: true
		// // });
		// // obj.save((err, ansver));
		
		// //!!!!!!!!!
	// });
};

module.exports.isNotSamePassword = (comparePass, truePass, ansver) => {
    bcrypt.compare(comparePass, truePass, function(err, match) {
    	if(err) { console.log(err); throw err; }
    	ansver(null, match);
	});
};



// console.log("User.crUser");
// console.log(User.crUser);