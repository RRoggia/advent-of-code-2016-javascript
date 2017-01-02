var directions = require('./directions');

function MySelf(){
	this.location = {
		x: 0,
		y: 0 
	};

	this.direction = directions.north;
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
			this.location.y += numberOfBlocks;
			break;
		case directions.south:
			this.location.y -= numberOfBlocks;
			break;
		case directions.east:
			this.location.x += numberOfBlocks;
			break;
		case directions.west:
			this.location.x -= numberOfBlocks;
			break;
	}

};

MySelf.prototype.followCoordinates = function(coordinates){
	coordinates.forEach(function (coord) {
		this.rotate(coord.substring(0,1));
		this.walk(parseInt(coord.substring(1, coord.length)));
	}, this);
};

MySelf.prototype.getBlocksAwayStartingPoint = function(){
	return Math.abs(this.location.x) + Math.abs(this.location.y);
};

module.exports = MySelf;