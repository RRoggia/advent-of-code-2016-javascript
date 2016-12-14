var roomsEncryption = getInputs();
var sectorIdSum = 0;

roomsEncryption.forEach(function (roomEncryption) {
	
	var room = new Room(roomEncryption);

	var fiveMostCommonLettersCheckSum = createCheckSum(room.name);

	if(fiveMostCommonLettersCheckSum === room.checkSum)
		sectorIdSum += room.sectorId;

});

console.log(sectorIdSum);

function Room(roomEncryption){
	var stringfiedSectorId = roomEncryption.match(/\d{3}/)[0];
	var stringfiedCheckSum = roomEncryption.match(/\[[a-z]{5}\]/)[0];

	var notTheName = stringfiedSectorId.length + stringfiedCheckSum.length;
	this.name = roomEncryption.substring(0, (roomEncryption.length - 1) - notTheName).replace(/-/g,"");
	this.sectorId = parseInt(stringfiedSectorId);
	this.checkSum = stringfiedCheckSum.replace(/[^a-z]/g,"");
}

function createCheckSum(name){
	
	var timesLettersAppears = countHowManyTimesLetterAppearsIn(name);

	var checkSumOrdered = orderMapByValueAndAlphabetization(timesLettersAppears);
	
	return getReadableFiveDigitsCheckSum(checkSumOrdered);
}

function countHowManyTimesLetterAppearsIn(name){
	var timesLettersAppears = {};

	Array.from(name).forEach(function(letter){
		if(timesLettersAppears[letter]){
			timesLettersAppears[letter]++;
		}else{
			timesLettersAppears[letter] = 1;
		}
	});

	return timesLettersAppears;
}

function orderMapByValueAndAlphabetization(timesLettersAppears){

	var checkSumOrdered = [];

	for(var letter in timesLettersAppears) {
		
		if(checkSumOrdered.length > 0) {
				
			var isLastItem = true;

			for (var i = 0; i < checkSumOrdered.length; i++) {
				var orderedLetter = checkSumOrdered[i]

				if(timesLettersAppears[orderedLetter] < timesLettersAppears[letter]){
					checkSumOrdered.splice(i, 0, letter);
					isLastItem = false;
					break;
				}else if(timesLettersAppears[orderedLetter] === timesLettersAppears[letter]){
					if(letter < orderedLetter){
						checkSumOrdered.splice(i, 0, letter);
						isLastItem = false;
						break;
					}
				}						
			};

			if(isLastItem)
				checkSumOrdered.push(letter);

		}else {
			checkSumOrdered.push(letter);
		}
	}

	return checkSumOrdered;
}

function getReadableFiveDigitsCheckSum(checkSum){
	return checkSum.toString().substring(0,9).replace(/,/g,"");
}