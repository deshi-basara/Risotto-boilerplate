var errors = require('../utils/error');

/**
 * Validates if the client is on the bouncer-blacklist
 */
Risotto.before('bouncer', function*() {
	var params = this.koaContext._params;

	/*
	if(Risotto.bouncer.isBlacklisted('0.0.0.0')) {
		this.status = 404;
		throw new Error('404 Page not found');
		return;
	}*/

});