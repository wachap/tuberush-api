/**
 * Dependencies
 */
var Io = require('socket.io');


/**
 * Local variables
 */


var socketIO = function (config) {
	config = config || {};
	var io = Io.listen(config.server);

	io.sockets.on('connection', function (socket) {
		socket.emit('test', {hola:'mundo desde el server'});

		socket.on('testCliente', function (data) {
			console.log(data);
		});
	});

}


module.exports = socketIO;