var Instruction = require('../../day10/Instruction');
var Bot = require('../../day10/Bot');

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
							  util.equals(actual.type, expected.type, customEqualityTesters) &&
							  util.equals(actual.lowTo, expected.lowTo, customEqualityTesters) &&
							  util.equals(actual.highTo, expected.highTo, customEqualityTesters);
				
				if (!result.pass) {
					result.message = "Actual is different { " + 
										(actual.value !== expected.value)? actual.value : "" + ',' +  
										(actual.bot !== expected.bot)? actual.bot : "" + ',' +
										(actual.type !== expected.type)? actual.type : "" + ',' +
										(actual.lowTo !== expected.lowTo)? actual.lowTo : "" + ',' +
										(actual.highTo !== expected.highTo)? actual.highTo : "" + '}';
				}
				return result;
			}
		};
	}
};


describe("Instruction", function() {


	beforeEach(function() {
	    jasmine.addMatchers(customMatchers);
	});

	it("should identify when a specific-valued microchip should be given to a specific bot", function(){
		var instruction = new Instruction('value 23 goes to bot 68');
		
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

	it("creates a bot for each assigment instructions", function () {
		var instructions = [
			'value 23 goes to bot 68',
			'value 5 goes to bot 209',
			'value 11 goes to bot 175',
			'value 3 goes to bot 170',
			'value 67 goes to bot 129',
		];

		var expectedBots = [];
		expectedBots.push(new Bot(68, 23));
		expectedBots.push(new Bot(209, 5));
		expectedBots.push(new Bot(175, 11));
		expectedBots.push(new Bot(170, 3));
		expectedBots.push(new Bot(129, 67));

		var createdBots = [];
		for (var i = 0; i < instructions.length; i++) {
			var instruction = new Instruction(instructions[i]);
			createdBots.push(instruction.execute());
		}

		expect(createdBots).toEqual(expectedBots);
	});

	it("identifies action instructions", function() {
		var instruction = new Instruction('bot 76 gives low to bot 191 and high to bot 21');
		var expectedInstruction = {
			"lowTo": 191,
			"highTo": 21,
			"bot": 76,
			"type": "action"
		};
		expect(instruction).isEqualTo(expectedInstruction);
	});
});

describe("Bot", function() {
	it("should be created with a low chip", function(){
		var bot = new Bot(1, 10);
		expect(bot.low).toBe(10);
	});


});