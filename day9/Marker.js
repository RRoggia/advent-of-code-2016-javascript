function Marker(marker){
	var splittedMarker = marker.split('x');
	this.length = marker.length;
	this.subsequentChar = parseInt(splittedMarker[0].replace('(',''));
	this.repeatTimes = parseInt(splittedMarker[1].replace(')',''));
}

module.exports = Marker;