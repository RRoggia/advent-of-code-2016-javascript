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
		nextMarker = new Marker(this.subsequentChar);
		var length = nextMarker.getDecompressedDataLength();
		try{
			nextMarker = new Marker(this.nextCompressedData);	
			return this.timesToRepeat * length + nextMarker.getDecompressedDataLength();
		}catch(err){
			return this.timesToRepeat * length;	
		}
		
	}catch(err){
		try{
			nextMarker = new Marker(this.nextCompressedData);	
			return this.timesToRepeat * this.numberOfSubsequentChar + nextMarker.getDecompressedDataLength();
		}catch(err){
			return this.timesToRepeat * this.numberOfSubsequentChar;
		}
		
	}
};

module.exports = Marker;