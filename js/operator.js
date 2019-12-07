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

  $("#editMeanBtn").click(function(){
    
  });

  $(".clockpicker").clockpicker({ autoclose: true });
  $(".clockpickerEnd").clockpicker({ autoclose: true });

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

            pagi =  $(this)
            .parent().children()
            .eq(8);

            $(this).parent().children().eq(8).remove();
        $(this)
          .parent()
          .append(container);

          pagi =  $(this)
            .parent()
            .append(pagi);

        container.childNodes[0].childNodes[1].childNodes[1].src = "img/mc.png";
        container.childNodes[0].childNodes[1].childNodes[3].childNodes[3].innerHTML =
          "3000";
        container.childNodes[0].childNodes[1].childNodes[3].childNodes[5].childNodes[1].innerHTML =
          "something is wrong";
      });

    $("#pagination-demo").twbsPagination("destroy");
    $("#pagination-demo").twbsPagination({ totalPages: 2 });
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

  $("#pagination-res").twbsPagination({
    totalPages: 2,
    visiblePages: 5,
    onPageClick: function(event, page) {
      if (page == 1) {
        $("#resPage2").hide();
        $("#resPage1").show();
      }
      if (page == 2) {
        $("#resPage1").hide();
        $("#resPage2").show();
      }
    }
  });

  $("#btnComfirmEditReported").click(function() {
    alert("aaa");
  });

  $(".topLoadingBar").animate({ width: "100%" }, 800, function() {
    $(this).hide();
  });

  $("#branchPage").hide();


  function qtyAlert(element) {
    no = parseInt(element[0].textContent);

    if (no > 10000) {
      element[0].style.color = "red";
    } else if (no > 5000) {
      element[0].style.color = "orange";
    } else {
      element[0].style.color = "green";
    }
  };

  $("#btnCloseFullRes").click(function(){
      $("#fullRes").animate({width : "275px"},500,function(){
          $("#fullRes").hide();
          $(".smoke").hide();
          $("html").css("overflow","scroll");
      });
  })
  

  $("#fullResBtn").click(function(){
      t = $(this).parent().position().top;
      l = $(this).parent().position().left;
      h = $(this).parent().height();
      w = $(this).parent().width();
      $("#fullRes").css('top' , t);
      $("#fullRes").css('left' , l);
      $("#fullRes").css('height' , h + 50);
      $("#fullRes").css('width' , w);
      $("#fullRes").show();
      $("#fullRes").animate({width : '900px'} , 500);
    //   $("#fullResImg").animate({ left : "20px"}, 500);
      $("html").css("overflow","hidden");
      $(".smoke").show();
  });

  hided = true;
  $(".btnHideMenu").click(function() {
    if (hided) {
      $(this)
        .parent()
        .parent()
        .css({ opacity: 0.5 });
      $(this).text("Show");
      $(this).removeClass("btn-danger");
      $(this).addClass("btn-success");
    } else {
      $(this)
        .parent()
        .parent()
        .css({ opacity: 1 });
      $(this).text("Hide");
      $(this).removeClass("btn-success");
      $(this).addClass("btn-danger");
    }
    hided = !hided;
  });

  $("#noResult").hide();

  $("#btnBroRes").click(function() {
    $("#reportedResContainer").hide();
    $("#restaurantInfo").fadeIn();
    $("#noResult").hide();
    $("body").data("mode", 2);
    $("#pagination-res li:first-child").click();
  });

  $("#btnReportedRes").click(function() {
    $("#reportedResContainer").fadeIn();
    $("#restaurantInfo").hide();
    $("#noResult").hide();
    $("body").data("mode", 1);
    $("#pagination-demo li:first-child").click();
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

  $("#viewMenu").click(function() {
    $("#breadcurmb li").removeClass("active");
    $("#breadcurmb").append(
      "<li class='breadcrumb-item active' aria-current='page'> Menu </li>"
    );
    $("#menuPage").show();
    $("#resPage").hide();
    $("#btnAddRes").hide();
    $("#btnAddMenu").show();
  });

  $("#rootBread").click(function() {
    $("#breadcurmb li").addClass("active");
    $("#breadcurmb li")[1].remove();
    $("#menuPage").hide();
    $("#resPage").show();
    $("#btnAddRes").show();
    $("#btnAddMenu").hide();
    $("#btnAddBranch").hide();
    $("#branchPage").hide();
  });

  $("#btnAddMenu").hide();

  $("#viewBranch").click(function() {
    $("#breadcurmb li").removeClass("active");
    $("#breadcurmb").append(
      "<li class='breadcrumb-item active' aria-current='page'> Branch </li>"
    );
    $("#resPage").hide();
    $("#btnAddRes").hide();
    $("#btnAddMenu").hide();
    $("#branchPage").show();
    $("#btnAddBranch").show();
  });

  $("#btnAddBranch").hide();

  $("#menuPage").hide();

  $("#whiteScreen")
    .show(3000)
    .delay(1000)
    .fadeOut(500);

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

  $("#cb247").click(function() {
    if ($(this).is(":checked")) {
      $("#startTimeEdit").attr("disabled", "disabled");
      $("#endTimeEdit").attr("disabled", "disabled");
    } else {
      $("#startTimeEdit").removeAttr("disabled");
      $("#endTimeEdit").removeAttr("disabled");
    }
  });

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
