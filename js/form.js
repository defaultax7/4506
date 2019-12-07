$(document).ready(function() {
  $(document).on("change", ".btn-file :file", function() {
    var input = $(this),
      label = input
        .val()
        .replace(/\\/g, "/")
        .replace(/.*\//, "");
    input.trigger("fileselect", [label]);
  });

  $(".btn-file :file").on("fileselect", function(event, label) {
    var input = $(this)
        .parents(".input-group")
        .find(":text"),
      log = label;

    if (input.length) {
      input.val(log);
      if ($(this).data("form") == "restaurant") {
        validateForm1();
      } else {
        validateForm2();
      }
    } else {
      if (log) alert(log);
    }
  });
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $("#img-upload").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  function readURL2(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $("#img-upload2").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  function readURL3(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $("#img-upload3").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imgInp").change(function() {
    readURL(this);
  });

  $("#imgNewMenu").change(function() {
    readURL3(this);
  });
  $("#branchImg").change(function() {
    readURL2(this);
  });
});

function onlyNum(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === "paste") {
    key = event.clipboardData.getData("text/plain");
  } else {
    // Handle key press
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

$("#cbIndoor").click(function(event) {
  if ($("#cbIndoor").prop("checked") || $("#cbOutdoor").prop("checked")) {
  } else {
    event.preventDefault();
  }
});

$("#cbOutdoor").click(function(event) {
  if ($("#cbIndoor").prop("checked") || $("#cbOutdoor").prop("checked")) {
  } else {
    event.preventDefault();
  }
});
