/*
 * Date Range functions
 */
/*
 * Date Range functions
 */




d3.csv( "src/flare.csv", function ( d ) {
    d.value = +d.value;
    if( d.value ) return d;
}, function ( error, classes ) {
    if( error ) throw error;
    bubbleChart( classes, "svg" );
} );

function bubbleChart( data, selector ) {
    let svg = d3.select( selector ).attr( "preserveAspectRatio", "xMinYMin meet" ).attr( "viewBox", "0 0 600 300" );

    let colorQuantizeScale = d3.scaleQuantize().domain( [ 1, 200 ] ).range( [ "#FF57BD", "#FF57BD", "#FF57BD", "#879ECE", "#6C81AC", "#008EDD", "#008EDD", "#2B4888", "#203F81", "#001E69" ] );
    let pack = d3.pack().size( [ 600, 300 ] ).padding( 1.5 );

    let format = d3.format( ",d" );

    let root = d3.hierarchy( {
        children: [{id: 'bla1', value: 100},{id: 'bla2', value: 130},{id: 'bla3', value: 160},{id: 'bla4', value: 200}]
    } ).sum( function ( d ) {
        return d.value;
    } ).each( function ( d ) {
        if( id = d.data.id ) {
            var id, i = id.lastIndexOf( "." );
            d.id = id;
            d.package = id.slice( 0, i );
            d.class = id.slice( i + 1 );
        }
    } );
    console.log(svg);

    let node = svg.selectAll( ".node" ).data( pack( root ).leaves() ).enter().append( "g" ).attr( "class", "node" ).attr( "transform", function ( d ) {
        return "translate(" + d.x + "," + d.y + ")";
    } );

    console.log(node);

    node.append( "circle" ).attr( "id", function ( d ) {
        return d.id;
    } ).attr( "r", function ( d ) {
        return d.r;
    } ).style( "fill", function ( d ) {
        let colr = colorQuantizeScale( d.value );
        console.log(colr);
        return colorQuantizeScale( d.value );
    } );

    node.append( "clipPath" ).attr( "id", function ( d ) {
        return "clip-" + d.id;
    } ).append( "use" ).attr( "xlink:href", function ( d ) {
        return "#" + d.id;
    } );

    node.append( "text" )
    .attr( "clip-path", function ( d ) {
        return "url(#clip-" + d.id + ")";
    } )
    .attr( "fill", "#ffffff" ).selectAll( "tspan" ).data( function ( d ) {
        return d.class.split( /(?=[A-Z][^A-Z])/g );
    } )
    .enter().append( "tspan" ).attr( "x", 0 ).attr( "y", function ( d, i, nodes ) {
        return 13 + ( i - nodes.length / 2 - 0.5 ) * 10;
    } )
    .text( function ( d ) {
        return d;
    } );

    node.append( "title" ).text( function ( d ) {
        return d.id + "\n" + format( d.value );
    } );
}
