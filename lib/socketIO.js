/**
 * Dependencies
 */
var Io = require('socket.io');


var socketIO = function (config) {
	config = config || {};
	var io = Io.listen(config.server);

	io.sockets.on('connection', function (socket) {
		socket.emit('testServer', {hola:'mundo desde el server'});

		socket.on('testCliente', function (data) {
			console.log(data);
		});
	});

}


module.exports = socketIO;