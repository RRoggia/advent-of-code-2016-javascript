var Marker = require('./Marker');
function Decompressor(compressedData){
	this.compressedData = compressedData;
	this.compressedDataLastPosition = 0;
};

Decompressor.prototype.getNextMarker = function(){
	var compressedDataWithoutLastMarker = this.compressedData.substring(this.compressedDataLastPosition, this.compressedData.length);
	var compressedMarker = compressedDataWithoutLastMarker.match(/\((.?){4}x.(.?){3}\)/);

	if(!compressedMarker){
		return null;	
	}else{
		var marker = new Marker(compressedMarker[0]);	
		this.compressedDataLastPosition += compressedMarker.index + marker.subsequentChar + marker.length;
		return marker;
	}
};

Decompressor.prototype.getRemainingString = function(){

};

module.exports = Decompressor;