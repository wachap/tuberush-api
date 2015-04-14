/**
 * Dependencies
 */
var Io = require('socket.io');


var socketIO = function (config) {
	config = config || {};
	var io = Io.listen(config.server);

	io.sockets.on('connection', function (socket) {

		socket.on('newVideo', function (data) {
			socket.emit('sendVideo', data );
		});
		
	});

}


module.exports = socketIO;