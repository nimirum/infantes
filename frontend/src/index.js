import * as R from 'ramda'

import './static/index.html'
import './static/scss/index.scss'
import data from '../../wrangling/births_with_population.json'
import * as Scatterplot from './scatterplot'
import createSelect from './select'

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

const attributesToString = {
	'Unemployment': 'Unemployment',
	'MenUnemployed2016': "Men unemployed in 2016",
	'WomenUnemployed2016': 'Women unemployed in 2016',
	'Population': 'Population',
	'UniversityDegree': '% with university degree',
	'BirthsPopulationRatio': 'Births to population'
}

const initApp = () => {
	const scales = Scatterplot.scales(state, width, height)
	state = R.merge(state, scales)
	const svg = Scatterplot.renderBase('#visualization', margin, width, height, state, attributesToString)
	state = R.merge(state, {svg})
	Scatterplot.renderBubbles(state)
	Scatterplot.renderLegend(state, width)
	createSelect({options: xAttributes, handleSelectChange: handleXSelectChange}, 'select-x')
	console.log(state)
}
const updateState = (newState) => {
	const newScales = Scatterplot.scales(state, width, height)
	state = R.merge(state, newState)
	Scatterplot.redrawXAxis(state, attributesToString)
	Scatterplot.renderBubbles(state)
	Scatterplot.renderLegend(state, width)
	console.log(state)
}

const handleXSelectChange = (val) => {
	const xAxis = Scatterplot.updateXdim(state, val)
	updateState({'xAttribute': val, xAxis})
}

initApp()
