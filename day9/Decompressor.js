function Decompressor(compreesedData){
	this.compreesedData = compreesedData;
}

Decompressor.prototype.getNextMarker = function(){
	return this.compreesedData.match(/\((.?){4}x.(.?){3}\)/);
}

module.exports = Decompressor;