var Marker = require('./Marker');
function Decompressor(compressedData){
	this.compressedData = compressedData;
	this.compressedDataLastPosition = 0;
};

Decompressor.prototype.getNextMarker = function(){
	
	var compressedMarker = this.getNextMarkerFromCompressedData();

	if(!compressedMarker){
		return null;	
	}else{
		var marker = new Marker(compressedMarker[0]);	
		this.changeNextMarkerPosition(compressedMarker.index, marker);
		return marker;
	}
};

Decompressor.prototype.getNextMarkerFromCompressedData = function(){
	var compressedDataWithoutLastMarker = this.compressedData.substring(this.compressedDataLastPosition, this.compressedData.length);
	return  compressedDataWithoutLastMarker.match(/\((.?){4}x.(.?){3}\)/);
};

Decompressor.prototype.changeNextMarkerPosition = function(currentMarkerInitialPosition, currentMarker){
	this.compressedDataLastPosition += currentMarkerInitialPosition + currentMarker.subsequentChar + currentMarker.length;
};

module.exports = Decompressor;