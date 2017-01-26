function Instruction(instruction){
	var type = instruction.match(/value/);
	var numbers = instruction.match(/[0-9]+/g);

	if(type){
		this.value = parseInt(numbers[0]);
		this.bot = parseInt(numbers[1]);
		this.type = "assignment";
	}else{
		this.bot = parseInt(numbers[0]);
		this.lowTo = parseInt(numbers[1]);
		this.highTo = parseInt(numbers[2]);
		this.type = "action";
	}
}
module.exports = Instruction;