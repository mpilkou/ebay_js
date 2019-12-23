//jshint node: true, esversion: 6

exports = module.exports = function(io){
	const table = io
    .of('/table')
    .on('connect', (socket) => {
        // console.log()
        socket.emit('start', (date) => {
            console.log(date);
        });

        // socket.emmit('start', "aaa");
	});
};
