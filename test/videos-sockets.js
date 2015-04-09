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

		client.on('connect', function (data) {
			client.emit("testCliente", {'hola':'mundo desde el cliente'});		
		});

		client.on('testCliente', function (data) {
			// expect(data).to.have.property('hola', 'mundo desde el csliente');
			
			client.disconnect();
			done();
		});

	});

});