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

/* ==============================================
    画像拡大モーダルの処理
   ============================================== */

$(function () {
    // 画像またはテキストをタップした時（要件2）
    $('.js-modal-target').click(function () {
        
        // ★変更点：data-modal-img属性から専用の画像パスを取得する
        let targetImg = $(this).attr('data-modal-img');
        
        // ★変更点：もし専用画像が設定されていなければ、今まで通り中の画像(src)を使う（保険の処理）
        if (!targetImg) {
            targetImg = $(this).find('img').attr('src');
        }
        
        // モーダル内の img タグに取得した画像パスをセット
        $('#js-modal-img').attr('src', targetImg);
        
        // モーダルを表示
        $('#js-modal').addClass('is-open');
        
        // 背景をスクロールさせない（要件5）
        $('body').addClass('no-scroll');
        
        // TOPに戻るボタンを非表示（要件4）
        $('#js-pagetop').addClass('is-hidden');
    });

    // モーダルの薄暗い背景をタップした時（要件3）
    $('#js-modal-bg').click(function () {
        // モーダルを非表示
        $('#js-modal').removeClass('is-open');
        
        // 背景のスクロール制限を解除
        $('body').removeClass('no-scroll');
        
        // TOPに戻るボタンを再表示
        $('#js-pagetop').removeClass('is-hidden');
    });
});

$(function () {
    /* --- TOPボタンの表示・非表示 (要件5, 6) --- */
    const pagetop = $('#js-pagetop');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) { // FVの高さを目安に調整（例: 700px）
            pagetop.fadeIn(); // ふわっと出す
        } else {
            pagetop.fadeOut(); // 消す
        }
    });

    /* --- スクロールで浮き出るアニメーション (要件3) --- */
    $(window).scroll(function () {
        $('.fade-in').each(function () {
            const elemPos = $(this).offset().top;
            const scroll = $(window).scrollTop();
            const windowHeight = $(window).height();
            if (scroll > elemPos - windowHeight + 150) {
                $(this).addClass('is-visible');
            }
        });
    });
});

/* ==============================================
    スクロールでふわっと浮き出る（フェードイン）
   ============================================== */
$(window).scroll(function () {
    const windowHeight = $(window).height();
    const scroll = $(window).scrollTop();

    $('.js-fade').each(function () {
        const targetPosition = $(this).offset().top;
        // 画面の少し手前（200px）でアニメーションを開始させる
        if (scroll > targetPosition - windowHeight + 200) {
            $(this).addClass('is-visible');
        }
    });
});

/* ==============================================
    TOPに戻るボタンの表示・非表示制御
   ============================================== */
$(function () {
    const pagetop = $('#js-pagetop');
    
    // 最初はボタンを隠しておく（念のためJS側でも制御）
    pagetop.hide();

    $(window).scroll(function () {
        // スクロール量が 700px を超えたら表示（FVの高さに合わせて調整してください）
        if ($(this).scrollTop() > 700) {
            pagetop.fadeIn(300); // 0.3秒かけてフワッと出す
        } else {
            pagetop.fadeOut(300); // 0.3秒かけてフワッと消す
        }
    });
});

$(function() {
    $('.js-modal-target').on('click', function() {
        // クリックされた要素から画像とタイトルのデータを取得
        const modalImg = $(this).data('modal-img');
        const modalTitle = $(this).data('modal-title'); // タイトルを取得

        // モーダル内の要素にセット
        $('#js-modal-img').attr('src', modalImg);
        $('#js-modal-title').text(modalTitle); // テキストをセット

        // モーダルを表示
        $('#js-modal').addClass('is-open');
        $('body').addClass('no-scroll');
    });

    // 閉じる処理（背景クリック時）
    $('#js-modal-bg').on('click', function() {
        $('#js-modal').removeClass('is-open');
        $('body').removeClass('no-scroll');
        // 次回のために中身を空にしておく（任意）
        $('#js-modal-title').text('');
    });
});