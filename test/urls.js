var request = require('supertest');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Coleccion de Links [/urls]', function() {

	describe('GET', function() {

		it('deberia obtener enlaces de un video', function(done) {

			var url = "https://www.youtube.com/watch?v=qp6E17m7DR8&list=PLfdUpSX6EVYYtcfhXLoZA-YvvuetxKnrj";
			
			request
				.get('/urls/?url='+url)
				.expect(200)				
				.expect('Content-Type', /application\/json/)
				.end(function(err, res) { 
					var body = res.body;
					
					expect(body).to.have.property('video');

					video = body.video;

					expect(video).to.have.property('links');
					done();
				});

		});

	});

});