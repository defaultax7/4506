$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    $("#sidebarCollapse").click(function () {
        if ($(window).width() < 796 && !$("#sidebar").hasClass("active")) {
            $('#sidebar').addClass('active');
        }
        if ($("#sidebar").hasClass('active')) {
            $("#sidebar").siblings("#content").css("width", "calc(100% - " + $("#sidebar").css("width") + ")");
        }
        else {
            $("#sidebar").siblings("#content").css("width", "calc(100% - 250px)");
        }
    });
    $(window).on('resize', function () {
        if ($(this).width() < 796 && !$("#sidebar").hasClass("active")) {
            $('#sidebar').addClass('active');
        }
        else if ($(this).width() < 796 && $("#sidebar").hasClass('active')) {
            $("#sidebar").siblings("#content").css("width", "calc(100% - " + $("#sidebar").css("width") + ")");
        }
        else {
            $('#sidebar').removeClass('active');
            $("#sidebar").siblings("#content").css("width", "calc(100% - 250px)");
        }
    });
});
