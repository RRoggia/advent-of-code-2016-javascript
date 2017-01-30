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

describe("Day 11", function() {
	it("should has a fried chip if has more chips than generators", function () {
		var items = ["thg", "thm", "rug" , "rum", "com"];
		expect(hasFriedChip(items)).toBe(true);
	});

	it("should not has a fried chip if there is no chip between the items", function () {
		var items = ["thg", "rug"];
		expect(hasFriedChip(items)).toBe(false);
	});

	it("should not has a fried chip if there is only chips", function () {
		var items = ["pom", "prm"];
		expect(hasFriedChip(items)).toBe(false);
	});

	it("should has a fried chip if a chips does not have a generator", function () {
		var items = ["thg", "rug", "thm", "com"];
		expect(hasFriedChip(items)).toBe(true);
	});

	it("should not has a frid chip when all chips has an generator", function () {
		var items = ["pog", "thg", "thm", "prg", "rug" , "rum", "cog", "com"];
		expect(hasFriedChip(items)).toBe(false);
	});

});