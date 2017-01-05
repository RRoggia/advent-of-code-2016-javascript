describe("Day Nine", function() {

	var Decompressor = require('../../day9/Decompressor');
	console.log(Decompressor);

	it("should find a marker", function() {
		var compressedData = 'A(1x5)BC';
		
		var decompressor = new Decompressor(compressedData);

		var marker = decompressor.getNextMarker();

		expect(marker).not.toBe(null);

	});



});