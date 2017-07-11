var dataset = [
    {caption: "exists", value: 76},
    {caption: "missig", value: 24}
];

function donutChart() {
    var width = 300;
    var height = 300;
    var radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal(d3.schemeCategory20c);

    var svg = d3.select('#chart')
      .append('svg')
      .attr( "preserveAspectRatio", "xMinYMin meet" )
      .attr( "viewBox", "0 0 300 300")
      .attr( "width", "100%")
      .append('g')
      .attr('transform', 'translate(150, 150)');

    var donutWidth = 75;

    var arc = d3.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

    var pie = d3.pie().padAngle(.05).startAngle(-3 * Math.PI)
      .value(function(d) { return d.value; })
      .sort(null);

    var legendRectSize = 18;
            var legendSpacing = 4;

    var path = svg.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d, i) {
        return color(d.data.value);

      });
}

donutChart();
