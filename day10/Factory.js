var Bot = require("./Bot");

function Factory(instructions){
	this.bots = {}
	this.botWithTwoChips = null;
	this.dailyInstructions = null;
}

Factory.prototype.assignChipsToBots = function(instructions){

	for (var i = 0; i < instructions.length; i++) {
		var newBot = new Bot(instructions[i].bot, instructions[i].value);

		if(this.bots.hasOwnProperty(instructions[i].bot)){
			this.bots[instructions[i].bot].addChip(instructions[i].value);
			this.botWithTwoChips = this.bots[instructions[i].bot];
		}else{
			this.bots[instructions[i].bot] = newBot;
		}
	}
		
	return this.bots;
};

Factory.prototype.getNextAction = function(){
	for (var i = 0; i < this.dailyInstructions.length; i++) {
		if(this.dailyInstructions[i].bot === this.botWithTwoChips.number){
			var remaining = this.dailyInstructions.splice(i, 1);
			return remaining[0];
		}
	}
};

Factory.prototype.addInstructions = function(instructions){
	this.dailyInstructions = instructions;
}

Factory.prototype.hasNextInstruction = function(){
	console.log(this.dailyInstructions.length);
	return (this.dailyInstructions.length >= 0)? true : false;
}

Factory.prototype.executeNextAction = function(instruction){
	console.log("Instruction is ", instruction);
	console.log("TwoChip is - ",this.botWithTwoChips);
	if(this.bots[instruction.lowTo]){
		this.bots[instruction.lowTo].addChip(this.botWithTwoChips.low);
		console.log('Já tinha low_to',this.bots[instruction.lowTo]);
	}else{
		var newBot = new Bot(instruction.lowTo, this.botWithTwoChips.low);
		this.bots[instruction.lowTo] = newBot;
		console.log('Não tinha low_to',this.bots[instruction.lowTo]);
	}

	if(this.bots[instruction.highTo]){
		this.bots[instruction.highTo].addChip(this.botWithTwoChips.high);
		console.log('tinha high_to',this.bots[instruction.highTo]);
	}else{
		var newBot = new Bot(instruction.highTo, this.botWithTwoChips.high);
		this.bots[instruction.highTo] = newBot;
		console.log('Não tinha high_to',this.bots[instruction.highTo]);
	}

	this.bots[this.botWithTwoChips.number].low = 0;
	this.bots[this.botWithTwoChips.number].high = 0;

	if(this.bots[instruction.lowTo].low && this.bots[instruction.lowTo].high)
		this.botWithTwoChips = this.bots[instruction.lowTo];
	else
		this.botWithTwoChips = this.bots[instruction.highTo];

	console.log('2 agora é', this.botWithTwoChips);
};

module.exports = Factory;