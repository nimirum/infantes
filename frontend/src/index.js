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
	'BirthsPopulationRatio': 'Births to population',
	'Unemployment': 'Unemployment',
	'Population': 'Population',
}

const initApp = () => {
	const scales = Scatterplot.scales(state, width, height)
	state = R.merge(state, scales)
	console.log(state)
	const svg = Scatterplot.renderBase('#visualization', margin, width, height, state, attributesToString)
	state = R.merge(state, {svg})
	Scatterplot.renderBubbles(state)
	Scatterplot.renderLegend(state, width)
	createSelect({options: xAttributes, handleSelectChange: handleXSelectChange}, 'select-x')
	console.log(state)
}
const updateState = (newState) => {
	state = R.merge(state, newState)
	Scatterplot.renderBubbles(state)
	console.log(state)
}

window.onButtonClick = (e) => {
	const index = Math.floor(state.data.length / 2)
	const data = state.data.slice(index)
	updateState({data})
}

const handleXSelectChange = (val) => {
	updateState({'xAttribute': val})
}

initApp()
