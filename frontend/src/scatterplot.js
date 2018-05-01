import * as d3 from "d3"

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
  	.attr('class', 'y axis')
  	.call(yAxis);

  svg.append('rect')
  	.attr('x', 0)
  	.attr('y', yScale(1))
  	.attr('width', width)
  	.attr('height', 1)
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
const redrawXAxis = (state, attributesToString) => {
  const { xAttribute, data, xScale, svg, xAxis } = state
  svg.selectAll('.x-axis').call(xAxis)
  svg.selectAll('#x-label').text(attributesToString[xAttribute])
  svg.selectAll('.bubble')
    .transition()
    .duration(1000)
    .attr('cx', (d) => xScale(d[xAttribute]))
}

const updateXdim = (state, newXAttr, attributesToString) => {
  const { xScale, data } = state
  xScale.domain(d3.extent(data, function(d){
    return d[newXAttr];
  })).nice();
  return d3.axisBottom().scale(xScale);
}

const renderBubbles = (state) => {
  const { svg, data, yAttribute, xAttribute, xScale, yScale, radius, color } = state
  var bubble = svg.selectAll('.bubble').data(data)

  bubble.enter().append('circle')
    .attr('class', 'bubble')
    .attr('cx', function(d){return xScale(d[xAttribute]);})
    .attr('cy', function(d){return yScale(d[yAttribute]); })
    .attr('r', function(d){ return radius(d.Population); })
    .style('fill', function(d){ return color(d.Region); })
    .append('title')
      .attr('x', function(d){ return radius(d.Population); })
      .text(function(d){
        return d.Area;
      });

  bubble.exit().remove();
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

export { renderBase, renderBubbles, scales, renderLegend, updateXdim, redrawXAxis };
