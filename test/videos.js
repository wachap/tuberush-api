var request = require('supertest-as-promised');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Coleccion de Links [/videos]', function () {

	describe('POST', function () {
		it('deberia registrar un video', function (done) {
			var data = {
				"video": {
					"id": "TcnQdb8BYcY",
					"url": "https://www.youtube.com/watch?v=TcnQdb8BYcY",
					"title": "Ed Sheeran - Thinking Out Loud HD (Sub español - ingles)",
					"iurlsd": "https://i.ytimg.com/vi/TcnQdb8BYcY/sddefault.jpg",
					"thumbnail_url": "https://i.ytimg.com/vi/TcnQdb8BYcY/default.jpg"
				}
			};

			request
				.post('/videos')
				.set('Accept', 'application/json')
				.send(data)
				.expect(201)
				.expect('Content-Type', /application\/json/)
				.end(function (err, res) {
					var video;

					var body = res.body;
					console.log('POST /videos', body);

					// Video existe
					expect(body).to.have.property('video');
					video = body.video;

					// Propiedades
					expect(video).to.have.property('id', 'TcnQdb8BYcY');
					expect(video).to.have.property('url', 'https://www.youtube.com/watch?v=TcnQdb8BYcY');
					expect(video).to.have.property('title', "Ed Sheeran - Thinking Out Loud HD (Sub español - ingles)");
					expect(video).to.have.property('iurlsd', 'https://i.ytimg.com/vi/TcnQdb8BYcY/sddefault.jpg');
					expect(video).to.have.property('thumbnail_url', 'https://i.ytimg.com/vi/TcnQdb8BYcY/default.jpg');
					expect(video).to.have.property('downloads', 1);

					done();
				});
		});
	});

	describe('GET', function () {
		it('deberia obtener informacion de un video', function (done) {
			this.timeout(10000);
			var id = "qp6E17m7DR8";
			var url = "https://www.youtube.com/watch?v="+id;

			request
				.get('/videos/url/?url='+url)
				.expect(200)
				.expect('Content-Type', /application\/json/)
				.end(function (err, res) {
					var video;

					var body = res.body;
					console.log('GET /videos/url/?url='+url, body);

					// Video Existe
					expect(body).to.have.property('video');
					video = body.video;

					// Propiedades
					expect(video).to.have.property('success', true);
					expect(video).to.have.property('id', id);
					expect(video).to.have.property('links');

					done(err);
				});
		});
	});

	describe('GET', function () {
		it('deberia obtener los 5 ultimos videos descargados', function (done) {
			request
				.get('/videos')
				.expect(200)
				.expect('Content-Type', /application\/json/)
				.end(function (err, res) {
					var videos;

					var body = res.body;
					console.log('GET /videos', body);

					expect(body).to.have.property('videos');
					videos = body.videos;

					expect(videos.length).to.equal(1);

					done(err);
				});
		});
	});

});