import * as d3 from "d3"

const renderSelect = (setAttributeValues) =>{

	document.body.onload = () => {

		addElement(setAttributeValues)
		setAttributeValues()
	}
}


var attributesToString = [
		'Births to Population',
		'Unemployment',
		'University Degree',
	]
var values = [
		'BirthsPopulationRatio',
		'Unemployment',
		'UniversityDegree',
	]

const addElement = (setAttributeValues) => {
	
	var xAxis = document.createElement("select"); 
	xAxis.id = "xAxisSelect" 
	xAxis.addEventListener('change',function() {
    		setAttributeValues()
		console.log(xAxis.value)
	},false);
	
	var yAxis = document.createElement("select"); 
	yAxis.id = "yAxisSelect"
	xAxis.addEventListener('change',function() {
    		setAttributeValues()
		console.log(xAxis.value)
	},false);

	var currentDiv = document.getElementById("div1") 
	currentDiv.appendChild(xAxis)
	currentDiv.appendChild(yAxis)
  
	for (var i = 0; i < attributesToString.length; i++) {
		var xOption = document.createElement("option")
		var yOption = document.createElement("option")

		xOption.value = values[i]
		xOption.text = attributesToString[i]
		xOption.id = values[i]


		yOption.value = values[i]
		yOption.text = attributesToString[i]
		yOption.id = values[i]

		xAxis.appendChild(xOption)
		yAxis.appendChild(yOption)
	}
	yAxis.selectedIndex = 1

}
const getAxisValues = () => {
	
	const yAxis = document.getElementById("yAxisSelect") 
	const xAxis = document.getElementById("xAxisSelect") 

	console.log(yAxis.options[yAxis.selectedIndex].value)
	var values = {
		'xAttribute': xAxis.options[xAxis.selectedIndex].value,
		'yAttribute': yAxis.options[yAxis.selectedIndex].value
	}
	return values;
}

/*
const addD3Element = () => {
var data = attributesToString;

var select = d3.select('body')
  .append('select')
  .attr('class','select')
  .on('change',onchange)

console.log(d3.select('select').property('value'))

var options = select
  .selectAll('option')
	.data(data).enter()
	.append('option')
		.text(function (d) { return d; });


}

const onchange = () => {
	selectValue = d3.select('select').property('value')
	d3.select('body')
		.append('p')
		.text(selectValue + ' is the last selected option.')
}*/

export {renderSelect, getAxisValues}
