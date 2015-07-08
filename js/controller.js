/*
	Next steps:
		calculate cut off points
*/

/*
var deck = new Deck();

var table = new Table(10, 5);
var hero = new Player(200);
var villain = new Player(1000);

var rangePercent = 0.0136;
range = new Range(rangePercent);

range.removeCards(flop.cards);

range.calculateStrength(flop.cards);

log(range.pocketPairs);


 Below is what i'm aiming for
*/
//-------- init: 	  -----------

var table = new Table(10, 5);
var hero = new Player(200);
var villain = new Player(1000);


//-------- per hand: -----------


table.newHand();

villain.raise(30);

hero.setRange(0.0136);
hero.call();

var cards = [
	{
		suit: 1, 
		rank: 10
	},
	{
		suit: 1, 
		rank: 12
	},
	{
		suit: 1, 
		rank: 11
	}
]

table.seeFlop(cards);
hero.range.removeCards(table.flop.cards);

villain.raise(40);
hero.calculateDecision(table.flop);

log(hero.range.pocketPairs);