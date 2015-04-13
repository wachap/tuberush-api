var os = require("os");
var request = require('supertest-as-promised');
var api = require('../server.js');
// var host = process.env.API_TEST_HOST || api;
var host = 'http://localhost:3000'
var io = require('socket.io-client');


var options = {
	transports: ['websocket'],
	'force new connection': true
};


describe('Probando sockets [/videos]', function () {

	it("canal testServer", function (done) {
		var client = io.connect(host, options);

		client.on("testServer", function (data) {
			console.log(data);
			client.emit('testCliente', {hola:'mundo desde el cliente'});

			client.disconnect();
			done();
		});

		// client.on("testCliente", function (data) {
		// 	console.log(data);

		// });
	});

	// User sends a video to everyone
	// it("deberia ser capaz de emitir videos", function (done) {
	// 	var client1, client2, client3;
	// 	var data = {
	// 		"video": {
	// 			"id": "TcnQdb8BYcY",
	// 			"url": "https://www.youtube.com/watch?v=TcnQdb8BYcY",
	// 			"title": "Ed Sheeran - Thinking Out Loud HD (Sub español - ingles)",
	// 			"iurlsd": "https://i.ytimg.com/vi/TcnQdb8BYcY/sddefault.jpg",
	// 			"thumbnail_url": "https://i.ytimg.com/vi/TcnQdb8BYcY/default.jpg"
	// 		}
	// 	};

	// 	var checkVideo = function (client) {
	// 		client.on('newVideo', function (data) {
	// 			done()
	// 		});
	// 	};


	// });

});

// https://github.com/liamks/Testing-Socket.IO/blob/master/test/test-chat-server.js