var Decompressor = require('../../day9/Decompressor');
var Marker = require('../../day9/Marker');

describe("Decompressor", function() {
	it("should consider parentheses as a marker ", function() {
		var compressedData = 'A(1x5)BC';
		var decompressor = new Decompressor(compressedData);
		var marker = decompressor.getNextMarker();
		expect(marker).not.toBe(null);
	});

	it("should not find a marker if compressed file does not have parentheses", function(){
		var decompressedData = 'ADVENT';
		var decompressor = new Decompressor(decompressedData);
		var marker = decompressor.getNextMarker();
		expect(marker).toBe(null);
	});

	it("should not consider parentheses within a marker as a Marker", function(){
		var compressedData = 'X(8x2)(3x3)ABC(1x1)Y(3x3)ABC';
		var decompressor = new Decompressor(compressedData);
		
		var marker = decompressor.getNextMarker();
		var expectedMarker = new Marker('(8x2)');
		expect(marker).toEqual(expectedMarker);

		marker = decompressor.getNextMarker();
		expectedMarker = new Marker('(1x1)');
		expect(marker).toEqual(expectedMarker);


		marker = decompressor.getNextMarker();
		expectedMarker = new Marker('(3x3)');
		expect(marker).toEqual(expectedMarker);
	});
});

describe("Marker", function(){
	var decompressor = null;
	beforeEach(function(){
		var compressedData = 'A(1x5)BC';
		decompressor = new Decompressor(compressedData);
	});

	it("should know how many times to repeat the subsequent chars", function(){
		var marker = decompressor.getNextMarker();
		expect(marker.repeatTimes).toBe(5);
	});

	it("should know how many subsequent chars it should repeat", function(){
		var marker = decompressor.getNextMarker();
		expect(marker.subsequentChar).toBe(1);
	});
});