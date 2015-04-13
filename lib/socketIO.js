/**
 * Dependencies
 */
var Io = require('socket.io');


var socketIO = function (config) {
	config = config || {};
	var io = Io.listen(config.server);

	io.sockets.on('connection', function (socket) {
		// Pruebas
		socket.emit('testServer', {hola:'mundo desde el server'});
		socket.on('testCliente', function (data) {
			console.log(data);
		});


		socket.on('newVideo', function (data) {
			io.socket.emit('sendVideo', data);
		});


	});

}


module.exports = socketIO;