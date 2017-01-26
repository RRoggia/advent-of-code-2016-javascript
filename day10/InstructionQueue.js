var Instruction = require("./Instruction");

function InstructionQueue(stringInstructions){
	var assignments = [];
	var action = [];
	for (var i = 0; i < stringInstructions.length; i++) {
		var instruction = new Instruction(stringInstructions[i]);
		if(instruction.type === "assignment"){
			assignments.push(instruction);
		}else {
			action.push(instruction);
		}
	}
	this.instructions = assignments.concat(action);
}

module.exports = InstructionQueue;