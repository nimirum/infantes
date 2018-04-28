import * as R from 'ramda'

import './static/index.html'
import './static/scss/index.scss'
import data from '../../wrangling/births_with_population.json'
import * as Scatterplot from './scatterplot'

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

const attributesToString = {
	'BirthsPopulationRatio': 'Births to population',
	'Unemployment': 'Unemployment',
	'Population': 'Population',
}

const initApp = () => {
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

initApp()
