//jshint node: true, esversion:6

const mongoose = require('mongoose');
const User = require('./user');

const schemaLot = mongoose.Schema({
	name: String,
	text: String,
	prise: Number,
	type: String,
	owner: Object,
	buy: Object,
	isActive: Boolean,
	time: Date
});

module.exports = mongoose.model('Lot', schemaLot);
const Lot = module.exports;

module.exports.crLot = (lot, ansver) => {
	// console.log("aaa");
	// console.log(lot.save);
	// console.log("aaa");
	lot.save(ansver);
};

module.exports.first = (ansver) => {
	// Lot.find({
	// 	isActive: true
	// }, (err, obj) => {
	// 	console.log(obj.sort({date: 1}).limit(5));
	// });

	let temp = Lot.find({
		isActive: true
	})
	.sort({_id: 1 }).limit(5);

	temp.exec(ansver);	
};

module.exports.next = (curId, ansver) => {
	let temp = Lot.find({
		$and: [
			{_id: {$gt: curId}},
			{isActive: true}
		]
	}).sort({_id: 1 }).limit(3);

	temp.exec(ansver);	
};

module.exports.findByIdUser = (idUser, ansver) => {
	
	Lot.find({
		$or: [ 
			{
				owner: idUser
			},
			{
				buy: idUser
			}
		]
	}, ansver);
};

module.exports.disable = (idLot, ansver) => {
	// Lot.find({_id: idLot}, (err, obj) => {
	// 	// obj.isActive = false;
	// 	console.log(obj);
	// });
	// console.log(idLot);
	// idLot = '"'+idLot+'"';
	// console.log(ObjectId(idLot));

	// Lot.update({'_id':idLot }, 
	// 	{ $set: {isActive: false}},
	// 	// { $set: { isActive: false } }, 
	// 	{ new: true }, ansver);

	// db.lots.update({'_id':idLot}, 
	// 	{ $set: { isActive: false } }, 
	// 	{ new: true }, ansver);

	Lot.findById(idLot, function (err, obj) {
		if (err) return handleError(err);
		obj.set({ isActive: false });
		obj.save((err, ansver));
	});
};

module.exports.updateBuy = (idLot, idBuy, ansver) => {

	Lot.disable(idLot, () => {
		Lot.findById(idLot, function (err, obj) {
			if (err) return handleError(err);
			obj.set({ buy: idBuy });
			obj.save((err, ansver));
		});
	});
};

module.exports.updateLot = (idLot, idBuy, ansver) => {

	
	Lot.findById(idLot, function (err, obj) {
		if (err) return handleError(err);

		// console.log(obj.prise);

		obj.set({ buy: idBuy });
		obj.set({prise: Math.round(obj.prise + 5)});
		obj.save((err, ansver));
	});
	
};

module.exports.findLotbyName = (name, ansver) => {
	let question = {name: name};
	Lot.findOne(question, ansver);
};

module.exports.findOwner = (idLot, ansver) => {
	// let question = {name: name};
	// Lot.findOne(question, ansver);
	Lot.findById(idLot, ansver);
};

module.exports.showAllLots = (ansver) => {
	Lot.find({}, ansver);
};