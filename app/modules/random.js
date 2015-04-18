var fs = require('fs');
var uniqueRandomArray = require('unique-random-array');

/**
 * Exposes the Random Api
 */
var random = Risotto.random = {};

/**
 * Init
 * @param {app} app
 * @param {Function} done
 */
exports.initialize = function( app ){
    return function(fn) {

        // load dictionary file, split each line and create a 'uniqueRandomArray'-function.
        // Call random.randomWord() for a word form the array.
        //random.word = uniqueRandomArray(fs.readFileSync(__dirname + app.config.misc.dictionaryPath, 'utf-8').split('\n'));

        fn();
    };
};

/**
 * Generate a random integer number.
 * http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
 * @param  {int} low  [Lowest possible number]
 * @param  {int} high [Highest possible number]
 * @return {int}      [Random number]
 */
random.numberInt = function(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
};