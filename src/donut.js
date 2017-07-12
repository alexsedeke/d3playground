var dataset = [
    {caption: "exists", value: 76},
    {caption: "missig", value: 24}
];

function donutChart() {
    var width = 300;
    var height = 300;
    var radius = Math.min(width, height) / 2;

    var color = d3.scaleQuantize().domain( [ 1, 100 ] ).range( [ "#70D8ED", "#008EDD", "#008EDD", "#008EDD" ] );

    var svg = d3.select('#chart')
      .append('svg')
      .attr('text-anchor', 'middle')
      .attr( "preserveAspectRatio", "xMinYMin meet" )
      .attr( "viewBox", "0 0 300 300")
      .attr( "width", "100%")
      .append('g')
      .attr('transform', 'translate(150, 150)');

    var donutWidth = 75;

    var arc = d3.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

    var pie = d3.pie()
      .padAngle(.05)
      .startAngle(-3 * Math.PI)
      .value(function(d) { return d.value; })
      .sort(null);

    var path = svg.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d, i) {
        return color(d.data.value);
      });

    var legendRectSize = 18;
    var legendSpacing = 4;
    var legend = svg.selectAll('.legend')
      .data(dataset)
      .enter()
      .append('g')
      .attr('class', 'legend');

    legend.append('text')
      .attr('y', legendRectSize - legendSpacing)
      .attr("dy", ".35em")
      .text(function(d) { console.log(d); return d.caption; });
}

donutChart();
