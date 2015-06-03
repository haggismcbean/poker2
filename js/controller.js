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

	Before I go on with this range stuff, there are important hand strength things to be fixed, in the following order:
		3. monte carlo turn and rivers and averaging hand.strength
*/

// var deck = new Deck();
var pocketPair;
var hands = [];
var hand;

var deck = new Deck();

// var range = new Range(0.01);

var flop1 = deck.drawCard({suit: 3, rank: 2});
var flop2 = deck.drawCard({suit: 2, rank: 1});
var flop3 = deck.drawCard({suit: 2, rank: 3});

var flop = new Flop(flop1, flop2, flop3);

var pocket1 = deck.drawCard({suit: 2, rank: 12});
var pocket2 = deck.drawCard({suit: 2, rank: 0});

pocketPair = new PocketPair(pocket1, pocket2);

hand = new Hand(pocketPair, flop);

console.log(JSON.stringify(hand, 0, 2));

//cycle through range making a hand with each range card and flop, then for each hand card draw the turns and rivers and see what happens.
// for(var i=0; i < range.pocketPairs.length; i++) {
// 	pocketPair = createPocketPair(i);

// 	hand = new Hand(pocketPair, flop);
// 	hands.push(hand);

// 	insertPocketPair(pocketPair);
// }

function createPocketPair(index) {
	var pocket1 = range.pocketPairs[i].cards[0];
	var pocket2 = range.pocketPairs[i].cards[1];

	pocket1 = deck.drawCard(pocket1);
	pocket2 = deck.drawCard(pocket2);

	return new PocketPair(pocket1, pocket2);
}

function insertPocketPair(pocketPair) {
	var pocket1 = pocketPair.cards[0];
	var pocket2 = pocketPair.cards[1];

	deck.insertCard(pocket1, 0);
	deck.insertCard(pocket2, 0);	
}


// var hand = new Hand(pocketPair.cards, flop.cards);