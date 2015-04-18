
module.exports = Risotto.Controller.extend({
	beforeFilter: {
		bouncer: 'index'
	},

	index: function*(){
		yield this.render('landing/index', {message: 'Welcome my friend'});
	}
});