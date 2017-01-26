function Bot(number, low){
	this.number = number;
	this.low = low;
	this.high = NaN;
}

Bot.prototype.addChip = function (chipValue) {
	if(chipValue > this.low){
		this.high = chipValue;
	}else{
		this.high = this.low;
		this.low = chipValue;
	}
}

module.exports = Bot;