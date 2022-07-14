
// + Polyfills for standard functionality {{{

// Provide requestAnimationFrame in a cross browser way.
// @author paulirish / http://paulirish.com/
if (!window.requestAnimationFrame)
{
    window.requestAnimationFrame = (function ()
    {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame || // comment out if FF4 is slow (it caps framerate at ~30fps: https://bugzilla.mozilla.org/show_bug.cgi?id=630127)
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element)
            {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

// + }}}

// + OS detection {{{

function isMobile()
{
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/))
    );
}

function isiPad()
{
    return (navigator.platform.indexOf("iPad") != -1);
}

function isiPhone()
{
    return (
        // Detect iPhone
        (navigator.platform.indexOf("iPhone") != -1) ||
        // Detect iPod
        (navigator.platform.indexOf("iPod") != -1)
    );
}

function iOSVersion()
{
    if (window.MSStream)
    {
        // There is some iOS in Windows Phone...
        // https://msdn.microsoft.com/en-us/library/hh869301(v=vs.85).aspx
        return false;
    }

    var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (match !== undefined && match !== null)
    {
        var version = [parseInt(match[1], 10),
                       parseInt(match[2], 10),
                       parseInt(match[3] || 0, 10)];
        return version;
        return parseFloat(version.join('.'));
    }

    return false;
}

// + }}}

// + Event utilities {{{

function addOneshotEventListener(i_target, i_eventName, i_handler, i_useCapture)
// Params:
//  i_target:
//   (Element)
//  i_eventName:
//   (string)
//  i_handler:
//   (function)
//  i_useCapture:
//   (boolean)
{
    function oneshotHandler(i_event)
    {
        i_target.removeEventListener(i_eventName, oneshotHandler, i_useCapture);
        return i_handler(i_event);
    }

    i_target.addEventListener(i_eventName, oneshotHandler, i_useCapture);
}

// + }}}

// + Video utilities {{{

function logVideoEvents(i_videoElement)
{
    i_videoElement.addEventListener("abort", function (i_event)
    // Sent when playback is aborted; for example, if the media is playing and is restarted from the beginning, this event is sent.
    {
        console.log("video event: abort");
    });
    i_videoElement.addEventListener("canplay", function (i_event)
    // Sent when enough data is available that the media can be played, at least for a couple of frames.  This corresponds to the HAVE_ENOUGH_DATA readyState.
    {
        console.log("video event: canplay");
    });
    i_videoElement.addEventListener("canplaythrough", function (i_event)
    // Sent when the ready state changes to CAN_PLAY_THROUGH, indicating that the entire media can be played without interruption, assuming the download rate remains at least at the current level. It will also be fired when playback is toggled between paused and playing. Note: Manually setting the currentTime will eventually fire a canplaythrough event in firefox. Other browsers might not fire this event.
    {
        console.log("video event: canplaythrough");
    });
    i_videoElement.addEventListener("durationchange", function (i_event)
    // The metadata has loaded or changed, indicating a change in duration of the media.  This is sent, for example, when the media has loaded enough that the duration is known.
    {
        console.log("video event: durationchange");
    });
    i_videoElement.addEventListener("emptied", function (i_event)
    // The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.
    {
        console.log("video event: emptied");
    });
    i_videoElement.addEventListener("encrypted", function (i_event)
    // The user agent has encountered initialization data in the media data.
    {
        console.log("video event: encrypted");
    });
    i_videoElement.addEventListener("ended", function (i_event)
    // Sent when playback completes.
    {
        console.log("video event: ended");
    });
    i_videoElement.addEventListener("error", function (i_event)
    // Sent when an error occurs.  The element's error attribute contains more information. See HTMLMediaElement.error for details.
    {
        console.log("video event: error");
    });
    i_videoElement.addEventListener("interruptbegin", function (i_event)
    // Sent when audio playing on a Firefox OS device is interrupted, either because the app playing the audio is sent to the background, or audio in a higher priority audio channel begins to play. See Using the AudioChannels API for more details.
    {
        console.log("video event: interruptbegin");
    });
    i_videoElement.addEventListener("interruptend", function (i_event)
    // Sent when previously interrupted audio on a Firefox OS device commences playing again â€” when the interruption ends. This is when the associated app comes back to the foreground, or when the higher priority audio finished playing. See Using the AudioChannels API for more details.
    {
        console.log("video event: interruptend");
    });
    i_videoElement.addEventListener("loadeddata", function (i_event)
    // The first frame of the media has finished loading.
    {
        console.log("video event: loadeddata");
    });
    i_videoElement.addEventListener("loadedmetadata", function (i_event)
    // The media's metadata has finished loading; all attributes now contain as much useful information as they're going to.
    {
        console.log("video event: loadedmetadata");
    });
    i_videoElement.addEventListener("loadstart", function (i_event)
    // Sent when loading of the media begins.
    {
        console.log("video event: loadstart");
    });
    i_videoElement.addEventListener("mozaudioavailable", function (i_event)
    // Sent when an audio buffer is provided to the audio layer for processing; the buffer contains raw audio samples that may or may not already have been played by the time you receive the event.
    {
        console.log("video event: mozaudioavailable");
    });
    i_videoElement.addEventListener("pause", function (i_event)
    // Sent when playback is paused.
    {
        console.log("video event: pause");
    });
    i_videoElement.addEventListener("play", function (i_event)
    // Sent when playback of the media starts after having been paused; that is, when playback is resumed after a prior pause event.
    {
        console.log("video event: play");
    });
    i_videoElement.addEventListener("playing", function (i_event)
    // Sent when the media begins to play (either for the first time, after having been paused, or after ending and then restarting).
    {
        console.log("video event: playing");
    });
    i_videoElement.addEventListener("progress", function (i_event)
    // Sent periodically to inform interested parties of progress downloading the media. Information about the current amount of the media that has been downloaded is available in the media element's buffered attribute.
    {
        console.log("video event: progress");
    });
    i_videoElement.addEventListener("ratechange", function (i_event)
    // Sent when the playback speed changes.
    {
        console.log("video event: ratechange");
    });
    i_videoElement.addEventListener("seeked", function (i_event)
    // Sent when a seek operation completes.
    {
        console.log("video event: seeked");
    });
    i_videoElement.addEventListener("seeking", function (i_event)
    // Sent when a seek operation begins.
    {
        console.log("video event: seeking");
    });
    i_videoElement.addEventListener("stalled", function (i_event)
    // Sent when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
    {
        console.log("video event: stalled");
    });
    i_videoElement.addEventListener("suspend", function (i_event)
    // Sent when loading of the media is suspended; this may happen either because the download has completed or because it has been paused for any other reason.
    {
        console.log("video event: suspend");
    });
    i_videoElement.addEventListener("timeupdate", function (i_event)
    // The time indicated by the element's currentTime attribute has changed.
    {
        console.log("video event: timeupdate");
    });
    i_videoElement.addEventListener("volumechange", function (i_event)
    // Sent when the audio volume changes (both when the volume is set and when the muted attribute is changed).
    {
        console.log("video event: volumechange");
    });
    i_videoElement.addEventListener("waiting", function (i_event)
    // Sent when the requested operation (such as playback) is delayed pending the completion of another operation (such as a seek).
    {
        console.log("video event: waiting");
    });
}

function videoReadyEventName()
{
    // Some tested behaviours:
    //  iOS 5, Safari
    //   Video elements don't trigger "onplaythrough". The latest event which they do trigger instead is "suspend".
    //  iOS 9, Safari
    //   Video elements do trigger "onplaythrough".

    if (isiPhone() || isiPad())
    {
        var iosVersion = iOSVersion();
        if (iosVersion && iosVersion[0] <= 7)
            return "suspend";
        return "canplaythrough";
    }

    return "canplaythrough";
}

function scanVideo(i_videoElement, i_onEnded)
{
    i_videoElement.currentTime = 0;
    var currentTime = dan.time.systemTime();

    var onAnimationFrame = function ()
    {
        var newTime = dan.time.systemTime();
        i_videoElement.currentTime += newTime - currentTime;
        currentTime = newTime;

        if (i_videoElement.currentTime < i_videoElement.duration)
        {
            requestAnimationFrame(onAnimationFrame);
        }
        else
        {
            if (i_onEnded)
                i_onEnded();
        }
    };
    requestAnimationFrame(onAnimationFrame);
}

// + }}}

// + Path utilities {{{

function path_setFileName(i_path, i_newFileName)
{
    var parts = i_path.split("/");
    parts.pop();
    parts.push(i_newFileName);
    return parts.join("/")
}

// + }}}

// + Video {{{

var g_videoElement = null;

// + + Resize {{{

function resizeVideoToContainer(i_videoElement, i_defaultHorizontalAspect, i_defaultVerticalAspect)
// Resize video background
//
// Params:
//  i_videoElement:
//   (HTMLVideoElement)
//  i_defaultHorizontalAspect, i_defaultVerticalAspect:
//   Either (integer number)
//    Expected aspect ratio of the video, used as a fallback if the video element cannot currently give its dimensions to recalculate it dynamically.
//   or (null or undefined)
//    Don't use a fallback.
//    If the video element cannot currently give its dimensions then the function will return without trying to change its size.
//
// Returns:
//  (boolean)
//  true: The video element was able to give its full dimensions
//  false: The video element was not able to give its full dimensions
{
    var $videoElement = jQuery(i_videoElement);
    var $container = jQuery("#clipPlayer");

    // Get container size
    var containerWidth = $container.width();
    //  Calculate container height manually, because $container.height() isn't always up to date on iOS when getting here after hiding/showing overlay toolbars
    var containerTop = parseInt(document.defaultView.getComputedStyle($container[0]).top.replace("px", ""));
    var containerHeight = window.innerHeight - containerTop;

    // Get native video size
    var videoWidth = i_videoElement.videoWidth;
    var videoHeight = i_videoElement.videoHeight;
    //console.log("video width: " + videoWidth.toString() + ", height: " + videoHeight.toString());
    var gotDimensionsFromVideo = true;
    if (videoWidth == 0 || videoWidth === undefined)
    {
        videoWidth = i_defaultHorizontalAspect;
        gotDimensionsFromVideo = false;
    }
    if (videoHeight == 0 || videoHeight === undefined)
    {
        videoHeight = i_defaultVerticalAspect;
        gotDimensionsFromVideo = false;
    }
    if (videoWidth === undefined || videoHeight === undefined)
        return gotDimensionsFromVideo;

    // If more horizontal magnification than vertical magnification
    //alert(parseInt(document.defaultView.getComputedStyle($container[0]).top) + ", " + window.innerWidth.toString() + ", " + window.innerHeight.toString() + ", " + containerWidth.toString() + ", " + containerHeight.toString());
    if (containerWidth / videoWidth > containerHeight / videoHeight)
    {
        $videoElement.css({
            // +2 pixels to prevent an empty space after transformation
            width: containerWidth + 2,
            height: "auto"
        });
    }
    // Else if more vertical magnification than horizontal magnification
    else
    {
        $videoElement.css({
            width: "auto",
            // +2 pixels to prevent an empty space after transformation
            height: containerHeight + 2
        });
    }

    //
    return gotDimensionsFromVideo;
}

// + + }}}

// + + Load {{{

/*
function loadSilentVideo(i_url, i_attributes)
// Params:
//  i_url:
//   (string)
//  i_attributes:
//   (string)
//   eg.
//    "autoplay loop muted"
//
// Returns:
//  (HTMLVideoElement)
{
    jQuery("#clipPlayer").html('<video ' + i_attributes + '>' +
                               '<source src="/wp-content/themes/mtf_2017/videos/front_silent.mp4" type="video/mp4">' +
                               '<source src="/wp-content/themes/mtf_2017/videos/front_silent.webm" type="video/webm">' +
                               '</video>');
    g_videoElement = jQuery("#clipPlayer video").get(0);
    //logVideoEvents(g_videoElement);

    return g_videoElement;
}

function loadAudibleVideo(i_url, i_attributes)
// Params:
//  i_url:
//   (string)
//  i_attributes:
//   (string)
//
// Returns:
//  (HTMLVideoElement)
{
    jQuery("#clipPlayer").html('<video ' + i_attributes + '>' +
                               '<source src="/wp-content/themes/mtf_2017/videos/front.mp4" type="video/mp4">' +
                               '<source src="/wp-content/themes/mtf_2017/videos/front.webm" type="video/webm">' +
                               '</video>');
    g_videoElement = jQuery("#clipPlayer video").get(0);

    return g_videoElement;
}
*/

// + + }}}

// + }}}

function makeVideoVisible()
{
    jQuery(g_videoElement).css({
        visibility: 'visible',
        opacity: 1
    });
    //$container.css('background-image', 'none');
}

function addPlayButton()
{
    // If already added, bail [currently shouldn't happen; here for debug/dev purposes]
    if (jQuery(".videoPlayButton").length > 0)
        return;

    //
    var $videoPlayButton = jQuery('<div class="videoPlayButton"></div>');
    $videoPlayButton.bind("click", function (i_event) {
        $videoPlayButton.remove();
        g_videoElement.play();

        i_event.preventDefault();
        return false;
    });
    jQuery("#clipOverlay").append($videoPlayButton);
}