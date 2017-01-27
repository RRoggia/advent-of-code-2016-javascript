
function Bot(number, low){
	this.number = number;
	this.low = low;
	this.high = NaN;
}

Bot.prototype.addChip = function (chipValue) {
	if((chipValue === 61 && this.low === 17 || this.high === 17) ||
		(chipValue === 17 && this.low === 61 || this.high === 61)){
		console.log("The answer is", this.number);
	}
	
	if(chipValue > this.low){
		this.high = chipValue;
	}else{
		this.high = this.low;
		this.low = chipValue;
	}
};

module.exports = Bot;