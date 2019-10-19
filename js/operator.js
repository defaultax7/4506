$(document).ready(function() {
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
            .hide("drop", 700);
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

                $(".reportNo").each(function() {
                    no = parseInt($(this).text());

                    if (no > 10000) {
                        $(this).css("color", "red");
                    } else if (no > 5000) {
                        $(this).css("color", "orange");
                    } else {
                        $(this).css("color", "green");
                    }
                });
            });
        }
    });
});