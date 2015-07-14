function Hand(pocketPair, flop) {
	this.cards = pocketPair.cards.concat(flop.cards);
	this.sortRank();
}

Hand.prototype.sortRank = function() {
	this.cards.sort(function(a, b) {
		if (a.rank > b.rank) {
			return -1;
		}
		if (b.rank > a.rank) {
			return 1;
		}
		return 0;
	})
}