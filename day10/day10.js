var instructions = require("./inputs");
var InstructionQueue = require("./InstructionQueue");
var Instruction = require("./Instruction");
var Bot = require("./Bot");

var queue = new InstructionQueue(instructions);

var bot = Bot();
for (var i = 0; i < queue.instructions.length; i++) {
	bot.execute(queue.instructions[i]);
}
