const renderSelect = () =>{

	document.body.onload = addElement;
}


var attributesToString = [
		'BirthsPopulationRatio',
		'Unemployment',
		'UniversityDegree',
	]

const addElement = () => {
	
	
	var newSelect = document.createElement("select"); 
	newSelect.id = "newSelect" 
 

	var currentDiv = document.getElementById("div1"); 
	currentDiv.appendChild(newSelect);  
	console.log(attributesToString.length)
	for (var i = 0; i < attributesToString.length; i++) {
		var option = document.createElement("option");
		option.value = attributesToString[i];
		option.text = attributesToString[i];
		newSelect.appendChild(option);
	}

}

export {renderSelect}
