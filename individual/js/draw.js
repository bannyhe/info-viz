// Setup chart dimensions and margins
var margin = { top: 40, right: 40, bottom: 40, left: 40 };
var width = 300 - margin.left - margin.right;
var height = 240 - margin.top - margin.bottom;

// Setup scales - notice no domain, we'll do that on chart render
var x = d3.scaleLinear()
    .domain([0,1])
    .range([0, width]);
var y = d3.scaleLinear()
    .domain([0,4])
    .range([height, 0]);

var y1 = d3.scaleLinear()
    .domain([0,1])
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(5);

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(5);

var y1Axis = d3.axisLeft()
    .scale(y1)
    .ticks(5);

// Setup line generator
var line = d3.line()
  .x(function (d) { return x(d.x); })
  .y(function (d) { return y(d.y); });

// Setup svg element
var svg1 = d3.select('#one')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// Create axes
svg1.append('g')
  .attr('class', 'axis axis--x')
  .attr('transform', 'translate(0,' + height + ')')
  .call(xAxis);

svg1.append('g')
  .attr('class', 'axis axis--y')
  .call(yAxis);

svg1.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "Bold")
        .style("font-family", "Arial")
        .text("Player A Payoff");

svg1.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-family", "Arial")
    .style("font-size", "14px")
    .text("Payoff to A");

svg1.append("text")
    .attr("x", (width / 2))
    .attr("y", (height))
    .attr("dy", "2.5em")
    .style("text-anchor", "middle")
    .style("font-family", "Arial")
    .style("font-size", "14")
    .text("Probability A studies for math (a)");

var svg2 = d3.select('#two')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// Create axes
svg2.append('g')
  .attr('class', 'axis axis--x')
  .attr('transform', 'translate(0,' + height + ')')
  .call(xAxis);

svg2.append('g')
  .attr('class', 'axis axis--y')
  .call(yAxis);

svg2.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "Bold")
        .style("font-family", "Arial")
        .text("Player B Payoff");

svg2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-family", "Arial")
    .style("font-size", "14")
    .text("Payoff to B");

svg2.append("text")
    .attr("x", (width / 2))
    .attr("y", (height))
    .attr("dy", "2.5em")
    .style("text-anchor", "middle")
    .style("font-family", "Arial")
    .style("font-size", "14")
    .text("Probability B studies for math (b)");

var svg3 = d3.select('#three')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// Create axes
svg3.append('g')
  .attr('class', 'axis axis--x')
  .attr('transform', 'translate(0,' + height + ')')
  .call(xAxis);

svg3.append('g')
  .attr('class', 'axis axis--y')
  .call(y1Axis);

svg3.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-family", "Arial")
        .style("font-weight", "Bold")
        .text("Best Response");

svg3.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", ".7em")
    .style("text-anchor", "middle")
    .style("font-family", "Arial")
    .style("font-size", "14")
    .text("Probability B studies for math (b)");

svg3.append("text")
    .attr("x", (width / 2))
    .attr("y", (height))
    .attr("dy", "2.5em")
    .style("text-anchor", "middle")
    .style("font-family", "Arial")
    .style("font-size", "14")
    .text("Probability A studies for math (a)");

svg3.append("circle")
    .attr("cx",177)
    .attr("cy",96)
    .attr("r", 10)
    .style("fill", "yellow");


  // Draw chart
  function draw1() {
    // Grab slider values and update their <output /> tags
    var aNode = document.querySelector('#a');
    var a = aNode.value;
    aNode.parentNode.querySelector('output').textContent = a;
    var bNode = document.querySelector('#b');
    var b = bNode.value;
    bNode.parentNode.querySelector('output').textContent = b;

    // Construct the expection formulas
    var v1 = (Math.round((b*3)*10))/10;
    var v2 = (Math.round((2-b*2)*10))/10;
    var t1 = 'E(A)math = 3 * ' + b + ' + 0 * ' + (Math.round((1.0-b)*10))/10 + ' = ' + v1;
    var t2 = 'E(A)physics = 0 * ' + b + ' + 2 * ' + (Math.round((1.0-b)*10))/10 + ' = ' + v2;

    document.querySelector('#t1').textContent = t1;
    document.querySelector('#t2').textContent = t2;

    // Construct data from a, b, c
    var data = d3.range(0, 1, 0.01).map(function(v) {
      return {
        x: v,
        y: (v1-v2)*v+v2
      };
    });

    var d1 = d3.range(0, 1, 0.01).map(function(v) {
      return {
        x: a,
        y: (v1-v2)*v+v2
      };
    });

    // Get x,y extents
    var xMax = Math.abs(d3.max(data, function(d) { return d.x; }))
    var yMax = Math.abs(d3.max(data, function(d) { return d.y; }))

    // Set x,y domains
    x.domain([0, 1]);
    y.domain([0, 4]);

    // JOIN
    var paths = svg1.selectAll('path.line')
      .data([data]);

    // ENTER
    paths.enter().append('path')
      .attr('class', 'line')
      // ENTER + UPDATE
      .merge(paths)
      .transition()
      .duration(500)
      .attr('d', line);

  }

  function draw2() {
    // Grab slider values and update their <output /> tags
    var aNode = document.querySelector('#a');
    var a = aNode.value;
    aNode.parentNode.querySelector('output').textContent = a;

    // Construct the h1
    var v3 = (Math.round(a*10))/10;
    var v4 = (Math.round((4.0-a*4.0)*10))/10;
    var t3 = 'E(B)math = 1 * ' + a + ' + 0 * ' + (Math.round((1.0-a)*10))/10 + ' = ' + v3;
    var t4 = 'E(B)physics = 0 * ' + a + ' + 4 * ' + (Math.round((1.0-a)*10))/10 + ' = ' + v4;

    document.querySelector('#t3').textContent = t3;
    document.querySelector('#t4').textContent = t4;

    // Construct data from a, b, c
    var data = d3.range(0, 1, 0.01).map(function(v) {
      return {
        x: v,
        y: (v3-v4)*v+v4
      };
    });

    // Get x,y extents
    var xMax = Math.abs(d3.max(data, function(d) { return d.x; }))
    var yMax = Math.abs(d3.max(data, function(d) { return d.y; }))

    // Set x,y domains
    x.domain([0, 1]);
    y.domain([0, 4]);

    // JOIN
    var paths = svg2.selectAll('path.line')
      .data([data]);

    // ENTER
    paths.enter().append('path')
      .attr('class', 'line')
      // ENTER + UPDATE
      .merge(paths)
      .transition()
      .duration(500)
      .attr('d', line)
      .attr('stroke', 'steelblue');
  }

  function draw3() {
    // Grab slider values and update their <output /> tags
    var aNode = document.querySelector('#a');
    var a = aNode.value;
    aNode.parentNode.querySelector('output').textContent = a;
    var bNode = document.querySelector('#b');
    var b = bNode.value;
    bNode.parentNode.querySelector('output').textContent = b;

    // Construct the h1
    var v1 = (Math.round((b*3)*10))/10;
    var v2 = (Math.round((2-b*2)*10))/10;
    var t1 = 'E(A)math = 3 * ' + b + ' + 0 * ' + (Math.round((1.0-b)*10))/10 + ' = ' + v1;
    var t2 = 'E(A)physics = 0 * ' + b + ' + 2 * ' + (Math.round((1.0-b)*10))/10 + ' = ' + v2;

    document.querySelector('#t1').textContent = t1;
    document.querySelector('#t2').textContent = t2;

    // Construct data from a, b, c
    var data = d3.range(0, 1, 0.01).map(function(v) {
      return {
         x: a,
         y: 4*v
      };
    });

    // Get x,y extents
    var xMax = Math.abs(d3.max(data, function(d) { return d.x; }))
    var yMax = Math.abs(d3.max(data, function(d) { return d.y; }))

    // Set x,y domains
    x.domain([0, 1]);
    y.domain([0, 4]);

    svg3.append("line")
       .attr("x1", 0)
       .attr("y1", 96)
       .attr("x2", 210)
       .attr("y2", 96)
       .attr("stroke-width", 2)
       .attr("stroke", "steelblue");

     svg3.append("line")
        .attr("x1", 176)
        .attr("y1", 0)
        .attr("x2", 176)
        .attr("y2", 160)
        .attr("stroke-width", 2)
        .attr("stroke", "red");
    // JOIN
    var path = svg3.selectAll('path.line')
      .data([data]);

    // ENTER
    path.enter().append('path')
      .attr('class', 'line')
      .style("stroke-dasharray", ("8, 4"))
      // ENTER + UPDATE
      .merge(path)
      .transition()
      .duration(500)
      .attr('d', line);
  }

  // Draw the initial chart - this will also be called every time we update the sliders
  draw1();
  draw2();
  draw3();
