function Marker(compressedData){
	var nextMarkerAsString = compressedData.match(/\((.?){4}x.(.?){3}\)/);
	
	if(!nextMarkerAsString){
		throw "Not a marker"; 
	}

	var splittedMarker = nextMarkerAsString[0].split('x');
	this.numberOfSubsequentChar = parseInt(splittedMarker[0].replace('(',''));
	this.timesToRepeat = parseInt(splittedMarker[1].replace(')',''));

	var markerLength = nextMarkerAsString[0].length;
	var beginOfMarker = markerLength + nextMarkerAsString.index; 
	var endOfMarker = beginOfMarker + this.numberOfSubsequentChar;
	this.subsequentChar = compressedData.substring(beginOfMarker, endOfMarker);

	this.nextCompressedData = compressedData.substring(beginOfMarker + this.subsequentChar.length, compressedData.length);
}

Marker.prototype.getDecompressedDataLength = function(){
	var nextMarker = null;
	try{
		var withinMarker = new Marker(this.subsequentChar);

		try{
			nextMarker = new Marker(this.nextCompressedData);
			return this.timesToRepeat * withinMarker.getDecompressedDataLength() + nextMarker.getDecompressedDataLength();
		}catch(err){
			return this.timesToRepeat * withinMarker.getDecompressedDataLength();	
		}
		
	}catch(err){
		//Does not have a within Marker
		var numberOfCharDecompressed = this.timesToRepeat * this.numberOfSubsequentChar;
		try{
			nextMarker = new Marker(this.nextCompressedData);
			//Has next Marker
			return  numberOfCharDecompressed + nextMarker.getDecompressedDataLength();
		}catch(err){
			//Does not have next Marker
			return numberOfCharDecompressed;
		}
		
	}
};

module.exports = Marker;