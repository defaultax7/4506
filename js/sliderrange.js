  $(function() {
    $( "#slider-price" ).slider({
      range: true,
      min: 0,
      max: 50,
      values: [ 0, 50 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        $("#amount2").val("$" + ui.values[ 1 ]);
      }
    });
    // $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    //   " - $" + $( "#slider-range" ).slider( "values", 1 ) );
        $( "#amount" ).val( "$" + 0 + " - $" + 50 );
  });
