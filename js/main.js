$(function () {
    // ==========================================
    // ハンバーガーメニュー
    // ==========================================
    $("#js-hamburger").click(function () {
        $(".hamburger").toggleClass("is-active");
        $(".header-menu").toggleClass("is-open");
        $("#js-overlay").toggleClass("is-open");
    });

    $("#js-overlay").click(function () {
        $(".hamburger").removeClass("is-active");
        $(".header-menu").removeClass("is-open");
        $("#js-overlay").removeClass("is-open");
    });

    // ==========================================
    // Swiper の初期化
    // ==========================================
    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // ==========================================
    // モーダル処理（重複を解消して統合）
    // ==========================================
    $('.js-modal-target').on('click', function () {
        // data属性から画像とタイトルを取得
        let targetImg = $(this).data('modal-img');
        if (!targetImg) {
            targetImg = $(this).find('img').attr('src'); // 保険の処理
        }
        const targetTitle = $(this).data('modal-title');

        // モーダル内にセット
        $('#js-modal-img').attr('src', targetImg);
        $('#js-modal-title').text(targetTitle);

        // 表示・スクロール制御
        $('#js-modal').addClass('is-open');
        $('body').addClass('no-scroll');
        $('#js-pagetop').addClass('is-hidden'); // TOPボタンを隠す
    });

    // モーダルを閉じる処理
    $('#js-modal-close, #js-modal-bg').on('click', function () {
        $('#js-modal').removeClass('is-open');
        $('body').removeClass('no-scroll');
        $('#js-pagetop').removeClass('is-hidden');
        $('#js-modal-title').text(''); // 中身をリセット
    });

    // ==========================================
    // スクロールイベント（TOPボタン・フェードイン・ヘッダー背景）
    // ==========================================
    const pagetop = $('#js-pagetop');
    pagetop.hide(); // 初期状態は非表示

    $(window).on('scroll', function () {
        const scroll = $(window).scrollTop();
        const windowHeight = $(window).height();

        // 1. TOPに戻るボタンの表示制御
        if (scroll > 700) {
            pagetop.fadeIn(300);
        } else {
            pagetop.fadeOut(300);
        }

        // 2. フェードインアニメーション (.js-fade)
        $('.js-fade').each(function () {
            const targetPosition = $(this).offset().top;
            if (scroll > targetPosition - windowHeight + 200) {
                $(this).addClass('is-visible');
            }
        });

        // 3. ヘッダーの背景色変更
        const fvHeight = $('.fv').innerHeight();
        if (scroll > fvHeight - 80) {
            $('.header').addClass('is-scrolled');
        } else {
            $('.header').removeClass('is-scrolled');
        }
    });
});