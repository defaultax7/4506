function getNumberFromString(mes) {
    return mes.replace(/[^0-9]/g, "");
}

async function showAlert(msg) {
    $("#errorModal #errorModalLabel").html(msg);
    await $("#errorModal")
        .css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 0,
            background: "rgba(0,0,0,.7)"
        })
        .promise();
    setTimeout(() => {
        $("#errorModal .trigger").addClass("drawn");
        $("#errorModal").addClass("show");
        $("body")
            .append('<div class="modal-backdrop fade"></div>')
            .css("overflow-y", "hidden")
            .promise();
    }, 150);
}

async function dismissModal() {
    let modal = await $(".modal.show").removeClass("show");
    setTimeout(() => {
        if (!$(modal).hasClass("show") && $(modal).hasClass("modal")) {
            $("body").css({ "overflow-y": "scroll" });
            $(modal).attr("style", "");
            $(".modal-backdrop")
                .last()
                .remove();
        }
        $("#errorModal .trigger").removeClass("drawn");
    }, 150);
}


$("#btnAlertOk").click(function() {
    dismissModal();
    window.location.href = "index2.html";
})


function searchText(cls, tbox) {
  let searchText = $("#"+tbox).val().toLowerCase();
  $("."+cls).each(function() {
      if ($(this).text().toLowerCase().indexOf(searchText) != -1) {
          $(this).fadeIn();
      }
      else {
          $(this).fadeOut();
      }
  })
  return false;

}
//function containsAll(needs, haystack){
    //for(var i = 0 , len = needs.length; i < len; i++){
      //// not find
        //if($.inArray(needs[i], haystack) == -1) return false;
    //}
  //return true;
//}
