var Bouncer = Risotto.models.bouncer;
var md5 = require('MD5');
var request = require('request');
var thunkify = require('thunkify');
    request = thunkify(request);

/**
 * Exposes the Bouncer Api
 */
var bouncer = Risotto.bouncer = {};

/**
 * Init
 * @param {app} app
 * @param {Function} done
 */
exports.initialize = function( app ){
    return function(fn) {

        fn();

    };
};

/**
 * Checks if the handed ip is already on the blacklist.
 * If true, the ip has exceeded the limit.
 * @param {string}  ip            [Request-ip]
 * @yield {boolean}               [True: Limit exceeded]
 */
bouncer.isBlacklisted = function*(ip) {

    // hash ip for database comparison
    var hashedIp = md5(ip);

    // check if there is already an entry for the client in our blacklist
    var entry = yield Bouncer.findOne({iphash: hashedIp});
    if(entry) {
        // check if the limit has been exceeded yet
        if(entry.tries >= Risotto.config.misc.recaptcha.limit) {
            // limit exceeded
            return true;
        }
        else {
            // no limit
            return false;
        }
    }
    else {
        // no entry yet
        return false;
    }

};

/**
 * Increments or creates a 'failed-login'-db-entry of a client ip.
 * @param {string} ip            [Rerquest-ip]
 * @yield {boolean}              [True: Client has exceeded the limit through incrementation]
 */
bouncer.incrementFailedLogins = function*(ip) {

    // hash ip for database comparison
    var hashedIp = md5(ip);

    // check if there is already an entry for the client in our blacklist
    var entry = yield Bouncer.findOne({iphash: hashedIp});
    if(entry) {
        // increment fail count
        entry = yield Bouncer.update({iphash: hashedIp}, {tries: ++entry.tries});
    }
    else {
        // no entry yet, create one
        entry = yield Bouncer.create({iphash: hashedIp});
    }

    // on 'create' there is a json-object returned, on update an array
    var tries = (entry.length === undefined) ? 1 : entry[0].tries;

    return (tries >= Risotto.config.misc.recaptcha.limit);
};

/**
 * Removes an ip-adresse from the blacklist.
 * @param {string} ip            [Request-ip]
 * @yield {null}
 */
bouncer.resetFailedLogin = function*(ip) {

    // hash ip for database comparison
    var hashedIp = md5(ip);

    // destroy entry if available
    yield Bouncer.destroy({iphash: hashedIp});

    return;
};