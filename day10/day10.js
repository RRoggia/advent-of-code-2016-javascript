var instructions = require("./inputs");
var InstructionQueue = require("./InstructionQueue");
var Instruction = require("./Instruction");
var Bot = require("./Bot");
var Factory = require("./Factory");

var queue = new InstructionQueue(instructions);

var factory = new Factory();
var bots = factory.assignChipsToBots(queue.assignments);
console.log(bots);

factory.addInstructions(queue.actions);

while(factory.hasNextInstruction()){
	var nextAction = factory.getNextAction();
	factory.executeNextAction(nextAction);
}
