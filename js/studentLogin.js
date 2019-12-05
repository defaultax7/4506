/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
  $("#loginForm").submit(function(e) {
    e.preventDefault();

    var form = $(this);
    var url = form.attr("action");
    $("#loadingAnimation").show();

    if ($("#id").val() === "123") {
      window.location = "operator.html";
    } else {
      setTimeout(function() {
        $("#mesToast .toast-body").text("Incorrect password");
        $("#mesToast").toast("show");
        $("#loadingAnimation").hide();
      }, 2000);
    }
  });
});
