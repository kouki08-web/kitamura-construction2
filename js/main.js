/* ==============================================
    ハンバーガーメニュー
   ============================================== */
$("#js-hamburger").on("click", function () {
    // ✅ 修正: aria-expanded を切り替え
    const isActive = $(".hamburger").toggleClass("is-active").hasClass("is-active");
    $(this).attr("aria-expanded", isActive);
    $(".header-menu").toggleClass("is-open");
    $("#js-overlay").toggleClass("is-open");
});

// 黒背景クリックでメニューを閉じる
$("#js-overlay").on("click", function () {
    $(".hamburger").removeClass("is-active").closest("#js-hamburger").attr("aria-expanded", false);
    $(".header-menu").removeClass("is-open");
    $(this).removeClass("is-open");
});

// ✅ 追加: モバイルナビのリンクをクリックしたらメニューを閉じる
$(".header-menu a").on("click", function () {
    $(".hamburger").removeClass("is-active");
    $("#js-hamburger").attr("aria-expanded", false);
    $(".header-menu").removeClass("is-open");
    $("#js-overlay").removeClass("is-open");
});

/* ==============================================
    Swiperスライダー
   ============================================== */
const swiper = new Swiper(".swiper", {
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

/* ==============================================
    ヘッダー: スクロールで背景を切り替える
   ============================================== */
$(window).on("scroll", function () {
    // ✅ 修正: .is-scrolled のCSSを style.scss に追記済み
    const fvHeight = $(".fv").innerHeight();
    if ($(this).scrollTop() > fvHeight - 80) {
        $(".header").addClass("is-scrolled");
    } else {
        $(".header").removeClass("is-scrolled");
    }
});

/* ==============================================
    スクロールでふわっと浮き出る（フェードイン）
   ============================================== */
// ✅ 修正: .fade-in（存在しないクラス）を参照していたコードを削除し、
//          正しいクラス .js-fade のみを対象にした処理に統一
$(window).on("scroll", function () {
    const windowHeight = $(window).height();
    const scroll = $(window).scrollTop();

    $(".js-fade").each(function () {
        const targetPosition = $(this).offset().top;
        if (scroll > targetPosition - windowHeight + 200) {
            $(this).addClass("is-visible");
        }
    });
});

/* ==============================================
    TOPに戻るボタンの表示・非表示制御
   ============================================== */
// ✅ 修正: 重複していた2つの scroll ハンドラをこの1つに統合
$(function () {
    const pagetop = $("#js-pagetop");

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 700) {
            pagetop.fadeIn(300);
        } else {
            pagetop.fadeOut(300);
        }
    });
});

/* ==============================================
    画像拡大モーダルの処理
   ============================================== */
// ✅ 修正: 3箇所に重複していたモーダルハンドラをこの1つに統合
$(function () {
    // モーダルを開く
    $(".js-modal-target").on("click", function () {
        const imgSrc  = $(this).data("modal-img");
        const title   = $(this).data("modal-title");

        $("#js-modal-img").attr("src", imgSrc).attr("alt", title);
        $("#js-modal-title").text(title);
        $("#js-modal").addClass("is-open");
        $("body").addClass("no-scroll");
        $("#js-pagetop").addClass("is-hidden");
    });

    // モーダルを閉じる（×ボタン または 黒い背景をクリック）
    $("#js-modal-close, #js-modal-bg").on("click", function () {
        $("#js-modal").removeClass("is-open");
        $("body").removeClass("no-scroll");
        $("#js-pagetop").removeClass("is-hidden");
        // 次回表示に備えて中身をリセット
        $("#js-modal-img").attr("src", "").attr("alt", "");
        $("#js-modal-title").text("");
    });
});

/* ==============================================
    お問い合わせフォーム送信制御
   ============================================== */
// ✅ 追加: action="#" によるページリロードを防止し、送信処理を制御
$(function () {
    $("#js-contact-form").on("submit", function (e) {
        e.preventDefault();

        // 必須項目のバリデーション（簡易）
        const name    = $("#name").val().trim();
        const email   = $("#email").val().trim();
        const message = $("#message").val().trim();

        if (!name || !email || !message) {
            alert("お名前・メールアドレス・内容は必須項目です。");
            return;
        }

        // ここにAjax送信処理などを記述する
        // 例: $.ajax({ url: '/send', method: 'POST', data: $(this).serialize(), ... });

        // 仮の送信完了メッセージ（実装後は削除してください）
        alert("送信が完了しました。３営業日以内にご連絡いたします。");
        this.reset();
    });
});