function Table(bigBlind, smallBlind) {
	this.bigBlind = bigBlind;
	this.smallBlind = smallBlind;
	this.pot = this.bigBlind + this.smallBlind;

	this.deck = new Deck();
}

Table.prototype.increasePot = function(amount) {
	this.pot += amount;
}

Table.prototype.newHand = function() {
	this.pot = this.bigBlind + this.smallBlind;	
}

Table.prototype.seeFlop = function(cards) {
	var flop1 = this.deck.drawCard(cards[0]);
	var flop2 = this.deck.drawCard(cards[1]);
	var flop3 = this.deck.drawCard(cards[2]);

	this.flop = new Flop(flop1, flop2, flop3);
}

Table.prototype.resetBlinds = function(bigBlind, smallBlind) {
	this.bigBlind = bigBlind;
	this.smallBlind = smallBlind;
}