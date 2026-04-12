$("#js-hamburger").click(function () {
    $(".hamburger").toggleClass("is-active");
    $(".header-menu").toggleClass("is-open");
    $("#js-overlay").toggleClass("is-open");
});
/* 黒背景クリックでメニューを閉じる */
$("#js-overlay").click(function () {
    $(".hamburger").removeClass("is-active");
    $(".header-menu").removeClass("is-open");
    $("#js-overlay").removeClass("is-open");
});