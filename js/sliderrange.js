  $(function() {
    $( "#slider-price" ).slider({
      range: true,
      min: 0,
      max: 30,
      values: [ 0, 30 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        $("#amount1").val(ui.values[ 0 ]);
        $("#amount2").val(ui.values[ 1 ]);
      }
    });
    // $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    //   " - $" + $( "#slider-range" ).slider( "values", 1 ) );
        $( "#amount" ).val( "$" + 0 + " - $" + 50 );
  });
