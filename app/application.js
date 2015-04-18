var errors = require('./utils/error');


module.exports = Risotto.Application.extend({
	
	onAuthorizationError : function*(koaContext, next){
		koaContext.redirect('/');
	},

	
	onNotFoundError : function*(koaContext, next){
		yield this.render('404');
	},

	onError : function*(koaContext, next, error){		
		if(error instanceof errors.TicketLimitReached){
			yield this.render('order/limit');
		} else {
			if(Risotto.devMode){
				throw error;
			}
		}
	}
});