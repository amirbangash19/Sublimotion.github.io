
// + Page activity control {{{

    var g_pageIsActive = false;

    function startCode()
    {
        g_pageIsActive = true;
    }
    
    function stopCode()
    {
        g_pageIsActive = false;
        if (window.g_videoElement)
            g_videoElement.pause();
    }
    
    // + }}}
    
    
    document.addEventListener("DOMContentLoaded", function (i_event) {
        //
        //var startTime = dan.time.systemTime();
    
        g_videoElement = jQuery("#clipPlayer video").get(0);
    
        // Resize video to container, on occasions of
        // now, on window resize, and when video metadata is available
        resizeVideoToContainer(g_videoElement, 16, 9);
        window.addEventListener("resize", resizeVideoToContainer.bind(null, g_videoElement, 16, 9));
        addOneshotEventListener(g_videoElement, "loadedmetadata", function () {
            console.log(g_videoElement.videoWidth);
            resizeVideoToContainer(g_videoElement);
        });
    
        $(".contact").addClass('expanded');
        $('.start-background-audio').click(function(event) {
        window.parent.audioPlayer.play();
        // document.getElementById("background-audio").play();
        $(this).hide();
        $('.stop-background-audio').show();
        window.parent.shouldAudioPlay = true;
    });
    
    $('.stop-background-audio').click(function(event) {
        window.parent.audioPlayer.pause();
        // document.getElementById("background-audio").pause();
        $('.start-background-audio').show();
        // in case audio is stopped while we are watching a video
        $(this).hide();
        window.parent.shouldAudioPlay = false;
    });
    
    
    window.parent.resumeAudio();
    
    });