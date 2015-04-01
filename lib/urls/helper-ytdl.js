/**
 * Dependencies
 */
var ytdl = require('ytdl-core');


/**
 * Local variables
 */
var options = {
	filter: function(format) { return format.container === 'mp4'; },
	downloadURL: true
};


/**
 * Module export
 */
var HelperYtdl = function () {
	$this = this;

	this.data = { "video": {"error": "no se encontro el video"} };
	this.setUrl = function (url) {$this.url = url};	
	this.searchVideo = function (callback) {
		getVideo(this.url, function(videoLinks, videoInfo) {
			$this.data = {
				"video": {
					"title": videoInfo.title,
					"links": {
						"mp4": {
							"360p": videoLinks.v360p,
							"480p": videoLinks.v480p,
							"720p": videoLinks.v720p
						}
					}
					
				}
			}

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
		// creo un array con los videos
		var videos 		= info.formats,	
		// llamo a las funciones
			videoLinks 	= getVideoUrl(videos),
			videoInfo 	= getVideoInfo(info);

		// Paso todo al callback
		callback(videoLinks, videoInfo);
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

// Obtiene la informacion del video
function getVideoInfo (video) {
	var title = video.title
	data = {"title": title}

	return data;
};

module.exports = HelperYtdl;
