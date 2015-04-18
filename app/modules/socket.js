var https = require('https');
var http = require('http');
var fs = require('fs');
var co = require('co');

/**
 * Expose the socket Api
 */
var socket = Risotto.socket = {};

/**
 * Init
 * @param {app} app
 * @param {Function} done
 */
exports.initialize = function( app ){
    return function(fn) {

    	// ssl-socket?
    	/*var socketServer = null;
    	if(Risotto.config.socket.ssl.enabled) {
			// load the ssl certs
	    	var ssl = {
	    		cert: fs.readFileSync(Risotto.config.socket.ssl.cert),
	    		key: fs.readFileSync(Risotto.config.socket.ssl.key)
	    	};

	    	// create an own https server for our socket
	    	socketServer = https.createServer(ssl);
    	}
    	else {
    		// start socket in normal mode
	    	socketServer = http.createServer();
    	}

    	// initiate the socket
		Risotto.socket.io = require('socket.io').listen(socketServer);

		// start listeing for connections
		socketServer.listen(Risotto.config.socket.port);

		Risotto.logger.log('Socket listening : ' + Risotto.config.socket.port);

    	// register all socket events
    	socket.registerEvents();*/

		fn();
    };
};

/**
 * Register all important socket events.
 */
socket.registerEvents = function() {

	Risotto.socket.io.on('connection', co(function*(socket) {

		// client is connected

		// responde
		socket.emit('hello', {msg: 'welcome'});
	}));
};