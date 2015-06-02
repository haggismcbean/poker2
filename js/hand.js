function Hand(pocketPair, flop) {
	this.cards = pocketPair.cards.concat(flop.cards);
	this.sortRank();
	this.getStrength();
}

Hand.prototype.getStrength = function() {
	var flush = this.checkFlush();
	var straight = this.checkStraight();

	if (flush && straight) {
		//straight flush
		this.strength = 8;
	} else if (flush && !straight) {
		//flush
		this.strength = 5;
	} else if (!flush && straight) {
		//straight
		this.strength = 4;
	} else {
		this.checkMatches();
	}

	//if we have a straight and the ace is low
	if ((this.strength === 4 || this.strength === 8) && this.aceLow) {
		this.sortAceLow();
	}
}

Hand.prototype.checkFlush = function() {
	for(var i=1; i < this.cards.length; i++) {
		if (this.cards[i].suit !== this.cards[0].suit) {
			return false;
		}
	}
	return true;
}

Hand.prototype.checkStraight = function() {
	if(this.checkAceLow()) {
		return true;
	}

	for(var i=0; i < this.cards.length - 1; i++) {
		if (this.cards[i].rank - 1 !== this.cards[i+1].rank) {
			return false;
		}
	}
	return true;
}

Hand.prototype.checkAceLow = function() {
	var c = this.cards;

	if (c[0].rank === 12 && c[1].rank === 3 && c[2].rank === 2 && c[3].rank === 1 && c[4].rank === 0) {
		this.aceLow = true;
		return true;
	}
	return false;
}

Hand.prototype.sortAceLow = function() {
	var ace = this.cards[0];
	ace.rank = -1;
	this.sortRank();
	ace.rank = 12;
}

Hand.prototype.checkMatches = function() {
	var matches = this.getMatches();
	if (matches.length > 0) {
		matches = this.splitMatches(matches);
	}

	if (matches.length === 0){
		//no pair
		this.strength = 0;
	} else if (matches.length === 1){
		this.sortSingleMatch(matches[0])
		this.checkSingleMatch(matches[0]);
	} else {
		this.sortDoubleMatches(matches);
		this.checkDoubleMatches(matches);
	}
}

Hand.prototype.getMatches = function() {
	var matches = [];
	for(var i=0; i < this.cards.length - 1; i++) {
		if (this.cards[i].rank === this.cards[i+1].rank) {
			if (matches.indexOf(this.cards[i]) < 0) {
				matches.push(this.cards[i]);
			}
			matches.push(this.cards[i+1]);
		}
	}
	return matches;
}

Hand.prototype.splitMatches = function(matches) {
	//first two cards will always be the same match.
	var match1 = [matches[0], matches[1]];
	var match2 = [];
	var splitMatches = [];

	for(var i=2; i < matches.length; i++) {
		if (matches[i].rank === match1[0].rank) {
			match1.push(matches[i]);
		} else {
			match2.push(matches[i]);
		}
	}

	if (match2.length > 0) {
		splitMatches.push(match1);
		splitMatches.push(match2);
		return splitMatches;
	} else {
		splitMatches.push(match1);
		return splitMatches;
	}
}

Hand.prototype.checkSingleMatch = function(match) {
	if (match.length === 2) {
		//pair
		this.strength = 1;
	} else if (match.length === 3) {
		//trips, set
		this.strength = 3;
	} else {
		//quads
		this.strength = 7;
	}
}

Hand.prototype.sortSingleMatch = function(match) {
	var matchingCards = [];
	var card;

	for(var i=this.cards.length - 1; i > -1 ; i--) {
		if (match.indexOf(this.cards[i]) > -1) {
			card = this.cards.splice(i, 1)[0];
			matchingCards.push(card); 
		}
	}
	this.cards = matchingCards.concat(this.cards);
}

Hand.prototype.checkDoubleMatches = function(matches) {
	if (matches[0].length === 3 || matches[1].length === 3) {
		//full house
		this.strength = 6;
	} else {
		//two pair
		this.strength = 2;
	}
}

Hand.prototype.sortDoubleMatches = function(matches) {
	if (matches[0].length === 3) {
		this.cards = matches[0].concat(matches[1]);
	} else if (matches[1].length === 3) {
		this.cards = matches[1].concat(matches[0]);
	} else {
		for(var i=this.cards.length - 1; i > -1; i--) {
			if (matches[0].indexOf(this.cards[i]) > -1 || matches[1].indexOf(this.cards[i]) > -1) {
				this.cards.splice(i, 1);
			}
		}
		this.cards = matches[0].concat(matches[1]).concat(this.cards);
	}
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