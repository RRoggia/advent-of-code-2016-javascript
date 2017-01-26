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
});