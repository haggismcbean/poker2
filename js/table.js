function Table(bigBlind, smallBlind) {
	this.bigBlind = bigBlind;
	this.smallBlind = smallBlind;
	this.pot = this.bigBlind + this.smallBlind;
}

Table.prototype.increasePot = function(amount) {
	this.pot += amount;
}

Table.prototype.resetPot = function() {
	this.pot = this.bigBlind + this.smallBlind;	
}

Table.prototype.resetBlinds = function(bigBlind, smallBlind) {
	this.bigBlind = bigBlind;
	this.smallBlind = smallBlind;
}