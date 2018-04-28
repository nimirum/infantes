import * as R from 'ramda'

import './static/index.html'
import './static/scss/index.scss'
import data from '../../wrangling/births_with_population.json'
import * as Scatterplot from './scatterplot'
import * as Select from './select'

var margin = {top: 30, right: 50, bottom: 40, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var xAttr = 'BirthsPopulationRatio';
var yAttr = 'Unemployment';

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

const attributesToString = {
	'BirthsPopulationRatio': 'Births to population',
	'Unemployment': 'Unemployment',
	'Population': 'Population',
}

const initApp = () => {
	Select.renderSelect(setAttributeValues)
	console.log(state)
	const scales = Scatterplot.scales(state, width, height)
	state = R.merge(state, scales)
	console.log(state)
	const svg = Scatterplot.renderBase('body', margin, width, height, state, attributesToString)
	state = R.merge(state, {svg})
	Scatterplot.renderBubbles(state)
	Scatterplot.renderLegend(state, width)
	console.log(state)

	
}
const updateState = (newState) => {
	state = R.merge(state, newState)
	Scatterplot.renderBubbles(state)
}

window.onButtonClick = (e) => {
	const index = Math.floor(state.data.length / 2)
	const data = state.data.slice(index)
	updateState({data})
}

const setAttributeValues = () => {
	const xAxis = document.getElementById("xAxisSelect") 
	const yAxis = document.getElementById("yAxisSelect")

	var values = {
		'xAttribute': xAxis.options[xAxis.selectedIndex].value,
		'yAttribute': yAxis.options[yAxis.selectedIndex].value
	}

	state = R.merge(state, values)
	console.log(state)
}


initApp()
