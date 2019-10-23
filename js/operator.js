$(document).ready(function() {
  $("#restaurantInfo").hide();
  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").toggleClass("active");
  });
  $("#sidebarCollapse").click(function() {
    if ($(window).width() < 796 && !$("#sidebar").hasClass("active")) {
      $("#sidebar").addClass("active");
    }
    if ($("#sidebar").hasClass("active")) {
      $("#sidebar")
        .siblings("#content")
        .css("width", "calc(100% - " + $("#sidebar").css("width") + ")");
    } else {
      $("#sidebar")
        .siblings("#content")
        .css("width", "calc(100% - 250px)");
    }
  });
  $(window).on("resize", function() {
    if ($(this).width() < 796 && !$("#sidebar").hasClass("active")) {
      $("#sidebar").addClass("active");
    } else if ($(this).width() < 796 && $("#sidebar").hasClass("active")) {
      $("#sidebar")
        .siblings("#content")
        .css("width", "calc(100% - " + $("#sidebar").css("width") + ")");
    } else {
      $("#sidebar").removeClass("active");
      $("#sidebar")
        .siblings("#content")
        .css("width", "calc(100% - 250px)");
    }
  });
  $(".form").fadeIn(500);

  var dayLeft =
    getNumberFromString(
      moment()
        .endOf("month")
        .fromNow()
    ) *
      1 -
    1;

  var picker = new Lightpick({
    field: document.getElementById("btnFoundDate"),
    maxDate: moment()
      .endOf("month")
      .subtract(dayLeft, "day"),
    onSelect: function(date) {
      $("#foundDate").val(date.format("L"));
      validateForm1();
    }
  });

  $(".clockpicker").clockpicker({ autoclose: true });
  $(".clockpickerEn1d").clockpicker({ autoclose: true });

  $("img").click(function() {
    src = $(this).prop("src");
    $("#biggerImg").prop("src", src);
  });

  $(".mediaContainer").hide();

  delay = 0;
  $(".mediaContainer").each(function() {
    $(this)
      .delay(delay)
      .show("drop", { direction: "right" }, 700);
    delay += 200;
  });

  $(".mediaContainer div:nth-child(2) button:nth-child(2)").click(function() {
    $(this)
      .parent()
      .parent()
      .hide("drop", 700, function() {
        container = document.createElement("div");
        cc =
          "<div class='mediaContainer shadow-lg' id='mediaContainer1'>        <div class='media p-2' style='background-color: white;'>          <img            src='img/logo5.png'            class='align-self-start mr-3'            data-toggle='modal'            data-target='#exampleModalScrollable'            type='button'            alt='...'          />          <div class='media-body'>            <h5 class='mt-0'></h5>            <span class='reportNo' style='color : green'></span> reports            <ul>              <li></li>            </ul>          </div>        </div>        <div class='mediaBtn p-3'>          <button type='button' class='btn btn-primary'>            Update information          </button>          <button type='button' class='btn btn-danger'>Ignore</button>        </div>      </div> <div class='hspace-20'></div>";

        container.innerHTML = cc;
        container.classList.add("fullwidth");
        $(this)
          .parent()
          .append(container);

        container.childNodes[0].childNodes[1].childNodes[1].src = "img/mc.png";
        container.childNodes[0].childNodes[1].childNodes[3].childNodes[3].innerHTML =
          "3000";
        container.childNodes[0].childNodes[1].childNodes[3].childNodes[5].childNodes[1].innerHTML =
          "something is wrong";
      });
  });

  $("#pagination-demo").twbsPagination({
    totalPages: 3,
    visiblePages: 5,
    onPageClick: function(event, page) {
      $("#page-content").text("Page " + page);
      $.getJSON("data/restaurant.json", function(data) {
        $("#mediaContainer1 img").prop(
          "src",
          data.restaurantList[0 + (page - 1) * 3].img
        );
        $("#mediaContainer1 span").text(
          data.restaurantList[0 + (page - 1) * 3].report
        );
        $("#mediaContainer1 li").text(
          data.restaurantList[0 + (page - 1) * 3].reason
        );
        $("#mediaContainer1 h5").text(
          data.restaurantList[0 + (page - 1) * 3].name
        );

        if (data.restaurantList[1 + (page - 1) * 3] == null) {
          $("#mediaContainer2").css("visibility", "hidden");
        } else {
          $("#mediaContainer2").css("visibility", "visible");
          $("#mediaContainer2 img").prop(
            "src",
            data.restaurantList[1 + (page - 1) * 3].img
          );
          $("#mediaContainer2 span").text(
            data.restaurantList[1 + (page - 1) * 3].report
          );
          $("#mediaContainer2 li").text(
            data.restaurantList[1 + (page - 1) * 3].reason
          );
          $("#mediaContainer2 h5").text(
            data.restaurantList[1 + (page - 1) * 3].name
          );
        }

        if (data.restaurantList[2 + (page - 1) * 3] == null) {
          $("#mediaContainer3").css("visibility", "hidden");
        } else {
          $("#mediaContainer3").css("visibility", "visible");
          $("#mediaContainer3 img").prop(
            "src",
            data.restaurantList[2 + (page - 1) * 3].img
          );
          $("#mediaContainer3 span").text(
            data.restaurantList[2 + (page - 1) * 3].report
          );
          $("#mediaContainer3 li").text(
            data.restaurantList[2 + (page - 1) * 3].reason
          );
          $("#mediaContainer3 h5").text(
            data.restaurantList[2 + (page - 1) * 3].name
          );
        }

        $(".reportNo").each(function(element) {
          qtyAlert($(this));
        });
      });
    }
  });

  function qtyAlert(element) {
    no = parseInt(element[0].textContent);

    if (no > 10000) {
      element[0].style.color = "red";
    } else if (no > 5000) {
      element[0].style.color = "orange";
    } else {
      element[0].style.color = "green";
    }
  }

  $("#noResult").hide();

  $("#btnBroRes").click(function() {
    $("#reportedResContainer").hide();
    $("#restaurantInfo").fadeIn();
    $("#heading").text("Restaurant");
    $("body").data("mode", 2);
  });

  $("#btnReportedRes").click(function() {
    $("#reportedResContainer").fadeIn();
    $("#restaurantInfo").hide();
    $("#heading").text("Reported restaurants");
    $("body").data("mode", 1);
  });

  $("#btnSaveSetting").click(function() {
    if ($("#darkRadio").is(":checked")) {
      changeCSS("css/bootstrap-dark.css", 0);
    } else {
      changeCSS("css/bootstrap.min.css", 0);
    }
    $("#settingForm").modal("hide");
  });

  $("#editRes").click(function() {});

  $("#viewMenu").click(function() {});

  $("#viewBranch").click(function() {});

  function changeCSS(cssFile, cssLinkIndex) {
    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document
      .getElementsByTagName("head")
      .item(0)
      .replaceChild(newlink, oldlink);
  }

  $("#searchBar").keyup(function() {
    text = $(this).val();
    if ($("body").data("mode") == 1) {
      $.getJSON("data/restaurant.json", function(data) {
        count = 0;
        index1 = -1;
        index2 = -1;
        index3 = -1;
        for (i = 0; i < data.restaurantList.length; i++) {
          if (
            data.restaurantList[i].name
              .toUpperCase()
              .includes(text.toUpperCase())
          ) {
            if (index1 == -1) {
              index1 = i;
              count++;
            } else if (index2 == -1) {
              index2 = i;
              count++;
            } else if (index3 == -1) {
              index3 = i;
              count++;
            } else {
              count++;
            }
          }
        }
        if (count >= 3) {
          $("#reportedResContainer").show();
          $("#pagination-demo").show();
          $("#noResult").hide();

          $("#mediaContainer1").show();
          $("#mediaContainer1 img").prop(
            "src",
            data.restaurantList[index1].img
          );
          $("#mediaContainer1 span").text(data.restaurantList[index1].report);
          $("#mediaContainer1 li").text(data.restaurantList[index1].reason);
          $("#mediaContainer1 h5").text(data.restaurantList[index1].name);

          $("#mediaContainer2").show();

          $("#mediaContainer2 img").prop(
            "src",
            data.restaurantList[index2].img
          );
          $("#mediaContainer2 span").text(data.restaurantList[index2].report);
          $("#mediaContainer2 li").text(data.restaurantList[index2].reason);
          $("#mediaContainer2 h5").text(data.restaurantList[index2].name);

          $("#mediaContainer3").show();

          $("#mediaContainer3 img").prop(
            "src",
            data.restaurantList[index3].img
          );
          $("#mediaContainer3 span").text(data.restaurantList[index3].report);
          $("#mediaContainer3 li").text(data.restaurantList[index3].reason);
          $("#mediaContainer3 h5").text(data.restaurantList[index3].name);
        } else if (count == 2) {
          $("#reportedResContainer").show();
          $("#pagination-demo").show();
          $("#noResult").hide();

          $("#mediaContainer1").show();
          $("#mediaContainer1 img").prop(
            "src",
            data.restaurantList[index1].img
          );
          $("#mediaContainer1 span").text(data.restaurantList[index1].report);
          $("#mediaContainer1 li").text(data.restaurantList[index1].reason);
          $("#mediaContainer1 h5").text(data.restaurantList[index1].name);

          $("#mediaContainer2").show();

          $("#mediaContainer2 img").prop(
            "src",
            data.restaurantList[index2].img
          );
          $("#mediaContainer2 span").text(data.restaurantList[index2].report);
          $("#mediaContainer2 li").text(data.restaurantList[index2].reason);
          $("#mediaContainer2 h5").text(data.restaurantList[index2].name);

          $("#mediaContainer3").hide();
        } else if (count == 1) {
          $("#reportedResContainer").show();
          $("#pagination-demo").show();
          $("#noResult").hide();

          $("#mediaContainer1").show();
          $("#mediaContainer1 img").prop(
            "src",
            data.restaurantList[index1].img
          );
          $("#mediaContainer1 span").text(data.restaurantList[index1].report);
          $("#mediaContainer1 li").text(data.restaurantList[index1].reason);
          $("#mediaContainer1 h5").text(data.restaurantList[index1].name);

          $("#mediaContainer2").hide();
          $("#mediaContainer3").hide();
        } else {
          $("#reportedResContainer").hide();
          $("#pagination-demo").hide();
          $("#noResult").show();
        }
      });
    } else if ($("body").data("mode") == 2) {
      // view restaurant
    }
  });
});
