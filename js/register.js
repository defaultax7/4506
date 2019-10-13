$("#registerNext").click(() => {
  $("#registerNext").attr("disabled", true);
  step = $("#registerBox").data("step");
  if (step === 2) {
    setTimeout("window.location = 'index.html'", 2000);
    return showAlert(
      "Account registeration successful.<br/>Auto redirect in 3 seconds."
    );
  } else {
    $("#registerBack").attr("disabled", false);
    step++;
    if (step > 2) {
      $("#registerNext").text("Submit");
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
    $("#step1, #step2, #step3").hide();
    $("#step" + step).show();
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
