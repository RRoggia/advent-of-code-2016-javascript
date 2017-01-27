function Instruction(instruction){
	var type = instruction.match(/value/);
	var numbers = instruction.match(/[0-9]+/g);

	if(type){
		this.value = parseInt(numbers[0]);
		this.bot = parseInt(numbers[1]);
		this.type = "assignment";
	}else{
		this.lowToOutput = instruction.match(/low to output/) ? true : false;
		this.highToOutput = instruction.match(/high to output/) ? true : false;

		this.bot = parseInt(numbers[0]);
		this.lowTo = parseInt(numbers[1]);
		this.highTo = parseInt(numbers[2]);
		this.type = "action";

	}
}
module.exports = Instruction;