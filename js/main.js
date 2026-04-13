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

const swiper = new Swiper('.swiper', {
    loop: true, // 無限ループさせる
    autoplay: {
        delay: 4000, // 4秒（4000ミリ秒）ごとに自動スライド
        disableOnInteraction: false, // 矢印をクリックした後も自動再生を止めない
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});