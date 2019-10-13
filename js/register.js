$("#btnNext").click(() => {
  step = $('#addNewRestaurantFrom').data('step');
  step++;
  $(".step.active")
    .removeClass("active")
    .addClass("disabled");
  $(".steps")
    .children()
    .eq(step)
    .removeClass("disabled")
    .addClass("active");
  $(".carousel").carousel("next");
  $('#addNewRestaurantFrom').data('step', step)
});

$("#btnComplete").click(function(){
  showAlert("Added successfully");
})

function validateForm1() {
  $("#btnNext").attr("disabled", true);
  (restaurantName = $("#restaurantName").val()),
    (foundDate = $("#foundDate").val()),
    (valid = true);

  if ($("#restaurantName").val() == "") {
    valid = false;
  }
  if ($("#foundDate").val() == "") {
    valid = false;
  }
  if ($("#imageName").val() == "") {
    valid = false;
  }
  if (valid) {
    $("#error").hide();
    $("#btnNext").attr("disabled", false);
  }
}

$("#restaurantName").keyup(() => {
  validateForm1();
});

$("#registerBack").click(() => {
  let step = $("#registerBox").data("step");

  // $('#btnNext').text('Next')
  // $('#registerBack').attr('disabled', false)
  // $('#btnNext').attr('disabled', true)
  // step--
  // if (step <= 1) {
  //   $('#registerBack').attr('disabled', true)
  //   step = 1
  // }
  // $('.step.active').removeClass('active').addClass('disabled')
  // $('.steps').children().eq(step - 1).removeClass('disabled').addClass('active')
  // $('#step1, #step2, #step3').hide()
  // $('#step' + step).show()
  // $('#registerBox').data('step', step)
  // verifyForm(step)
});

$("#formS2").hide();

$(".carousel").carousel();
$(".carousel").carousel("pause");

$("#btnBack").click(function(){
  step = $('#addNewRestaurantFrom').data('step');
  step--;
  $(".step.active")
    .removeClass("active")
    .addClass("disabled");
  $(".steps")
    .children()
    .eq(step)
    .removeClass("disabled")
    .addClass("active");
  $(".carousel").carousel("prev");
  $('#addNewRestaurantFrom').data('step', step)
})

