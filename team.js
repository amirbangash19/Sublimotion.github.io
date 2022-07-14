
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
    
    
    
    
    //
    function window_onResize(i_event)
    {
        $(".detailSlide img").each(function (i_index, i_element) {
            
        });
    
    }
    window.addEventListener("resize", window_onResize);