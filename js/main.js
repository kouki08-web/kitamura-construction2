$(function () {
    const MODAL_IMG_BLANK = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    const TRANSITION_MS = 400;

    const pagetop = $("#js-pagetop");
    const header = $(".header");

    /* ==============================================
        1. ハンバーガーメニュー
       ============================================== */
    $("#js-hamburger").on("click", function () {
        const isActive = $(".hamburger").toggleClass("is-active").hasClass("is-active");
        $(this).attr("aria-expanded", isActive);
        $(".header-menu").toggleClass("is-open");
        $("#js-overlay").toggleClass("is-open");

        if (isActive) {
            $("body").addClass("no-scroll");
        } else {
            $("body").removeClass("no-scroll");
        }
    });

    function closeMenu() {
        $(".hamburger").removeClass("is-active");
        $("#js-hamburger").attr("aria-expanded", false);
        $(".header-menu").removeClass("is-open");
        $("#js-overlay").removeClass("is-open");
        $("body").removeClass("no-scroll");
    }

    $("#js-overlay, .header-menu a").on("click", function () {
        closeMenu();
    });

    /* ==============================================
        2. Swiperスライダー
       ============================================== */
    const swiper = new Swiper(".swiper", {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });

    /* ==============================================
        3. スクロール連動イベント
       ============================================== */
    $(window).on("scroll", function () {
        const scroll = $(this).scrollTop();
        const windowHeight = $(window).height();
        const fvHeight = $(".fv").innerHeight();

        // FVが完全に画面外に消えたらヘッダーに背景色を付与
        if (scroll > fvHeight) {
            header.addClass("is-scrolled");
        } else {
            header.removeClass("is-scrolled");
        }

        $(".js-fade").each(function () {
            const targetPosition = $(this).offset().top;
            if (scroll > targetPosition - windowHeight + 200) {
                $(this).addClass("is-visible");
            }
        });

        // TOPに戻るボタンの表示制御
        if (!$("body").hasClass("no-scroll")) {
            if (scroll > 700) {
                pagetop.stop().fadeIn(600);
            } else {
                pagetop.stop().fadeOut(600);
            }
        }
    });

    pagetop.on("click", function () {
        $("body,html").animate({ scrollTop: 0 }, 500);
        return false;
    });

    /* ==============================================
        4. 画像拡大モーダルの処理
           CSSトランジションのみで制御（fadeIn/fadeOut との混在を避ける）
       ============================================== */
    $(".js-modal-target").on("click", function () {
        const imgSrc = $(this).data("modal-img");
        const title  = $(this).data("modal-title");

        $("#js-modal-img").attr("src", imgSrc).attr("alt", title);
        $("#js-modal-title").text(title);

        $("#js-modal").addClass("is-open");
        $("body").addClass("no-scroll");
        pagetop.stop().fadeOut(300);
    });

    function closeModal() {
        $("#js-modal").removeClass("is-open");
        $("body").removeClass("no-scroll");

        // CSSトランジション（0.4s）完了後にコンテンツをリセット
        setTimeout(function () {
            $("#js-modal-img").attr("src", MODAL_IMG_BLANK).attr("alt", "");
            $("#js-modal-title").text("");
        }, TRANSITION_MS);

        if ($(window).scrollTop() > 700) {
            pagetop.stop().fadeIn(400);
        }
    }

    $("#js-modal-close, #js-modal-bg").on("click", function () {
        closeModal();
    });

    // Escキーでモーダルを閉じる
    $(document).on("keydown", function (e) {
        if (e.key === "Escape" && $("#js-modal").hasClass("is-open")) {
            closeModal();
        }
    });

    // ページ読み込み時にスクロール位置を確認してフェードイン・ヘッダーを初期化
    $(window).trigger("scroll");

    /* ==============================================
        5. お問い合わせフォーム送信制御
       ============================================== */
    $("#js-contact-form").on("submit", function (e) {
        e.preventDefault();

        const name    = $("#name").val().trim();
        const email   = $("#email").val().trim();
        const message = $("#message").val().trim();

        if (!name || !email || !message) {
            alert("お名前・メールアドレス・内容は必須項目です。");
            return;
        }

        alert("送信が完了しました。３営業日以内にご連絡いたします。");
        this.reset();
    });
});
