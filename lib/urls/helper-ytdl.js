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
var data = {};


/**
 * Module export
 */
var HelperYtdl = function (url) {
	this.url = url;
	this.getData = {};
	


	traerEnlaces(this.url, function(links){
		console.log(links)
	});

		// data = 
		// {
		// 	"video": {
		// 		"title": title,
		// 		"links": 
		// 		{
		// 			"mp4": {
		// 				"360p": v360p,
		// 				"480p": v480p,
		// 				"720p": v720p
		// 			}
		// 		}
				
		// 	}
		// };
};


/**
 * Local functions
 */
function traerEnlaces (url, callback) {
	ytdl.getInfo(url, options, function (err, info) {
		links = info.formats.forEach(getUrls);	
		
		setTimeout( console.log("1: "+links) ,5000);
		callback(links);
	});
};

function getUrls (elem, index, array) {
	var v720p, v480p, v360p;

	if (elem.container == "mp4" && elem.resolution == "720p") {
		v720p = elem.url;						
	};

	if (elem.container == "mp4" && elem.resolution == "480p") {
		v480p = elem.url;						
	};

	if (elem.container == "mp4" && elem.resolution == "360p") {
		v360p = elem.url;						
	};
	data = {"720p": v720p, "480p": v480p, "360p": v360p};
	console.log(data);
	return data;
};	


module.exports = HelperYtdl;
