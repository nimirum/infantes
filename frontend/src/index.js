import './static/index.html'
import './static/scss/index.scss'
import data from '../../wrangling/births_with_population.json'
import {scatterplot, renderBubbles} from './scatterplot'

var margin = {top: 30, right: 50, bottom: 40, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

let state = {
	data,
}
const base = scatterplot('body', margin, width, height)
const { svg, xScale, yScale, radius, color } = base(state.data)
renderBubbles(svg, state.data, 'BirthsPopulationRatio', 'Unemployment', xScale, yScale, radius, color)


const updateState = (newState) => {
	state = newState
	renderBubbles(svg, state.data, 'BirthsPopulationRatio', 'Unemployment', xScale, yScale, radius, color)
}

window.onButtonClick = (e) => {
	const index = Math.floor(state.data.length / 2)
	const data = state.data.slice(index)
	updateState({data})
}
