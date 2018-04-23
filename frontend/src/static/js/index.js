var w = 800;
var h = 500;

//http://flowingdata.com/2010/11/23/how-to-make-bubble-charts/
//http://datasets.flowingdata.com/crimeRatesByState2005.tsv
var dataset = [
    { state: "Alabama",         population:  4627851,   murders: 8.2,   burglaries:  953.8 },
    { state: "Alaska",          population:   686293,   murders: 4.8,   burglaries:  622.5 },
    { state: "Arizona",         population:  6500180,   murders: 7.5,   burglaries:  948.4 },
    { state: "Arkansas",        population:  2855390,   murders: 6.7,   burglaries: 1084.6 },
    { state: "California",      population: 36756666,   murders: 6.9,   burglaries:  693.3 },
    { state: "Colorado",        population:  4861515,   murders: 3.7,   burglaries:  744.8 },
    { state: "Connecticut",     population:  3501252,   murders: 2.9,   burglaries:  437.1 },
    { state: "Delaware",        population:   873092,   murders: 4.4,   burglaries:  688.9 },
    { state: "Florida",         population: 18328340,   murders: 5,     burglaries:  926.3 },
    { state: "Georgia",         population:  9685744,   murders: 6.2,   burglaries:  931   },
    { state: "Hawaii",          population:  1288198,   murders: 1.9,   burglaries:  767.9 },
    { state: "Idaho",           population:  1523816,   murders: 2.4,   burglaries:  564.4 },
    { state: "Illinois",        population: 12901563,   murders: 6,     burglaries:  606.9 },
    { state: "Indiana",         population:  6376792,   murders: 5.7,   burglaries:  697.6 },
    { state: "Iowa",            population:  3002555,   murders: 1.3,   burglaries:  606.4 },
    { state: "Kansas",          population:  2802134,   murders: 3.7,   burglaries:  689.2 },
    { state: "Kentucky",        population:  4269245,   murders: 4.6,   burglaries:  634   },
    { state: "Louisiana",       population:  4410796,   murders: 9.9,   burglaries:  870.6 },
    { state: "Maine",           population:  1316456,   murders: 1.4,   burglaries:  478.5 },
    { state: "Maryland",        population:  5633597,   murders: 9.9,   burglaries:  641.4 },
    { state: "Massachusetts",   population:  6497967,   murders: 2.7,   burglaries:  541.1 },
    { state: "Michigan",        population: 10003422,   murders: 6.1,   burglaries:  696.8 },
    { state: "Minnesota",       population:  5220393,   murders: 2.2,   burglaries:  578.9 },
    { state: "Mississippi",     population:  2938618,   murders: 7.3,   burglaries:  919.7 },
    { state: "Missouri",        population:  5911605,   murders: 6.9,   burglaries:  738.3 },
    { state: "Montana",         population:   967440,   murders: 1.9,   burglaries:  389.2 },
    { state: "Nebraska",        population:  1783432,   murders: 2.5,   burglaries:  532.4 },
    { state: "Nevada",          population:  2600167,   murders: 8.5,   burglaries:  972.4 },
    { state: "New Hampshire",   population:  1315809,   murders: 1.4,   burglaries:  317   },
    { state: "New Jersey",      population:  8682661,   murders: 4.8,   burglaries:  447.1 },
    { state: "New Mexico",      population:  1984356,   murders: 7.4,   burglaries: 1093.9 },
    { state: "New York",        population: 19490297,   murders: 4.5,   burglaries:  353.3 },
    { state: "North Carolina",  population:  9222414,   murders: 6.7,   burglaries: 1201.1 },
    { state: "North Dakota",    population:   641481,   murders: 1.1,   burglaries:  311.9 },
    { state: "Ohio",            population: 11485910,   murders: 5.1,   burglaries:  872.8 },
    { state: "Oklahoma",        population:  3642361,   murders: 5.3,   burglaries: 1006   },
    { state: "Oregon",          population:  3790060,   murders: 2.2,   burglaries:  758.6 },
    { state: "Pennsylvania",    population: 12448279,   murders: 6.1,   burglaries:  451.6 },
    { state: "Rhode Island",    population:  1050788,   murders: 3.2,   burglaries:  494.2 },
    { state: "South Carolina",  population:  4479800,   murders: 7.4,   burglaries: 1000.9 },
    { state: "South Dakota",    population:   804194,   murders: 2.3,   burglaries:  324.4 },
    { state: "Tennessee",       population:  6214888,   murders: 7.2,   burglaries: 1026.9 },
    { state: "Texas",           population: 24326974,   murders: 6.2,   burglaries:  961.6 },
    { state: "Utah",            population:  2736424,   murders: 2.3,   burglaries:  606.2 },
    { state: "Vermont",         population:   621270,   murders: 1.3,   burglaries:  491.8 },
    { state: "Virginia",        population:  7769089,   murders: 6.1,   burglaries:  392.1 },
    { state: "Washington",      population:  6549224,   murders: 3.3,   burglaries:  959.7 },
    { state: "West Virginia",   population:  1814468,   murders: 4.4,   burglaries:  621.2 },
    { state: "Wisconsin",       population:  5627967,   murders: 3.5,   burglaries:  440.8 },
    { state: "Wyoming",         population:   532668,   murders: 2.7,   burglaries:  476.3 }
];
//Render the largest bubbles first, so no bubble ends up hidden behind a larger one:
dataset.sort(function(a, b) { return b.population - a.population });

function getX(d) { return d.murders*100; };
function getY(d) { return -d.burglaries/2; };
function getR(d) { return Math.sqrt(d.population)/100; };

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr('viewBox', '0,-650 1100,700');

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", getX)
    .attr("cy", getY)
    .attr("r", getR)
    .attr("class", "bubble")
    //http://stackoverflow.com/questions/25999162/title-attribute-not-working-for-an-svg-rect-on-safari
    //  .attr("title", function(d) { return d.state; })
    .append("title")
    .text(function(d) { return d.state; })
;


/** Label placement using
    https://github.com/d3fc/d3fc-label-layout **/

var labelPadding = 0;

// the component used to render each label
var textLabel = fc.layoutTextLabel()
                    .padding(labelPadding)
                    .value(function(d) { return d.state; });

// a strategy that combines simulated annealing with removal
// of overlapping labels
var strategy = fc.layoutAnnealing();//Greedy();//
//strategy = fc.layoutRemoveOverlaps(strategy);

// create the layout that positions the labels
var labels = fc.layoutLabel(strategy)
                .position(function(d) { return [getX(d), getY(d)]; })
                //*
                .size(function(d, i, g) {
                    if(d._dummy) { return [ getR(d)*1.4, getR(d)*1.4 ]; }

                    // measure the label and add the required padding
                    var textSize = d3.select(g[i])
                                     .select('text')
                                     .node()
                                     .getBBox();
                    return [
                        textSize.width  + labelPadding*2,
                        textSize.height + labelPadding*2
                    ];
                })
                //*/
                .placements(function(d, i, g) {
                    if(d._dummy) {
                        d3.select(g[i]).attr('data-dummy', 1);
                        return ['middle-center'];
                    }

                    var size = d3.select(g[i])
                                    .select('text')
                                    .node()
                                    .getBBox();
                    
                    var places = [{ x:10, y:-50, width:100, height:30, angle:10 }/*, 'middle-center'*/];
                    places = ['clock-1', 'clock-2', 'clock-3', 'clock-4', 'clock-5', /*'clock-6',*/ 'clock-7', 'clock-8', 'clock-9', 'clock-10', 'clock-11'/*, 'clock-12'*/,
                    /*places = [*/'bottom-right', 'bottom-left', 'top-left', 'top-right', 'middle-right', 'bottom-center', 'middle-left', 'top-center'];
                    places = ['middle-right', 'bottom-center', 'middle-left', 'top-center'];
                    //places = ['middle-center'];

                    //*
                    places = places.map(key => fc.parsePlacement(
                                                    key,
                                                    { x: getX(d), y: getY(d), radius: getR(d) },
                                                    { width: size.width + labelPadding*2, height: size.height + labelPadding*2 })
                                       );
                    //*/
                    return places;
                })
                .component(textLabel)
            ;

// render!
//Add dummy elements which will result in placeholder labels on top of the chart bubbles,
//so the real labels aren't rendered on top of a neighbor bubble:
var labelData = dataset.concat(dataset.map(x => Object.assign({ _dummy: true }, x, { state: 'XX' })));
svg.datum(labelData).call(labels);


/** Code to check the in-memory conversion to rotated polygons
    (for "clock-?" placements) **/
document.querySelectorAll('g')
        .forEach(g => g.parentNode
                        .appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
                        .setAttribute('d', 'M' + (g.getAttribute('data-poly') || '0,0'))
                );


setInterval(
    //() => svg.datum(dataset).call(labels),
    2000
);