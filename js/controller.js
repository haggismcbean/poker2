/*
	We have a Deck.

	We have a Player.

		Each player has a range - made up of pocket pairs. these are drawn from the deck then reinserted into the deck
		Each player has a flop - made up of cards. these are drawn from the deck.
		Each player has a stack

	Before the flop a player is assigned a range.

	The flop hits. The player's range has less cards in it because of this (not sure if needs to be hard coded)

	The player's range strength is reevaluated based on the flop

	Order the player's range by strength

	Make decisions based on this.

	NEXT STEP: EVALUATE THE 21 combos of five possible cards 
*/

var pocketPair;
var hands = [];
var hand;

var deck = new Deck();

var rangePercent = 0.0136;
range = new Range(rangePercent);

var flop1 = deck.drawCard({suit: 2, rank: 11});
var flop2 = deck.drawCard({suit: 3, rank: 2});
var flop3 = deck.drawCard({suit: 2, rank: 3});

var flop = new Flop(flop1, flop2, flop3);

range.removeCards(flop.cards);

range.calculateStrength(flop.cards);