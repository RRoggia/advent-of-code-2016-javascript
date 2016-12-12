var candidatesTriangles = getInputs();

var numberOfPossibleTriangles = 0;

candidatesTriangles.forEach(function (triangleSides) {
	if(isATriangle(triangleSides))
		numberOfPossibleTriangles++;
	
});

function isATriangle(triangleSides){
	
	return (triangleSides[0] + triangleSides[1] > triangleSides[2]) &&
			(triangleSides[1] + triangleSides[2] > triangleSides[0]) &&
			(triangleSides[2] + triangleSides[0] > triangleSides[1]);

}

console.log(numberOfPossibleTriangles);