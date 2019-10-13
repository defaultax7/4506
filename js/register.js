$("#registerNext").click(() => {
  $("#registerNext").attr("disabled", true);
  step = $("#addNewRestaurantFrom").data("step");
  if (step === 2) {
    return showAlert(
      "Restaurant is added successfully"
    );
  } else {
    $("#registerBack").show();
    step++;
    if (step > 2) {
      $("#registerNext").text("Complete");
      $("#acInfo").html(`Username: ${$("#username").val()}<br />
          Email: ${$("#email").val()}
        `);
      $("#personalInfo").html(`Name: ${$("#firstname").val()}${$(
        "#lastname"
      ).val()}<br />
          Mobile Phone: ${$("#phone").val()}<br />
          Birth Date: ${$("#date").val()}<br />
          Gender: ${$("#gender:checked").val()}
        `);
      if ($("#agreeTos:checked").length > 0) {
        $("#registerNext").attr("disabled", false);
      }
    }
    $(".step.active")
      .removeClass("active")
      .addClass("disabled");
    $(".steps")
      .children()
      .eq(step - 1)
      .removeClass("disabled")
      .addClass("active");
    $("#formS1, #formS2").hide();
    $("#formS" + step).show();
    $("#registerBox").data("step", step);
  }
});

function validateForm1() {
  $("#registerNext").attr("disabled", true);
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
    $("#registerNext").attr("disabled", false);
  }
}

$("#restaurantName").keyup(() => {
  validateForm1();
});

$('#registerBack').click(() => {
  let step = $('#registerBox').data('step')

  // $('#registerNext').text('Next')
  // $('#registerBack').attr('disabled', false)
  // $('#registerNext').attr('disabled', true)
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
})

$("#formS2").hide();
