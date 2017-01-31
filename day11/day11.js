function Floor(number, items, isElevatorHere) {
	this.number = number;
	this.items = items;
}

function Building(floors) {
	this.floors = floors;
	this.elevatorLocation = 0;
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

function getMovimentsWithoutFriyngAChip(building) {
	var possibleMovements = [];
	var items = building.floors[building.elevatorLocation].items;

	for (var i = 0; i < items.length; i++) {
		var floorItems = items.slice();
		var item = items[i];
		floorItems.splice(i, 1);

		if (!hasFriedChip(floorItems)) {
			if (building.elevatorLocation < 3) {
				var upFloorItems = building.floors[building.elevatorLocation + 1].items.slice();
				upFloorItems.push(item);
				if (!hasFriedChip(upFloorItems)) {
					possibleMovements.push({
						moviment: "up",
						items: [item]
					});
				}
			}

			if (building.elevatorLocation > 0) {
				var downFloorItems = building.floors[building.elevatorLocation - 1].items.slice();
				downFloorItems.push(item);
				if (!hasFriedChip(downFloorItems)) {
					possibleMovements.push({
						moviment: "down",
						items: [item]
					});
				}
			}
		}
	}

	for (var i = 0; i < items.length; i++) {
		for (var j = i + 1; j < items.length; j++) {
			var floorItems = items.slice();
			
			var item1 = items[i];
			var item2 = items[j];
			
			floorItems.splice(i, 1);
			floorItems.splice(j - 1, 1);

			if (!hasFriedChip(floorItems)) {

				if (building.elevatorLocation < 3) {
					var upFloorItems = building.floors[building.elevatorLocation + 1].items.slice();
					upFloorItems.push(item1);
					upFloorItems.push(item2);
					if (!hasFriedChip(upFloorItems)) {
						possibleMovements.push({
							moviment: "up",
							items: [item1, item2]
						});
					}
				}

				if (building.elevatorLocation > 0) {
					var downFloorItems = building.floors[building.elevatorLocation - 1].items.slice();
					downFloorItems.push(item1);
					downFloorItems.push(item2);
					if (!hasFriedChip(downFloorItems)) {
						possibleMovements.push({
							moviment: "down",
							items: [item1, item2]
						});
					}
				}
			}
		}
	}
	
	return possibleMovements;
}

var floors = [
	new Floor(1, ["pog", "thg", "thm", "prg", "rug" , "rum", "cog", "com"]),
	new Floor(2, ["pom", "prm"]),
	new Floor(3, []),
	new Floor(4, []),
];

var building = new Building(floors);
var step = 0;
//while(building.floors[3].items.length < 10){

	//check if has any fried chip
	for (var i = 0; i < building.floors.length; i++) {
		hasFriedChip(building.floors[i].items);
	}

	var elevatorMovimentsWithoutFriyngAChip = getMovimentsWithoutFriyngAChip(building);


	step++;
//}



