function Player(stack) {
	this.stack = stack;
}

Player.prototype.call = function(amount) {
	this.stack -+ amount;
}

Player.prototype.raise = function(amount) {
	this.stack -= amount;
}

