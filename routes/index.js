var winston = require('winston');
var config = require('../config/config.js');

exports.index = function(req, res){
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var room = req.params.room;

	winston.info('[/' + room + '] access from ' + ip);

	if(room !== 'r0' && room !== 'r1' && room !== 'r2' && room !== 'r3') {
		res.status(404);

		if (req.accepts('html')) {
			res.render('404', { url: req.url });
			return;
		}
	}

	res.render('index', {
		conference: config.conference,
		channel: config.irc.channel.replace('#', ''),
		room: room,
	});
};
