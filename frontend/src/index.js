import * as R from 'ramda'

import './static/index.html'
import './static/scss/index.scss'
import data from '../../wrangling/births_with_population.json'
import * as Scatterplot from './scatterplot'
import createSelect from './select'
import cityDetails from './cityDetails'

var margin = {top: 30, right: 50, bottom: 40, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

let state = {
	data,
	yAttribute: 'BirthsPopulationRatio',
	xAttribute: 'Unemployment',
	radiusAttribute: 'Population',
	xScale: null,
	yScale: null,
	xAxis: null,
	yAxis: null,
	radius: null,
	color: null,
	svg: null,
}

const xAttributes = [
	'Unemployment',
	'MenUnemployed2016',
	'WomenUnemployed2016',
	'Population',
	'UniversityDegree'
]

const yAttributes = [
	'BirthsPopulationRatio',
	'BirthDeathSum',
	'Births2015',
	'Births2016',
	'Births2017',
	'BirthsChange%',
]

const attributesToString = {
	'Unemployment': 'Unemployment, %',
	'MenUnemployed2016': "Men unemployed in 2016",
	'WomenUnemployed2016': 'Women unemployed in 2016',
	'Population': 'Population',
	'UniversityDegree': 'University degrees, % of population',
	'BirthsPopulationRatio': 'Births per population',
	'BirthDeathSum': 'Births - deaths',
	'Births2015': 'Births in 2015',
	'Births2016': 'Births in 2016',
	'Births2017': 'Births in 2017',
	'BirthsChange%': 'Change in births, %',
	'Region': 'Region'
}

const initApp = () => {
	const scales = Scatterplot.scales(state, width, height)
	state = R.merge(state, scales)
	const svg = Scatterplot.renderBase('#visualization', margin, width, height, state, attributesToString)
	state = R.merge(state, {svg})
	Scatterplot.renderBubbles(state, bubbleClickHandler)
	Scatterplot.renderLegend(state, width)
	window.handleXSelectChange = handleXSelectChange
	window.handleYSelectChange = handleYSelectChange
	createSelect(xAttributes, 'select-x', 'handleXSelectChange(value)', attributesToString)
	createSelect(yAttributes, 'select-y', 'handleYSelectChange(value)', attributesToString)
	console.log(state)
}
const updateState = (newState) => {
	const newScales = Scatterplot.scales(state, width, height)
	state = R.merge(state, newState)
	Scatterplot.redrawAxis(state, attributesToString)
	Scatterplot.renderBubbles(state, bubbleClickHandler)
	Scatterplot.renderLegend(state, width)
	console.log(state)
}

const handleXSelectChange = (val) => {
	const xAxis = Scatterplot.updateXdim(state, val)
	updateState({'xAttribute': val, xAxis})
}

const handleYSelectChange = (val) => {
	const yAxis = Scatterplot.updateYdim(state, val)
	updateState({'yAttribute': val, yAxis})
}

const bubbleClickHandler = (city) => {
	var cityNode = document.getElementById('city-details');
	while (cityNode.firstChild) {
	    cityNode.removeChild(cityNode.firstChild);
	}
	cityDetails(city, 'city-details')
}

initApp()

export { attributesToString, bubbleClickHandler }
