var kue = require('kue');

/**
 * Expose the Job Api
 */
var jobs = Risotto.jobs = {};

/**
 * Init
 * @param {app} app
 * @param {Function} done
 */
exports.initialize = function( app ){
    return function(fn) {

    	// create the job queue
    	jobs.kue = kue.createQueue();

    	if(Risotto.config.job.enabled){
    		kue.app.listen(Risotto.config.job.port);
    	}

    	// register all processes
    	jobs.registerProcesses();

    	jobs.restartJobs();

    	//gracefully shutdown
    	process.once('SIGINT', function (sig) {
    		Risotto.logger.log('Kue is shutting down…');
			jobs.kue.shutdown(function(err) {
		    	Risotto.logger.log( 'Kue is shut down.');
		    	err && Risotto.logger.error(err);
		    	process.exit( 0 );
		  	}, 5000);
		});


		fn();
	};

};

/**
 * Register all available kue-processes
 */
jobs.registerProcesses = function() {

	/**
	 * Description.
	 * @param  {object}     job  [Kue job object]
	 * @param  {function}   done [Callback, fired when the job is finished]
	 */
	jobs.kue.process('example', 1, function (job, done) {

		var steps = 5;

		/**
		 * One step.
		 * @param  {int}   i [Current step]
		 */
		function next(i) {

			// check if there are still steps left
			if(i === steps) {
				done();
			}
			else {
				next(i + 1);
			}

		}

		// start next step
		next(0);

	});

};

jobs.initExampleJob = function*() {

	// create a new job worker for the ticket creating and mailing
	jobs.kue.create('ecample', {
		steps: 7,
	}).priority('normal').attempts(5).save(function() {
		Risotto.logger.info('modules/jobs.js: Added "example"-job to queue');
	});
};

/**
 * Restart all active jobs.
 * recovery from server crashes and unexpected behavior
**/
jobs.restartJobs = function(){
	kue.Job.rangeByState('active', 0, 500, 'desc', function(err, active){
		if(err) return Risotto.logger.warn(err);

		active.forEach(function(job){
			job.inactive();
			Risotto.logger.info('modules/jobs.js: Readding job #' + job.id + ' to queue');
		});
	});
};
