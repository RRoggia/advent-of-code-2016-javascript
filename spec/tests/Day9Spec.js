var Decompressor = require('../../day9/Decompressor');
var Marker = require('../../day9/Marker');

describe("Marker", function() {

	var compressedData = null;
	var marker = null;

	beforeEach(function(){
		compressedData = '(27x12)(20x12)(13x14)(7x10)(1x12)A';
		marker = new Marker(compressedData);
	});

	it("should contains the number of times to repeat a string", function(){
		expect(marker.timesToRepeat).toBe(12);
	});

	it("should contains the number of the subsequent chars", function(){
		expect(marker.numberOfSubsequentChar).toBe(27);
	});

	it("should contains the subsequent Char", function(){
		expect(marker.subsequentChar).toBe('(20x12)(13x14)(7x10)(1x12)A');

		compressedData = 'X(8x2)(3x3)ABCY';
		marker = new Marker(compressedData);
		expect(marker.subsequentChar).toBe('(3x3)ABC');
	});

	it("should multiply inner markers", function(){
		var length = marker.getDecompressedDataLength();
		expect(length).toBe(241920);
	});

	it("should contains next compressed Data", function(){
		compressedData = '(25x3)(3x3)ABC(2x3)XY(5x2)PQRST(18x9)(3x2)TWO(5x7)SEVEN';
		marker = new Marker(compressedData);
		expect(marker.nextCompressedData).toBe('(18x9)(3x2)TWO(5x7)SEVEN');
	});

	it("should add same level markers", function(){
		compressedData = '(25x3)(3x3)ABC(2x3)XY(5x2)PQRST';
		marker = new Marker(compressedData);
		var length = marker.getDecompressedDataLength();
		expect(length).toBe(75);
	});

	it("should multiply or add depending on next Marker", function(){
		compressedData = '(25x3)(3x3)ABC(2x3)XY(5x2)PQRS(18x9)(3x2)TWO(5x7)SEVEN';
		marker = new Marker(compressedData);
		var length = marker.getDecompressedDataLength();
		expect(length).toBe(445);
	});

	it("should run with puzzle input data", function(){
		compressedData = require('../../day9/input')
	});

});