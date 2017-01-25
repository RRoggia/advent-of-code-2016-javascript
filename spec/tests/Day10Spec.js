describe("Instruction", function() {
	var Instruction = require('../../day10/Instruction');

	it("should identify when a specific-valued microchip should be given to a specific bot", function(){
		var instruction = 'value 23 goes to bot 68';
		instruction = new Instruction(instruction);
		expectedInstruction = {
			value: 23,
			bot:68,
			type:'assignment'
		};

		expect(instruction).toEqual(expectedInstruction);

	});


});