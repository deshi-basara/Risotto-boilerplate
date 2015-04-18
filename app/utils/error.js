function TicketLimitReached(msg) {
	this.name = 'TicketLimitReached';
	this.message = msg || '';
}

TicketLimitReached.prototype = new Error;
exports.TicketLimitReached = TicketLimitReached;