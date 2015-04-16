var os = require("os");
var request = require('supertest-as-promised');
var host = process.env.API_TEST_HOST || 'http://localhost:3000';
var io = require('socket.io-client');


var options = {
	transports: ['websocket'],
	'force new connection': true
};


describe('Probando sockets [/videos]', function () {

	// User sends a video to everyone
	it("deberia ser capaz de emitir videos", function (done) {
		var videos = 0;
		var client1, client2, client3;
		var video = {
			"video": {
				"id": "TcnQdb8BYcY",
				"url": "https://www.youtube.com/watch?v=TcnQdb8BYcY",
				"title": "Ed Sheeran - Thinking Out Loud HD (Sub español - ingles)",
				"iurlsd": "https://i.ytimg.com/vi/TcnQdb8BYcY/sddefault.jpg",
				"thumbnail_url": "https://i.ytimg.com/vi/TcnQdb8BYcY/default.jpg"
			}
		};

		var checkVideo = function (client) {
			client.on('sendVideo', function (data) {				
				client.disconnect();
				videos++;
				if (videos === 3) {
					console.log("Se emitio sendVideo 3 veces");
					done();
				};
			});
		};

		client1 = io.connect(host, options);
		checkVideo(client1);
		client1.on('connect', function (data) {
			client1.emit('newVideo', video);

			client2 = io.connect(host, options);
			checkVideo(client2);
			client2.on('connect', function (data) {
				client2.emit('newVideo', video);

				client3 = io.connect(host, options);
				checkVideo(client3);
				client3.on('connect', function (data) {
					client3.emit('newVideo', video);
				});
			});
		});	

	});

});

// https://github.com/liamks/Testing-Socket.IO/blob/master/test/test-chat-server.js