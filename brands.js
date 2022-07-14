

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