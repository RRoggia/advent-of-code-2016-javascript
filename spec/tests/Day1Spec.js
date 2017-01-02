describe("Day One", function() {

	var MySelf = require('../../day1/MySelf');
	var directions = require('../../day1/directions');
	var mySelf;
	
	beforeEach(function() {
		mySelf = new MySelf();
	});

	it("should be facing north", function() {
		expect(mySelf.direction).toEqual(directions.north);
	});

	it("should turn left given an sequence starting with 'L'", function(){
		mySelf.rotate('L');
		expect(mySelf.direction).toEqual(directions.west);
	});

	it("should turn right given an sequence starting with 'R'", function(){
		mySelf.rotate('R');
		expect(mySelf.direction).toEqual(directions.east);
	});

	it("should be able to turn 360° for both sides", function(){
		for (var i = 0; i < 4; i++) {
			mySelf.rotate('L');
		}

		expect(mySelf.direction).toEqual(directions.north);
		
		for (var i = 0; i < 4; i++) {
			mySelf.rotate('R');
		}

		expect(mySelf.direction).toEqual(directions.north);
	});

	it("should walk towards the direction the number of blocks specified in the sequence", function(){
		mySelf.walk(3);
		expect(mySelf.getBlocksAwayStartingPoint()).toEqual(3);
	});

	it("should turn right walk 2 blocks and then turn left and walk 3 blocks", function(){
		var coordinates = ['R2', 'L3'];
		mySelf.followCoordinates(coordinates);
		expect(mySelf.getBlocksAwayStartingPoint()).toEqual(5);
	});

	it("should turn right and walk 2 blocks three times", function(){
		var coordinates = ['R2', 'R2', 'R2',];
		mySelf.followCoordinates(coordinates);
		expect(mySelf.getBlocksAwayStartingPoint()).toEqual(2);
	});

	it("should get the bunny HQ distance from starting point", function(){
		var coordinates = require('../../day1/inputs');
		mySelf.followCoordinates(coordinates);
		expect(mySelf.getBlocksAwayStartingPoint()).toEqual(126);
	});

	it("should consider coordinates as absolute", function(){
		mySelf.location.x = -1;
		mySelf.location.y = -4;
		expect(mySelf.getBlocksAwayStartingPoint()).toEqual(5);
	});

	it("should store locations that I already passed by", function(){
		mySelf.walk(2);
		expect(mySelf.wasTheLocationVisited({x:0, y:1})).toEqual(true);
		expect(mySelf.wasTheLocationVisited({x:0, y:2})).toEqual(true);
	});

});