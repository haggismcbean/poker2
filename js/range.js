function Range(percent) {
	this.percent = percent;
	this.pocketPairs = this.getPreFlopRange(this.percent);
}

Range.prototype.getPreFlopRange = function(percent) {
	var numberCards = Math.floor(preFlopRange.length * percent);
	var cards = [];
	for(var i=0; i < numberCards; i++) {
		cards.push(preFlopRange[i]);
	}
	return cards;
}


Range.prototype.sortHands = function(hands) {
	hands.sort(function(a, b) {
		if (a.strength > b.strength) {
			return -1;
		}
		if (b.strength > a.strength) {
			return 1;
		}
		for(var i=0; i < a.cards.length; i++) {
			if (a.cards[i].rank > b.cards[i].rank) {
				return -1;
			}
			if (b.cards[i].rank > a.cards[i].rank) {
				return 1;
			}
		}
		return 0;
	})
}

Range.prototype.getCardScore = function(card) {
	var score = card.rank - 3;
	if (score < 0) {
		score = 0;
	}
	return score;
}

Range.prototype.randomCard = function() {
	var random = Math.floor(Math.random() * this.deck.cards.length);
	return this.deck.cards[random];
}

var range = new Range(0.1);
