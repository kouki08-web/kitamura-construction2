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
            $("html, body").addClass("no-scroll");
        } else {
            $("html, body").removeClass("no-scroll");
        }
    });

    function closeMenu() {
        $(".hamburger").removeClass("is-active");
        $("#js-hamburger").attr("aria-expanded", false);
        $(".header-menu").removeClass("is-open");
        $("#js-overlay").removeClass("is-open");
        $("html, body").removeClass("no-scroll");
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
                pagetop.addClass("is-visible");
            } else {
                pagetop.removeClass("is-visible");
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
        $("html, body").addClass("no-scroll");
        pagetop.removeClass("is-visible");
    });

    function closeModal() {
        $("#js-modal").removeClass("is-open");
        $("html, body").removeClass("no-scroll");

        // CSSトランジション（0.4s）完了後にコンテンツをリセット
        setTimeout(function () {
            $("#js-modal-img").attr("src", MODAL_IMG_BLANK).attr("alt", "");
            $("#js-modal-title").text("");
        }, TRANSITION_MS);

        if ($(window).scrollTop() > 700) {
            pagetop.addClass("is-visible");
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
        5. 個人情報保護方針 カスタムスクロールバー（SP/iOS用）
       ============================================== */
    const policyBox      = document.getElementById('js-policy-box');
    const policyScrollbar = document.getElementById('js-policy-scrollbar');
    const policyThumb    = document.getElementById('js-policy-thumb');

    if (policyBox && policyScrollbar && policyThumb) {
        function updatePolicyScrollbar() {
            const scrollHeight  = policyBox.scrollHeight;
            const clientHeight  = policyBox.clientHeight;
            const scrollTop     = policyBox.scrollTop;
            const trackHeight   = policyScrollbar.clientHeight;
            const thumbHeight   = Math.max(30, (clientHeight / scrollHeight) * trackHeight);
            const maxScroll     = scrollHeight - clientHeight;
            const thumbTop      = maxScroll > 0 ? (scrollTop / maxScroll) * (trackHeight - thumbHeight) : 0;

            policyThumb.style.height = thumbHeight + 'px';
            policyThumb.style.top    = thumbTop + 'px';
        }

        policyBox.addEventListener('scroll', updatePolicyScrollbar);
        window.addEventListener('resize', updatePolicyScrollbar);
        setTimeout(updatePolicyScrollbar, 100);
    }

    /* ==============================================
        6. お問い合わせフォーム送信制御
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
