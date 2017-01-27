var Bot = require("./Bot");

function Factory(instructions){
	this.bots = {}
	this.botsWithTwoChips = [];
	this.botWithTwoChips = null
	this.dailyInstructions = null;
	this.outputs = {};
}

Factory.prototype.assignChipsToBots = function(instructions){

	for (var i = 0; i < instructions.length; i++) {
		var newBot = new Bot(instructions[i].bot, instructions[i].value);

		if(this.bots.hasOwnProperty(instructions[i].bot)){
			this.bots[instructions[i].bot].addChip(instructions[i].value);
			this.botsWithTwoChips.push(this.bots[instructions[i].bot]);
		}else{
			this.bots[instructions[i].bot] = newBot;
		}
	}
		
	return this.bots;
};

Factory.prototype.getNextAction = function(){
	for (var i = 0; i < this.botsWithTwoChips.length; i++) {
		this.botWithTwoChips = this.botsWithTwoChips[i];

		for (var j = 0; j < this.dailyInstructions.length; j++) {
			if(this.dailyInstructions[j].bot === this.botWithTwoChips.number){
				var remaining = this.dailyInstructions.splice(j, 1);
				return remaining[0];
			}
		}
	}
};

Factory.prototype.addInstructions = function(instructions){
	this.dailyInstructions = instructions;
}

Factory.prototype.hasNextInstruction = function(){
	return (this.dailyInstructions.length > 0)? true : false;
}

Factory.prototype.executeNextAction = function(instruction){
	if(instruction.lowToOutput){
		this.outputs[instruction.lowTo] = this.botWithTwoChips.low; 
	}else{
		if(this.bots[instruction.lowTo]){
			this.bots[instruction.lowTo].addChip(this.botWithTwoChips.low);
		}else{
			var newBot = new Bot(instruction.lowTo, this.botWithTwoChips.low);
			this.bots[instruction.lowTo] = newBot;
		}

	}
	if(instruction.highToOutput){
		this.outputs[instruction.highTo] = this.botWithTwoChips.high; 
	}else{
		if(this.bots[instruction.highTo]){
			this.bots[instruction.highTo].addChip(this.botWithTwoChips.high);
		}else{
			var newBot = new Bot(instruction.highTo, this.botWithTwoChips.high);
			this.bots[instruction.highTo] = newBot;
		}

	}

	this.bots[this.botWithTwoChips.number].low = 0;
	this.bots[this.botWithTwoChips.number].high = 0;
	var indexOfBot = this.botsWithTwoChips.indexOf(this.bots[this.botWithTwoChips.number]);
	this.botsWithTwoChips.splice(indexOfBot,1);
	
	if(!instruction.lowToOutput){
		if(this.bots[instruction.lowTo].low && this.bots[instruction.lowTo].high)
			this.botsWithTwoChips.push(this.bots[instruction.lowTo]);
	}
	if(!instruction.highToOutput){
		if(this.bots[instruction.highTo].low && this.bots[instruction.highTo].high)
			this.botsWithTwoChips.push(this.bots[instruction.highTo]);
	}

	
};

Factory.prototype.getResultOfBinsMultiplied = function(){
	var multiplication = 1;
	for(var output in this.outputs){
		if(output == 0 || output == 1 || output == 2){
			multiplication *= this.outputs[output];

		}
	}
	return multiplication;
}

module.exports = Factory;