/**
 * Dependencies
 */
var helperIo = require('./videos/helper-io');
var Io = require('socket.io');


var socketIO = function (config) {
	config = config || {};
	var io = Io.listen(config.server);

	io.sockets.on('connection', function (socket) {

		socket.on('newVideo', function (data) {			
			helperIo(data.id, function (video) {
				socket.broadcast.emit('sendVideo', video);
				socket.emit('sendVideo', video);
			});	
		});
		
	});

}


module.exports = socketIO;