var instructions = require("./inputs");
var InstructionQueue = require("./InstructionQueue");
var Instruction = require("./Instruction");
var Bot = require("./Bot");

var queue = new InstructionQueue(instructions);

var bot = Bot();
for (var i = 0; i < queue.assignments.length; i++) {
	bot.execute(queue.assignments[i]);
}

for (var i = 0; i < queue.actions.length; i++) {
	bot.execute(queue.assignments[i]);
}
