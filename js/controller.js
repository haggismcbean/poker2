/*
	Next steps:
		player object with stack size
		table object with blind size, money in pot size
		calculate cut off points
*/

var table = new Table(10, 5);
var hero = new Player(200);
var villain = new Player(1000);

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

