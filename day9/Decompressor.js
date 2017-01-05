var Marker = require('./Marker');
function Decompressor(compressedData){
	this.compressedData = compressedData;
	this.compressedDataLastPosition = 0;
	this.marker = null;
	this.decompressedLength = 0;
};

Decompressor.prototype.getMarker = function(){
	return this.marker;
};

Decompressor.prototype.getDecompressedLength = function(){
	return this.decompressedLength;
};

Decompressor.prototype.hasDataToDecompress = function(){
	var compressedMarker = this.getNextMarkerFromCompressedData();

	if(!compressedMarker){
		return false;	
	}else{
		return true;
	}

};

Decompressor.prototype.getNextMarker = function(){
	
	var compressedMarker = this.getNextMarkerFromCompressedData();

	if(!compressedMarker){
		return null;	
	}else{
		this.marker = new Marker(compressedMarker[0]);	
		this.changeNextMarkerPosition(compressedMarker.index, this.marker);
		return this.marker;
	}
};

Decompressor.prototype.getNextMarkerFromCompressedData = function(){
	var compressedDataWithoutLastMarker = this.compressedData.substring(this.compressedDataLastPosition, this.compressedData.length);
	return compressedDataWithoutLastMarker.match(/\((.?){4}x.(.?){3}\)/);
};

Decompressor.prototype.changeNextMarkerPosition = function(currentMarkerInitialPosition, currentMarker){
	this.compressedDataLastPosition += currentMarkerInitialPosition + currentMarker.subsequentChar + currentMarker.length;
};

Decompressor.prototype.decompressMarker = function(){
	this.decompressedLength += this.marker.subsequentChar * this.marker.repeatTimes;
}

module.exports = Decompressor;