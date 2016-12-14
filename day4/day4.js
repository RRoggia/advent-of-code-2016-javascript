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
	var timesLettersAppears = {};

	Array.from(name).forEach(function(letter){
		if(timesLettersAppears[letter]){
			timesLettersAppears[letter]++;
		}else{
			timesLettersAppears[letter] = 1;
		}
	});

	var checkSumOrderedByValue = [];

	for (var letter in timesLettersAppears){
		
		if(checkSumOrderedByValue.length === 0){
			checkSumOrderedByValue.push(letter);
			continue;
		}

		if(checkSumOrderedByValue.length > 0){
			var shouldAdd = false;
			var index = 0;

			for (var i = 0; i < checkSumOrderedByValue.length; i++) {
				var orderedLetter = checkSumOrderedByValue[i]

				if(timesLettersAppears[orderedLetter] < timesLettersAppears[letter]){
					shouldAdd = true;
					index = i;
					break;
				}else if(timesLettersAppears[orderedLetter] === timesLettersAppears[letter]){
					if(letter < orderedLetter){
						shouldAdd = true;
						index = i;
						break;
					}
				}						
			};

			if(shouldAdd){
				shouldAdd = false;
				checkSumOrderedByValue.splice(index, 0, letter);
			}else{
				checkSumOrderedByValue.push(letter);
			}
		}
	}
		
	 return checkSumOrderedByValue.toString().substring(0,9).replace(/,/g,"");;
}