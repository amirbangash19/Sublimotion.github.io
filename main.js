

function window_onResize()
{

}
window.addEventListener("resize", window_onResize, false);
window_onResize();


// + Menu {{{

function menu_setup(i_initialUrl)
{
    //console.log($menuElement.find(".menuItems").height());

    // Activate links
    var $menu = $("#menu");
    $menu.find("a").bind("click", function (i_event) {
        i_event.preventDefault();

        //
        //$(this).parents("li:eq(0)").siblings().removeClass("selected");
        //$(this).parents("li:eq(0)").addClass("selected");

        menu_select($(i_event.target).closest("a")[0].getAttribute("href"));
    });

    // Select initial menu item
    $menu.find('a[href="' + i_initialUrl + '"]').addClass("selected");

    var isMobile = $('.hamburger').css('display') == 'block';
    $('.hamburger').click(function() {
        // console.log('hamburger click');
        $('.hamburger').toggleClass('opened');
        if ($('.hamburger').hasClass('opened')) {
            $('#menu').addClass('show');
        } else {
            $('#menu').removeClass('show');
        }
    });
    $('.menuItem').click(function() {
        $('.hamburger').removeClass('opened');
        $('#menu').removeClass('show');

    })
}

function menu_select(i_url)
{
    var $menu = $("#menu");

    //
    var $selectingLink = $menu.find('a[href="' + i_url + '"]');
    if ($selectingLink.length > 0)
    {
        $selectingLink.closest("a").siblings().removeClass("selected");
        $selectingLink.closest("a").addClass("selected");
    }

    //
    if ((i_url == g_subpage_currentUrl && g_subpage_goingToUrl == null) || i_url == g_subpage_goingToUrl)
        return;

    slideToSubpage(i_url, function () {
        /*
        var backgroundAudioElement = document.getElementById("backgroundAudio");

        if (i_url == "the_gastronomic_performance.html")
        {
            dan.movement.animate(1, function (i_progress) {
                backgroundAudioElement.volume = 1 - i_progress;

                if (i_progress == 1)
                    backgroundAudioElement.pause();
            });
        }
        else
        {
            backgroundAudioElement.play();
            dan.movement.animate(1, function (i_progress) {
                backgroundAudioElement.volume = i_progress;

                if (i_progress == 1)
                    backgroundAudioElement.volume = 1;
            });
        }
        */

        if (document.getElementById("subpageContent").getElementsByTagName("iframe")[0].contentWindow.startCode)
            document.getElementById("subpageContent").getElementsByTagName("iframe")[0].contentWindow.startCode();
    });
}

function menu_positionOfUrl(i_url)
// Get the position in the menu of the link that has a particular URL.
//
// Params:
//  i_url:
//   (string)
//
// Returns:
//  (integer number)
//  -1: No link was found that points to i_url
{
    var subpages = $("#menu a").map(function (i_index, i_element) {
        return i_element.getAttribute("href");
    }).toArray();

    return subpages.indexOf(i_url);
}

function menu_urlAtPosition(i_position)
// Get the URL of the link that is at a particular position in the menu.
//
// Params:
//  i_position:
//   (integer number)
//
// Returns:
//  (string)
{
    var subpages = $("#menu a").map(function (i_index, i_element) {
        return i_element.getAttribute("href");
    }).toArray();

    return subpages.indexOf(i_url);
}

function menu_adjacentUrl(i_fromUrl, i_direction)
// Get the URL of the link that is before or after the link that has a particular URL.
//
// Params:
//  i_fromUrl:
//   (string)
//  i_direction:
//   (integer number)
//   -1: Get the link that is before i_fromUrl
//   1: Get the link that is after i_fromUrl
//
// Returns:
//  Either (string)
//  or (null)
//   There was no previous link (before the first) or next link (after the last),
//   or i_fromUrl was not found.
{
    var subpages = $("#menu a").map(function (i_index, i_element) {
        return i_element.getAttribute("href");
    }).toArray();

    var fromPosition = subpages.indexOf(i_fromUrl);
    if (fromPosition == -1)
        return null;

    fromPosition += i_direction;
    if (fromPosition < 0 || fromPosition >= subpages.length)
        return null;

    return subpages[fromPosition];
}

// + }}}

function window_onKeyDown(i_event)
{
    //console.log(i_event.key);
    if (i_event.key == "PageDown" || i_event.key == "ArrowRight")
    {
        var adjacentUrl = menu_adjacentUrl(g_subpage_goingToUrl || g_subpage_currentUrl, 1);
        if (adjacentUrl)
            menu_select(adjacentUrl);
    }
    else if (i_event.key == "PageUp" || i_event.key == "ArrowLeft")
    {
        var adjacentUrl = menu_adjacentUrl(g_subpage_goingToUrl || g_subpage_currentUrl, -1);
        if (adjacentUrl)
            menu_select(adjacentUrl);
    }

}
function window_onWheel(i_event)
{
    /*
    var direction = (i_event.detail < 0 || i_event.wheelDelta > 0) ? 1 : -1;
    console.log(direction);
    */
}

document.addEventListener("DOMContentLoaded", function (i_event) {
    var initialUrl = "booking.html";
    //var initialUrl = "team.html";

// Allow subpage to be selected by adding an anchor to the url
    var urlAnchor = window.location.hash.substr(1);
    switch (urlAnchor) {
        case 'booking':
        case 'the_gastronomic_performance':
        case 'concept':
        case 'the_chef':
        case 'team':
        case 'brands':
        case 'contact':
            initialUrl = urlAnchor+".html";
        break;
    }



    menu_setup(initialUrl);

    goToSubpage(initialUrl, 0, function () {
        if (document.getElementById("subpageContent").getElementsByTagName("iframe")[0].contentWindow.startCode)
            document.getElementById("subpageContent").getElementsByTagName("iframe")[0].contentWindow.startCode();
    });

    //
    window.addEventListener("keydown", function (i_event) {
        window_onKeyDown(i_event);
    }, false);
    window.addEventListener("wheel", function (i_event) {
        window_onWheel(i_event);
    }, false);

    // Perfect scrollbar - for narrow viewports on the menu
    var ps = new PerfectScrollbar('#menu', {
      suppressScrollY: true
    });
    window.addEventListener("resize", function() { ps.update(); }, false);


});

/*
window.addEventListener("hashchange", function (i_event) {
    alert("hashchange: " + window.location);
});

window.addEventListener("popstate", function (i_event) {
    alert("popstate: " + i_event.state);
});
*/


function slideToSubpage(i_url, i_onDone)
// Go to a subpage, choosing which direction to slide in according to the content of the menu
//
// Params:
//  i_url:
//   (string)
//  i_onDone:
//   Either (function)
//    Function to call when done
//    Function has:
//     Params:
//      -
//     Returns:
//      -
//   or (null or undefined)
//    Don't call a function when done
{
    //var currentSubpagePathname = window.location.pathname.slice(1);
    var currentSubpagePathname = document.getElementById("subpageContent").getElementsByTagName("iframe")[0].src;
    currentSubpagePathname = currentSubpagePathname.slice(currentSubpagePathname.lastIndexOf("/") + 1);
    var currentSubpagePosition = menu_positionOfUrl(currentSubpagePathname);

    var newSubpagePosition = menu_positionOfUrl(i_url);

    var slide = 0;
    if (newSubpagePosition > currentSubpagePosition)
        slide = 1;
    else if (newSubpagePosition < currentSubpagePosition)
        slide = -1;

    //
    goToSubpage(i_url, slide, i_onDone);
}

var g_subpage_currentUrl = null;
var g_subpage_goingToUrl = null;

function goToSubpage(i_url, i_slide, i_onDone)
// Params:
//  i_url:
//   (string)
//  i_slide:
//   Either (integer number)
//    0: No slide
//    1: Slide in from right
//    -1: Slide in from left
//   or (null or undefined)
//    Use default of 0.
//  i_onDone:
//   Either (function)
//    Function to call when iframe is loaded and fully visible
//    Function has:
//     Params:
//      -
//     Returns:
//      -
//   or (null or undefined)
//    Don't call a function when done
{
    // Apply default arguments
    if (!i_slide)
        i_slide = 0;

    g_subpage_goingToUrl = i_url;

    // Pause audio. Page will resume it if applicable
    suspendAudio();
    //
    //history.pushState(null, "", i_url);

    // If we're starting with more than one subpage already (ie. in middle of transition)
    // remove all but the last for sanity
    var oldSubpages = document.getElementsByClassName("subpageContent");
    for (var subpageNo = 0; subpageNo < oldSubpages.length - 1; ++subpageNo)
    {
        oldSubpages[subpageNo].parentNode.removeChild(oldSubpages[subpageNo]);
    }

    //
    var oldContent = document.getElementById("subpageContent");
    if (oldContent)
    {
        oldContent.id = "";

        // Ask document in iframe to stop running any heavy code
        if (oldContent.getElementsByTagName("iframe")[0].contentWindow.stopCode)
            oldContent.getElementsByTagName("iframe")[0].contentWindow.stopCode();
    }

    var newContent = document.createElement("div");
    newContent.id = "subpageContent";
    newContent.setAttribute("class", "subpageContent");
    newContent.style.position = "absolute";
    newContent.style.left = "0";
    newContent.style.top = "0";
    newContent.style.width = "100%";
    newContent.style.height = "100%";
    if (i_slide != 0)
        newContent.style.visibility = "hidden";

    var contentIframe = document.createElement("iframe");
    contentIframe.style.width = "100%";
    contentIframe.style.height = "100%";
    contentIframe.setAttribute('allowFullScreen', '');
    contentIframe.src = i_url;
    newContent.appendChild(contentIframe);

    //
    var pageIsLoaded = false;
    var pageIsInView = false;

    // Load page
    contentIframe.addEventListener("load", function (i_event) {
        pageIsLoaded = true;
        if (pageIsLoaded && pageIsInView)
            onFullyDone();

        // Monitor keyboard/mouse input in new iframe
        contentIframe.contentWindow.addEventListener("keydown", function (i_event) {
            window_onKeyDown(i_event);
        }, false);
        contentIframe.contentWindow.addEventListener("wheel", function (i_event) {
            window_onWheel(i_event);
        }, false);
    });
    document.getElementById("subpage").appendChild(newContent);

    // Transition into view
    if (i_slide == 0)
    {
        if (oldContent)
            oldContent.parentNode.removeChild(oldContent);

        g_subpage_currentUrl = g_subpage_goingToUrl;
        g_subpage_goingToUrl = null;

        pageIsInView = true;
        if (pageIsLoaded && pageIsInView)
            onFullyDone();
    }
    else
    {
        var slideDurationInSeconds = 0*0.6;
        dan.movement.animate(slideDurationInSeconds, function (i_progress) {
            // Ease
            i_progress = 1 - i_progress;
            i_progress = i_progress * i_progress * i_progress;
            i_progress = 1 - i_progress;

            //
            if (i_slide == 1)
            {
                if (oldContent)
                    oldContent.style.left = (-i_progress * 100).toString() + "%";
                newContent.style.left = ((1 - i_progress) * 100).toString() + "%";
            }
            else if (i_slide == -1)
            {
                if (oldContent)
                    oldContent.style.left = (i_progress * 100).toString() + "%";
                newContent.style.left = ((i_progress - 1) * 100).toString() + "%";
            }

            if (i_progress == 0)
                newContent.style.visibility = "visible";

            //
            if (i_progress == 1)
            {
                if (oldContent)
                    oldContent.parentNode.removeChild(oldContent);

                g_subpage_currentUrl = g_subpage_goingToUrl;
                g_subpage_goingToUrl = null;

                pageIsInView = true;
                if (pageIsLoaded && pageIsInView)
                    onFullyDone();
            }
        });
    }

    function onFullyDone()
    {
        if (i_onDone)
            i_onDone();
    }
}


/// ---- AUDIO PLAYER ----

audioPlayer = new Audio('audio/background.mp3');
// As audioPlayer may be paused to play a video, this is the
// canonical state
shouldAudioPlay = false;
document.addEventListener("DOMContentLoaded", function (i_event) {

    // Set up background audio player
    audioPlayer.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);


    audioPlayer.play();
    if (!audioPlayer.paused)
    {
        $('.stop-background-audio').show();
        $('.start-background-audio').hide();
        shouldAudioPlay = true;
    }
});

function suspendAudio()
{
    audioPlayer.pause();
    $('.start-background-audio').hide();
}

function resumeAudio()
{
    if (shouldAudioPlay)
    {
        audioPlayer.play();
        $('.stop-background-audio').show();
    }
}