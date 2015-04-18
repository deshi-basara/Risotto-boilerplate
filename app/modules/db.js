var Waterline = require('waterline');
var mysql = require('sails-mysql');
var redis = require('sails-redis');
var thunkify = require('thunkify-wrap');
var _ = require('underscore');
var orm = new Waterline();

/**
 * Define models to load here.
 */
var models = ['bouncer'];

exports.initialize = function( app ){
	return function(fn){

		// Load the Models into the ORM
		models.forEach(function(name){
			orm.loadCollection(require('../models/' + name + '.js'));
		});

		// config
		app.config.waterline.adapters = { 'mysql': mysql, 'redis': redis };
		orm.initialize(app.config.waterline, function(err, models) {
			if(err) fn(err);

			// thunkify all functions
			app.models = thunkify(models.collections);

  			fn();
		});
	};
};