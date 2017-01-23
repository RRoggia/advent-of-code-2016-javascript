function Marker(compressedData){
	var nextMarkerAsString = compressedData.match(/\((.?){4}x.(.?){3}\)/);
	
	if(!nextMarkerAsString){
		throw "Not a marker"; 
	}

	var splittedMarker = nextMarkerAsString[0].split('x');
	this.numberOfSubsequentChar = parseInt(splittedMarker[0].replace('(',''));
	this.timesToRepeat = parseInt(splittedMarker[1].replace(')',''));
	var endOfMarker = nextMarkerAsString[0].length + nextMarkerAsString.index + this.numberOfSubsequentChar;
	this.subsequentChar = compressedData.substring(nextMarkerAsString[0].length + nextMarkerAsString.index, endOfMarker);
}

Marker.prototype.getDecompressedDataLength = function(){
	var nextMarker = null;
	try{
		nextMarker = new Marker(this.subsequentChar);	
		return this.timesToRepeat * nextMarker.getDecompressedDataLength();
	}catch(err){
		return this.timesToRepeat * this.numberOfSubsequentChar;
	}
};

module.exports = Marker;