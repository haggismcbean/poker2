//percent is a number between 0 and 1
function Range(percent) {
	this.percent = percent;
	this.pocketPairs = this.getPreFlopRange(this.percent);
	this.cards = [];
	this.MONTE_CARLO_COUNT = 1000;
}

Range.prototype.getPreFlopRange = function(percent) {
	var numberCards = Math.floor(preFlopRange.length * percent);
	var cards = [];
	for(var i=0; i < numberCards; i++) {
		cards.push(preFlopRange[i]);
	}
	return cards;
}

Range.prototype.removeCards = function(cards) {
	for(var i=0; i < cards.length; i++) {
		this.removeCard(cards[i]);
	}
}

Range.prototype.removeCard = function(card) {
	for(var i=this.pocketPairs.length - 1; i > -1; i--) {
		var p = this.pocketPairs[i];
		if ((p.cards[0].suit === card.suit && p.cards[0].rank === card.rank) || (p.cards[1].suit === card.suit && p.cards[1].rank === card.rank)) {
			this.pocketPairs.splice(i, 1);
		}
	}
}

Range.prototype.calculateStrength = function(flop) {
	for(var i=0; i < this.pocketPairs.length; i++) {
		this.cards = [];
		//draw range cards from deck
		var pocket1 = deck.drawCard(this.pocketPairs[i].cards[0]);
		var pocket2 = deck.drawCard(this.pocketPairs[i].cards[1]);

		this.cards.push(pocket1);
		this.cards.push(pocket2);

		this.pocketPairs[i].averageStrength = {};

		this.pocketPairs[i].averageStrength = this.monteCarloStrength(flop);
		this.reinsertCards([pocket1, pocket2]);
	}
	this.sortPocketPairs(this.pocketPairs)
	log(this.pocketPairs);
}

Range.prototype.monteCarloStrength = function(flop) {
	//draw 2 random cards from deck
	var winners = [];
	var random1;
	var random2;
	var combos;
	var cards;
	var bestCombo;

	for(var i=0; i < this.MONTE_CARLO_COUNT; i++) {
		random1 = deck.randomCard();
		random2 = deck.randomCard();

		this.createSevenCardArray(random1, random2, flop);
		
		combos = this.calculateCombos();
		cards = this.calculateFiveCardStrengths(combos);
		bestCombo = this.findBestCombo(cards);
		//find strongest combo in strengths
		winners.push(bestCombo);

		//store [strength, card1, card2, card3, card4, card5]

		//insert 2 random cards
		this.cards.splice(2,5);
		this.reinsertCards([random1, random2]);
	}
	return this.averageStrength(winners);
	//sort strength store, get middle strength. that's how strong this pocket pair is.
}

Range.prototype.averageStrength = function(winners) {
	var averageStrength = {};
	averageStrength.strength = 0
	averageStrength.cards = [
		{
	      "rank": 0
	    },
	    {
	      "rank": 0
	    },
	    {
	      "rank": 0
	    },
	    {
	      "rank": 0
	    },
	    {
	      "rank": 0
	    }
    ];
	for(var i=0; i < winners.length; i++) {
		averageStrength.strength += winners[i].strength / winners.length;
		for(var j=0; j < winners[i].cards.length; j++) {
			averageStrength.cards[j].rank += winners[i].cards[j].rank / winners.length;
		}
	}	
	return averageStrength;
}

Range.prototype.findBestCombo = function(cards) {
	for(var i=0; i < cards.length; i++) {
		this.sortCards(cards[i].cards, cards[i].aceLow);
	}
	this.sortHands(cards);
	return cards[0];
}

Range.prototype.calculateFiveCardStrengths = function(combos) {
	var cards = [];
	aceLows = [];
	for(var i=0; i < combos.length; i++) {
		var ranks = this.getRanks(combos[i]);
		var suits = this.getSuits(combos[i]);
		
		var strength = this.rankPokerHand(ranks, suits); // Royal Flush
		
		var fiveCards = this.createFiveCardArray(ranks, suits, strength, this.aceLow);
		cards.push(fiveCards);
		aceLows.push(this.aceLow);
	}
	return cards;
}

Range.prototype.createFiveCardArray = function(ranks, suits, strength, aceLow) {
	var card = {
		strength : strength,
		aceLow: aceLow
	}
	card.cards = [];
	for (var i=0; i < ranks.length; i++) {
		newCard = {};
		newCard.rank = ranks[i];
		newCard.suit = suits[i];
		card.cards.push(newCard);
	}
	return card;
}

Range.prototype.getRanks = function(combo) {
	var ranks = [];
	for(var i=0; i < combo.length; i++) {
		var rank = this.cards[combo[i]].rank + 2;
		ranks.push(rank);
	}
	return ranks;
}

Range.prototype.getSuits = function(combo) {
	var suits = [];
	for(var i=0; i < combo.length; i++) {
		var suit = this.cards[combo[i]].suit;
		switch(suit) {
			case 0 : 
				suit = 8;
				break;
			case 1: 
				suit = 2;
				break
			case 2:
				suit = 1;
				break;
			case 3:
				suit = 4;
				break;
			default:
				alert('error!');
		}
		suits.push(suit);
	}
	return suits;
}

Range.prototype.createSevenCardArray = function(random1, random2, flop) {
	this.cards.push(random1);
	this.cards.push(random2);
	this.cards = this.cards.concat(flop);
}

Range.prototype.reinsertCards = function(cards) {
	for(var i=cards.length - 1; i > -1; i--){
		deck.insertCard(cards[i], 0);
	}
}

Range.prototype.sortCards = function(cards, aceLow) {
	cards.sort(function(a, b) {
		if (a.rank > b.rank) {
			return -1;
		}
		if (b.rank > a.rank) {
			return 1;
		}
		return 0;
	})
	if (aceLow) {
		var ace = cards.splice(0, 1);
		cards = cards.concat(ace);
	}
}

Range.prototype.sortPocketPairs = function(pocketPairs) {
	pocketPairs.sort(function(a, b) {
		if (a.averageStrength.strength > b.averageStrength.strength + 0.2) {
			return -1;
		}
		if (b.averageStrength.strength > a.averageStrength.strength + 0.2) {
			return 1;
		}
		for(var i=0; i < a.averageStrength.cards.length; i++) {
			if (a.averageStrength.cards[i].rank > b.averageStrength.cards[i].rank) {
				return -1;
			}
			if (b.averageStrength.cards[i].rank > a.averageStrength.cards[i].rank) {
				return 1;
			}
		}
		return 0;
	})
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

//credit: http://www.codeproject.com/Articles/569271/A-Poker-hand-analyzer-in-JavaScript-using-bit-math
Range.prototype.calculateCombos = function() {
	var k = 5;
	var n = 7;
	//we have seven cards. we want to get all possible combinations of 5 cards out of these seven. there are 21 different combos. 
    var result = [], comb = [];
        function next_comb(comb, k, n ,i) {
            if (comb.length === 0) {for (i = 0; i < k; ++i) {comb[i] = i;} return true;}
            i = k - 1; ++comb[i];
            while ((i > 0) && (comb[i] >= n - k + 1 + i)) { --i; ++comb[i];}
            if (comb[0] > n - k) {return false;} // No more combinations can be generated
            for (i = i + 1; i < k; ++i) {comb[i] = comb[i-1] + 1;}
            return true;
        }
    while (next_comb(comb, k, n)) { result.push(comb.slice());}
    return result;
}

//Calculates the Rank of a 5 card Poker hand using bit manipulations.
//credit: http://www.codeproject.com/Articles/569271/A-Poker-hand-analyzer-in-JavaScript-using-bit-math
Range.prototype.rankPokerHand = function(cs,ss) {
	var hands=[7, 8, 4, 5, 0, 1, 2, 9, 3, 6 ];

    var handsTranslation=["4 of a Kind", "Straight Flush", "Straight", "Flush", "High Card",
    "1 Pair", "2 Pair", "Royal Flush", "3 of a Kind", "Full House" ];

  var v, i, o, s = 1<<cs[0]|1<<cs[1]|1<<cs[2]|1<<cs[3]|1<<cs[4];
  for (i=-1, v=o=0; i<5; i++, o=Math.pow(2,cs[i]*4)) {v += o*((v/o&15)+1);}
  v = v % 15 - ((s/(s&-s) == 31) || (s == 0x403c) ? 3 : 1);
  v -= (ss[0] == (ss[1]|ss[2]|ss[3]|ss[4])) * ((s == 0x7c00) ? -5 : 1);

  if (s == 0x403c) {
  	this.aceLow = true;
  } else {
  	this.aceLow = false;
  }
  return hands[v];
}