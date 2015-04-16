/**
 * Dependencies
 */
var ytdl = require('ytdl-core');
var request = require('request');


/**
 * Local variables
 */
var options = {
	// filter: function(format) { return format.container === 'mp4'; },
	downloadURL: true
};


/**
 * Module export
 */
var HelperYtdl = function () {
	$this = this;

	this.data = {"video": {"success": false}};
	this.setUrl = function (url) {
		$this.url = url;
	};
	this.setPath = function (req) {
		$this.path = req.protocol + '://' + req.get('host');
	};

	this.searchVideo = function (callback) {
		getVideo(this.url, function( videoLinks, videoAudio, videoInfo) {
			if (videoLinks != null && videoInfo != null)
				$this.data = {
					"video": {
						"success": true,
						"id": videoInfo.id,
						"title": videoInfo.title,
						"links": {
							"mp4": {
								"v360p": videoLinks.v360p,
								"v480p": videoLinks.v480p,
								"v720p": videoLinks.v720p
							},
							"mp3": {
								"a128p": videoAudio
							}
						}
					}
				};

				// Registro el video descargado
				var videoNuevo = {
					"video": videoInfo
				};
				saveVideo(videoNuevo);

			callback($this.data);
		});
	};
};


/**
 * Local functions
 */

 // Obtiene el video MAIN FUNCTION
function getVideo (url, callback) {
	ytdl.getInfo(url, options, function (err, info) {
		if (err || url.search('youtube.com/watch?v=') == false) {
			videoLinks = null;
			videoInfo  = null;
		} else {
			// creo un array con los videos
			var videos 		= info.formats,
			// llamo a las funciones
				videoLinks 	= getVideoUrl(videos),
				videoAudio 	= getAudioUrl(videos),
				videoInfo 	= getVideoInfo(info);
		};

		// Paso todo al callback
		callback(videoLinks, videoAudio, videoInfo);
	});
};

// Obtiene el url de descarga de los videos
function getVideoUrl (videos) {
	var v720p = null, v480p = null, v360p = null;

	for (var i = 0; i < videos.length; i++) {
		if (videos[i].container == "mp4" && videos[i].resolution == "720p")
			if (v720p == null)
				v720p = videos[i].url;
		if (videos[i].container == "mp4" && videos[i].resolution == "480p")
			if (v480p == null)
				v480p = videos[i].url;
		if (videos[i].container == "mp4" && videos[i].resolution == "360p")
			if (v360p == null)
				v360p = videos[i].url;
	};

	return data = {"v720p": v720p, "v480p": v480p, "v360p": v360p};
};

// Obtiene el url del audio del video
function getAudioUrl (videos) {
	var audio = null;

	for (var i = 0; i < videos.length; i++) {
		if (videos[i].itag == "140" && audio == null) {
			audio = videos[i].url;
		}
	};

	return audio;
};

// Obtiene la informacion del video
function getVideoInfo (video) {
	var title = video.title,
		id = video.video_id,
		url = $this.url,
		iurlsd = video.iurlsd;
		thumbnail_url = video.thumbnail_url;

	data = {"id": id, "url": url, "title": title, "iurlsd": iurlsd, "thumbnail_url": thumbnail_url}

	return data;
};

function saveVideo (data) {		
	// si no hay video entonces retornamos false
	if (data.video == null) {
		return false;
	};

	var options = {
		json: true,
		url: $this.path + '/videos',
		method: 'POST',
		headers: {
			"content-type": "application/json"
		},
		body: data
	};

	request(options);
};

module.exports = HelperYtdl;
