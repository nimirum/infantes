import * as R from 'ramda'

import './static/index.html'
import './static/scss/index.scss'
import data from '../../wrangling/births_with_population.json'
import {scatterplot, renderBubbles} from './scatterplot'

var margin = {top: 30, right: 50, bottom: 40, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

let state = {
	data,
	yAttribute: 'BirthsPopulationRatio',
	xAttribute: 'Unemployment',
	xScale: null,
	yScale: null,
	radius: null,
	color: null,
	svg: null,
}

const initApp = () => {
	const {svg, xScale, yScale, radius, color} = scatterplot('body', margin, width, height, state)
	state = R.merge(state, {svg, xScale, yScale, radius, color})
	renderBubbles(state)
	console.log(state)
}
const updateState = (newState) => {
	state = R.merge(state, newState)
	renderBubbles(state)
}

window.onButtonClick = (e) => {
	const index = Math.floor(state.data.length / 2)
	const data = state.data.slice(index)
	updateState({data})
}

initApp()
