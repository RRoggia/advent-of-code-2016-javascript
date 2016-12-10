var coordinations = ["L1", "L5", "R1", "R3", "L4", "L5", "R5", "R1", "L2", "L2", "L3", "R4", "L2", "R3", "R1", "L2", "R5", "R3", "L4", "R4", "L3", "R3", "R3", "L2", "R1", "L3", "R2", "L1", "R4", "L2", "R4", "L4", "R5", "L3", "R1", "R1", "L1", "L3", "L2", "R1", "R3", "R2", "L1", "R4", "L4", "R2", "L189", "L4", "R5", "R3", "L1", "R47", "R4", "R1", "R3", "L3", "L3", "L2", "R70", "L1", "R4", "R185", "R5", "L4", "L5", "R4", "L1", "L4", "R5", "L3", "R2", "R3", "L5", "L3", "R5", "L1", "R5", "L4", "R1", "R2", "L2", "L5", "L2", "R4", "L3", "R5", "R1", "L5", "L4", "L3", "R4", "L3", "L4", "L1", "L5", "L5", "R5", "L5", "L2", "L1", "L2", "L4", "L1", "L2", "R3", "R1", "R1", "L2", "L5", "R2", "L3", "L5", "L4", "L2", "L1", "L2", "R3", "L1", "L4", "R3", "R3", "L2", "R5", "L1", "L3", "L3", "L3", "L5", "R5", "R1", "R2", "L3", "L2", "R4", "R1", "R1", "R3", "R4", "R3", "L3", "R3", "L5", "R2", "L2", "R4", "R5", "L4", "L3", "L1", "L5", "L1", "R1", "R2", "L1", "R3", "R4", "R5", "R2", "R3", "L2", "L1", "L5"];

var myself = {
	x: 0,
	y: 0,
	direction: 360,
	locationsVisited: [],
	iKnowWhereIsHQ: false,
	hqLocation: null,

	rotate: function(rotation) {
		if (rotation === "L") {
			this.direction -= 90;
		
			if(this.direction === 0)
				this.direction = 360;
			
		} else {
			this.direction += 90;

			if(this.direction > 360)
				this.direction = 90;
		}
	},

	__walkInAxisAndStoreLocation: function(axis, blocks, value){
		while(blocks > 0 ){
			this[axis] += value;
			blocks --;
		
			var location = {
				x:this.x,
				y:this.y
			};

			this.wasLocationVisited(location);

		}
	},

	walk: function(blocks){
		
		switch (this.direction){
			case 90:
				this.__walkInAxisAndStoreLocation("x", blocks, 1);
				break;
			case 270:
				this.__walkInAxisAndStoreLocation("x", blocks, -1);
				break;
			case 360:
				this.__walkInAxisAndStoreLocation("y", blocks, 1);
				break;
			case 180:
				this.__walkInAxisAndStoreLocation("y", blocks, -1);
				break;
		}
	},
	wasLocationVisited : function(location){

		if(this.iKnowWhereIsHQ)
			return;
		
		var locationStringfied = JSON.stringify(location);

		if(this.locationsVisited.indexOf(locationStringfied) > 0){
			this.hqLocation = location;
			this.iKnowWhereIsHQ = true;
			return true;
		}else {
			this.locationsVisited.push(locationStringfied);	
			return false;
		}
	}
}

coordinations.forEach(function (coord) {
	
	myself.rotate(coord.substring(0,1));

	myself.walk(parseInt(coord.substring(1, coord.length)));
	
});

var finalCoordinates = Math.abs(myself.x) + Math.abs(myself.y);
console.log("My Final Coordination");
console.log("X: ", myself.x, "Y: ",  myself.y);
console.log("Final Coordination is: ", finalCoordinates);

console.log("Bunny HQ Coordination");
console.log("The bunny HQ is: ", myself.hqLocation);
var hqCoordinates = Math.abs(myself.hqLocation.x) + Math.abs(myself.hqLocation.y);
console.log("His HQ's final Coordination is: ", hqCoordinates );
