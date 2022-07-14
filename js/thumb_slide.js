function activateThumbs(i_thumbContainer)
{


    // Activate links
    var $thumbContainer = $(i_thumbContainer);
    var count = 0;

// modified to be compatible with brands where thumbSlides aren't all
// siblings
    $thumbContainer.find(".thumbSlide").each(function() {
        var slideNo = count++;

        if ($(this).hasClass("face")) {
            // Setup perfect scroll for details pane (candidate is for teams, alternative for brands)
            var candidateScrollArea = $("#detail").children(".detailSlide").eq(slideNo).find('.bio');
            var scrollArea = candidateScrollArea.length>0? candidateScrollArea[0] : $("#detail").children(".detailSlide").eq(slideNo)[0];
            var ps = new PerfectScrollbar(scrollArea, {
              suppressScrollX: true
            });
            window.addEventListener("resize", function() { ps.update(); }, false);

            $(this).on("click", function (i_event) {
                $thumbContainer.find(".thumbSlide").removeClass("selected");
                $(this).addClass("selected");

                var $detailContainer = $("#detail");
                $detailContainer.addClass("show");

                $detailContainer.children(".detailSlide").hide();
                var $selectedDetailSlide = $detailContainer.children(".detailSlide").eq(slideNo);
                
                scrollArea.scrollTop = 0;

                $selectedDetailSlide.show();

                $detailContainer.find(".overlay").removeClass("show");
                $selectedDetailSlide.find(".overlay").addClass("show");

                i_event.preventDefault();

        });
        }

    });

    var isMobileLayout = $('.closeButton').css('display') == 'block';

    if (!isMobileLayout)
    {
        $thumbContainer.find(".thumbSlide").first(
        ).click();
    }
}

document.addEventListener("DOMContentLoaded", function (i_event) {
    activateThumbs(document.getElementById("thumbs"));


    var urlAnchor = window.location.hash.substr(1);
    var index = parseInt(urlAnchor);
    var thumbSlides = $(".thumbSlide");
    if (0<index && index < thumbSlides.length)
    {
        thumbSlides[index].click();
    }

    $('.closeButton').click(function() {
        $('.detail').removeClass('show');
    });

    // scrollbar for thumbs:

            // Setup perfect scroll for details pane
        var scrollArea = $(".thumbs")[0];
        var ps = new PerfectScrollbar(scrollArea, {
          suppressScrollX: true
        });
        window.addEventListener("resize", function() { ps.update(); }, false);

});