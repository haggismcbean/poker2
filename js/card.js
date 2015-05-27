function Card(suit, rank) {
	this.suit = suit;
	this.rank = rank;
}

Card.prototype.getStrength = function() {
	alert("get strength");
}