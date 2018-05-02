import * as d3 from "d3"
import { bubbleClickHandler } from './index'

const scales = (state, width, height) => {
  const { data, xAttribute, yAttribute, radiusAttribute } = state;

  var xScale = d3.scaleLinear()
    .range([0, width]);

  var yScale = d3.scaleLinear()
    .range([height, 0]);

  var radius = d3.scaleLinear()
    .range([2,10]);

  var xAxis = d3.axisBottom()
    .scale(xScale);

  var yAxis = d3.axisLeft()
    .scale(yScale);

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  xScale.domain(d3.extent(data, function(d){
    return d[xAttribute];
  })).nice();

  yScale.domain(d3.extent(data, function(d){
    return d[yAttribute];
  })).nice();

  radius.domain(d3.extent(data, function(d){
    return d[radiusAttribute];
  })).nice();

  return { xScale, yScale, xAxis, yAxis, radius, color }

}

const renderBase = (targetHTML, margin, width, height, state, attributesToString) => {
  const { data, xAxis, yAxis, xScale, yScale, color, xAttribute, yAttribute } = state

  var svg = d3.select(targetHTML)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'x-axis')
    .call(xAxis);

  svg.append('g')
  	.attr('transform', 'translate(0,0)')
  	.attr('class', 'y-axis')
  	.call(yAxis);

  svg.append('rect')
    .attr('x', 0)
    .attr('y', yScale(1))
    .attr('width', width - margin.right)
    .attr('height', 1)
    .attr('id', 'median-line')
    .style('fill', '#c3c3c3')

  svg.append('text')
    .attr('x', 10)
    .attr('y', 10)
    .attr('class', 'label')
    .attr('id', 'y-label')
    .text(attributesToString[yAttribute]);

  svg.append('text')
    .attr('x', width)
    .attr('y', height - 10)
    .attr('text-anchor', 'end')
    .attr('class', 'label')
    .attr('id', 'x-label')
    .text(attributesToString[xAttribute]);

  return svg

}
const redrawAxis = (state, attributesToString) => {
  const { xAttribute, yAttribute, data, xScale, yScale, svg, xAxis, yAxis } = state
  const medianLineY = {
    'BirthsPopulationRatio': 1,
    'BirthDeathSum': 0,
    'Births2015': 0,
    'Births2016': 0,
    'Births2017': 0,
    'BirthsChange%': 0,
  }
  svg.selectAll('.x-axis').call(xAxis)
  svg.selectAll('#x-label').text(attributesToString[xAttribute])
  svg.selectAll('.y-axis').call(yAxis)
  svg.selectAll('#y-label').text(attributesToString[yAttribute])
  svg.select('#median-line')
    .transition()
    .duration(1000)
    .attr('y', yScale(medianLineY[yAttribute]))
  svg.selectAll('.bubble')
    .transition()
    .duration(1000)
    .attr('cx', (d) => xScale(d[xAttribute]))
    .attr('cy', (d) => yScale(d[yAttribute]))
}

const updateXdim = (state, newXAttr, attributesToString) => {
  const { xScale, data } = state
  xScale.domain(d3.extent(data, function(d){
    return d[newXAttr];
  })).nice();
  return d3.axisBottom().scale(xScale);
}

const updateYdim = (state, newYAttr, attributesToString) => {
  const { yScale, data } = state
  yScale.domain(d3.extent(data, function(d){
    return d[newYAttr];
  })).nice();
  return d3.axisLeft().scale(yScale);
}


const renderBubbles = (state, bubbleClickHandler) => {
  const { svg, data, yAttribute, xAttribute, xScale, yScale, radius, color } = state
  var bubble = svg.selectAll('.bubble').data(data)

  bubble.enter().append('circle')
    .on('mouseover', onBubbleMouseOver)
    .on('click', onBubbleClick)
    .on('mouseleave', onBubbleMouseExit)
    .attr('class', 'bubble')
    .attr('cx', function(d){return xScale(d[xAttribute]);})
    .attr('cy', function(d){return yScale(d[yAttribute]); })
    .attr('r', function(d){ return radius(d.Population); })
    .style('fill', function(d){ return color(d.Region); })
    .append('title')
      .attr('x', function(d){ return radius(d.Population); })
      .text(function(d){
        return d.Area;
      })


  bubble.exit().remove();
}

/* Events cannot be an arrow function, because this won't be properly set */

function onBubbleClick(city) {
  const bubbles = d3.selectAll('.bubble').classed('selected', false)
  d3.select(this).classed('selected', true)
  bubbleClickHandler(city)
}

function onBubbleMouseOver(city) {
    d3.select(this)
      .classed('hovered', true)
      .insert('text')
        .attr('x', 20)
        .attr('y', 20)
        .attr('font-size', "20px")
        .attr('fill', 'black')
        .text((c) => 'Hei!')
}

function onBubbleMouseExit(city) {
  d3.select(this).classed('hovered', false)
}

const renderLegend = (state, width) => {
  const { svg, data, color } = state

  var legend = svg.selectAll('legend')
    .data(color.domain())
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', function(d,i){ return 'translate(0,' + i * 20 + ')'; });

  legend.append('rect')
    .attr('x', width)
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', color);

  legend.append('text')
    .attr('x', width - 6)
    .attr('y', 9)
    .attr('dy', '.35em')
    .style('text-anchor', 'end')
    .text(function(d){ return d; });

  legend.on('click', function(type){
    d3.selectAll('.bubble')
      .style('opacity', 0.15)
      .filter(function(d){
        return d.Region == type || type == null;
      })
      .style('opacity', 1);
  })
}

export { renderBase, renderBubbles, scales, renderLegend, updateXdim, updateYdim, redrawAxis };
