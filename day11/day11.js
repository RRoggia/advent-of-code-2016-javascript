function Floor(number, items, isElevatorHere) {
	this.number = number;
	this.items = items;
}

function Building(floors) {
	this.floors = floors;
	this.elevatorLocation = 1;
}



function hasFriedChip(items) {
	var chips = [];
	var generators = [];

	for (var i = 0; i < items.length; i++) {
		if (items[i].substring(2,3) === "m"){
			chips.push(items[i].substring(0,2));
		}else{
			generators.push(items[i].substring(0,2));
		}
	}

	if (chips.length === 0 || generators.length === 0 )
		return false;

	if (chips.length > generators.length)
		return true;

	for (i = 0; i < chips.length; i++) {
		var isElementFried = true;
		for (var j = 0; j < generators.length; j++) {
			if (chips[i] === generators[j]) {
				isElementFried = false;
				break;
			}
		}
		if(isElementFried)
			return isElementFried
	}

	return false;
}

var floors = [
	new Floor(1, ["pog", "thg", "thm", "prg", "rug" , "rum", "cog", "com"]),
	new Floor(2, ["pom", "prm"]),
	new Floor(3, []),
	new Floor(4, []),
];

var building = new Building(floors);
var step = 0;
while(building.floors[3].items.length < 10){

	//check if has any fried chip
	for (var i = 0; i < building.floors.length; i++) {
		hasFriedChip(building.floors[i].items);
	}

	step++;
}



