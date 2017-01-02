var directions = require('./directions');

function MySelf(){
	this.location = {
		x: 0,
		y: 0 
	};

	this.direction = directions.north;

	this.locationsVisited = [];
	this.bunnyHQLocation = null;
};

MySelf.prototype.rotate = function(rotationInSequence){
	var rotationAngle = 90;

	if (rotationInSequence === 'L'){
		this.direction += rotationAngle;

		if(this.direction > directions.east)
			this.direction = directions.north;

	}else if(rotationInSequence === 'R'){
		this.direction -= rotationAngle;

		if(this.direction === 0)
			this.direction = directions.east;
	}

};

MySelf.prototype.walk = function(numberOfBlocks){

	switch (this.direction){
		case directions.north:
			this.walkInAxisAndStoreLocation('y', numberOfBlocks, 1);
			break;
		case directions.south:
			this.walkInAxisAndStoreLocation('y', numberOfBlocks, -1);
			break;
		case directions.east:
			this.walkInAxisAndStoreLocation('x', numberOfBlocks, 1);
			break;
		case directions.west:
			this.walkInAxisAndStoreLocation('x', numberOfBlocks, -1);
			break;
	}

};

MySelf.prototype.walkInAxisAndStoreLocation = function(axis, numberOfBlocks, value){
	for (var i = 0; i < numberOfBlocks; i++) {
		this.location[axis] += value;
		if(!this.wasTheLocationVisited(this.location)){
			this.storeMyLocation();
		}else{
			this.saveBunnyHQLocation();
			return;
		}
	}
};

MySelf.prototype.followCoordinates = function(coordinates){
	coordinates.forEach(function (coord) {
		if(this.bunnyHQLocation === null){
			this.rotate(coord.substring(0,1));
			this.walk(parseInt(coord.substring(1, coord.length)));
		}
	}, this);
};

MySelf.prototype.getBlocksAwayStartingPoint = function(){
	return Math.abs(this.location.x) + Math.abs(this.location.y);
};

MySelf.prototype.storeMyLocation = function(){
	var myLocation = JSON.stringify(this.location);
	this.locationsVisited.push(myLocation);
};

MySelf.prototype.wasTheLocationVisited = function(visitedLocation){
	var locationStringfied = JSON.stringify(visitedLocation);
	return this.locationsVisited.indexOf(locationStringfied) >= 0;
};

MySelf.prototype.saveBunnyHQLocation = function(){
	this.bunnyHQLocation = this.location;
};

module.exports = MySelf;