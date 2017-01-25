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
		var length = 0;
		nextMarker = new Marker(this.subsequentChar);
		for (var i = 0; i < 100000000; i++) {
			length += nextMarker.getDecompressedDataLength();
			
			if(!nextMarker.nextCompressedData){
				i = 100000001;
				continue;
			}
			nextMarker = new Marker(nextMarker.nextCompressedData);
		}
		try{
			nextMarker = new Marker(this.nextCompressedData);	
			return this.timesToRepeat * length + nextMarker.getDecompressedDataLength();
		}catch(err){
			return this.timesToRepeat * length;	
		}
		
	}catch(err){
		return this.timesToRepeat * this.numberOfSubsequentChar;
	}
};

module.exports = Marker;