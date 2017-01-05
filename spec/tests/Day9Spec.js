describe("Day Nine", function() {

	var Decompressor = require('../../day9/Decompressor');

	var decompressor = null;
	beforeEach(function(){
		var compressedData = 'A(1x5)BC';
		decompressor = new Decompressor(compressedData);
	});

	it("should find a marker", function() {
		var marker = decompressor.getNextMarker();
		expect(marker).not.toBe(null);
	});

	it("Marker should know how many times to repeat a string", function(){
		var marker = decompressor.getNextMarker();
		expect(marker.repeatTimes).toBe(5);
	});



});