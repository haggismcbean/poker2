function Player(stack) {
	this.stack = stack;
}

Player.prototype.call = function(amount) {
	this.stack -+ amount;
	table.increasePot(amount);
}

Player.prototype.raise = function(amount) {
	this.stack -= amount;
	table.increasePot(amount);
}

Player.prototype.setRange = function(percent) {
	this.range = new Range(percent);
}

Player.prototype.calculateDecision = function(flop) {
	this.range.calculateStrength(flop);
}