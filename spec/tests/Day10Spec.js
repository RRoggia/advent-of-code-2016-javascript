var customMatchers = {
	isEqualTo: function(util, customEqualityTesters) {
		return {
 			compare: function(actual, expected) {

	 			if (expected === undefined) {
					expected = '';
				}

				var result = {};

				result.pass = util.equals(actual.value, expected.value, customEqualityTesters) && 
							  util.equals(actual.bot, expected.bot, customEqualityTesters) && 
							  util.equals(actual.type, expected.type, customEqualityTesters);
				
				if (!result.pass) {
					result.message = "Actual { " + actual.value + ',' + actual.bot + ',' + actual.type + " } to be " +
									  expected.value + ',' + expected.bot + ',' + expected.type + " }" ;
				}
				return result;
			}
		};
	}
};


describe("Instruction", function() {
	var Instruction = require('../../day10/Instruction');
	var Bot = require('../../day10/Bot');

	beforeEach(function() {
	    jasmine.addMatchers(customMatchers);
	});

	it("should identify when a specific-valued microchip should be given to a specific bot", function(){
		var instructiones = 'value 23 goes to bot 68';
		var instruction = new Instruction(instructiones);
		
		var expectedInstruction = {
			"value": 23,
			"bot": 68,
			"type": "assignment"
		};

		expect(instruction).isEqualTo(expectedInstruction);
	});

	it("executes an assigment instruction and creates a bot with the value specified in the instruction", function() {
		var instructiones = 'value 23 goes to bot 68';
		var instruction = new Instruction(instructiones);
		var bot = instruction.execute();
		var expectedBot = new Bot(68,23);
		expect(bot).toEqual(expectedBot);
	});

	it("executes instructions to create bots", function () {
		var instructions = [
			'value 23 goes to bot 68',
			'value 5 goes to bot 209',
			'value 11 goes to bot 175',
			'value 3 goes to bot 170',
			'value 67 goes to bot 129',
			'value 47 goes to bot 142',
			'value 7 goes to bot 135',
			'value 73 goes to bot 140',
			'value 53 goes to bot 4',
			'value 37 goes to bot 150',
			'value 2 goes to bot 92',
			'value 61 goes to bot 45',
			'value 19 goes to bot 124',
			'value 71 goes to bot 167',
			'value 31 goes to bot 171',
			'value 13 goes to bot 67',
			'value 43 goes to bot 94',
			'value 41 goes to bot 164',
			'value 17 goes to bot 164',
			'value 59 goes to bot 96',
			'value 29 goes to bot 25'
		];

		var expectedBots = [];
		expectedBots.push(new Bot(68, 23));
		expectedBots.push(new Bot(209, 5));
		expectedBots.push(new Bot(175, 11));
		expectedBots.push(new Bot(170, 3));
		expectedBots.push(new Bot(129, 67));
		expectedBots.push(new Bot(142, 47));
		expectedBots.push(new Bot(135, 7));
		expectedBots.push(new Bot(140, 73));
		expectedBots.push(new Bot(4, 53));
		expectedBots.push(new Bot(150, 37));
		expectedBots.push(new Bot(92, 2));
		expectedBots.push(new Bot(45, 61));
		expectedBots.push(new Bot(124, 19));
		expectedBots.push(new Bot(167, 71));
		expectedBots.push(new Bot(171, 31));
		expectedBots.push(new Bot(67, 13));
		expectedBots.push(new Bot(94, 43));
		expectedBots.push(new Bot(164, 41));
		expectedBots.push(new Bot(164, 17));
		expectedBots.push(new Bot(96, 59));
		expectedBots.push(new Bot(25, 29));

		var createdBots = [];
		for (var i = 0; i < instructions.length; i++) {
			var instruction = new Instruction(instructions[i]);
			createdBots.push(instruction.execute());
		}

		expect(createdBots).toEqual(expectedBots);

	});
});