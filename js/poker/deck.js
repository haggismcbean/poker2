function Deck() {
	this.cards = this.createCards();
}

Deck.prototype.createCards = function() {
	var cards = [];
	var card;
	for(var suit = 0; suit < 4; suit++) {
		for(var rank = 0; rank < 13; rank++) {
			card = new Card(suit, rank);
			cards.push(card);
		}
	}
	return cards;
}

Deck.prototype.drawCard = function(card) {
	var drawnCard;
	for(var i=0; i < this.cards.length; i++) {
		if (card.suit === this.cards[i].suit) {
			if (card.rank === this.cards[i].rank) {
				drawnCard = this.cards.splice(i, 1)[0];
				return drawnCard;
			}
		}
	}
}

Deck.prototype.insertCard = function(card, position) {
	var restOfDeck = this.cards.splice(position);
	this.cards.push(card);
	this.cards = this.cards.concat(restOfDeck);
}

Deck.prototype.randomCard = function() {
	var random = Math.floor(Math.random() * this.cards.length);
	return this.drawCard(this.cards[random]);
}
