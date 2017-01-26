var Bot = require('./Bot');

function Instruction(instruction){
	var type = instruction.match(/value/);
	
	if(type){
		var numbers = instruction.match(/[0-9]+/g);
		this.value = parseInt(numbers[0]);
		this.bot = parseInt(numbers[1]);
		this.type = "assignment";
	}
	
};

Instruction.prototype.execute = function() {
	return new Bot(this.bot, this.value);
};

module.exports = Instruction;