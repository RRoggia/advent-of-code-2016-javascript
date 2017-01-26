var Instruction = require("./Instruction");

function InstructionQueue(stringInstructions){
	this.assignments = [];
	this.actions = [];

	for (var i = 0; i < stringInstructions.length; i++) {
		var instruction = new Instruction(stringInstructions[i]);
		if(instruction.type === "assignment"){
			this.assignments.push(instruction);
		}else {
			this.actions.push(instruction);
		}
	}
}

module.exports = InstructionQueue;