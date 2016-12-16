var instructions = getInputs();

var led = createLed();

instructions.forEach(function(instruction) {
	var operation = new Operation(instruction);
	
	operation.execute(led, operation.param1, operation.param2);

});

console.log(getLedsTurnedOn(led));

function Operation(instruction){
	var splitedInstruction = instruction.split(" ");

	if(splitedInstruction[0] === 'rect'){
		var xIndex = splitedInstruction[1].indexOf("x");

		this.param1 = parseInt(splitedInstruction[1].substring(0, xIndex));
		this.param2 = parseInt(splitedInstruction[1].substring(xIndex + 1, splitedInstruction[1].length));

		var rect = function rect(led, width, heigth){
			for (var y = 0; y < heigth; y++) {
				for (var x = 0; x < width; x++) {
					led[y][x] = '#';
				}
			}
		};

		this.execute = rect;
	}else{

		this.param1 = parseInt(splitedInstruction[2].substring(2, splitedInstruction[2].length));
		this.param2 = parseInt(splitedInstruction[4]);

		if(splitedInstruction[1] === 'row'){
			var rotateRow = function(led, row, shiftBy){
				var shiftedRow = [];

				for (var x = 0; x < led[row].length ; x++) {
					if(x + shiftBy < led[row].length ){
						shiftedRow[x + shiftBy] = led[row][x];
					}else{
						shiftedRow[(x + shiftBy) - led[row].length] = led[row][x];						
					}
				}

				led[row] = shiftedRow;

			}
			this.execute = rotateRow;
		}else{
			var rotateColumn = function(led, column, shiftBy){
				var shiftedColumn = [];
				if(shiftBy >= 6) {
					shiftBy = shiftBy % 6;	
				}
				
				for (var y = 0; y < led.length ; y++) {
					if(y + shiftBy < led.length){
						shiftedColumn[y + shiftBy] = led[y][column];
					}else{
						shiftedColumn[(y + shiftBy) - led.length] = led[y][column];
					}
					
				}

				for (var y = 0; y < led.length; y++) {
					led[y][column] = shiftedColumn[y];
				}

			}
			this.execute = rotateColumn;
		}
	}
}

function createLed(){
	var led = [];	
	for (var y = 0; y < 6; y++) {
		var row = [];
		led.push(row);
		for (var x = 0; x < 50; x++) {
			row.push('.');
		}
	}

	return  led;
}

function getLedsTurnedOn(led){
	var ledsOn = 0;
	for (var y = 0; y < led.length; y++) {
		for (var x = 0; x < led[y].length; x++) {
			if(led[y][x] === "#")
				ledsOn++;
		}	
	}
	return ledsOn;
}