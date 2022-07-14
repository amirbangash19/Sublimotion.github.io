// fullscreen.js must be loaded before this file.


function goFullscreen(id) {
    var element = document.getElementById(id);       
      if (screenfull.enabled) {
          screenfull.request(element);
      } else {
        if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        }  
      }
  }
  
  document.addEventListener("DOMContentLoaded", function (i_event) {
      //
      // $("#clipPlayer .playButton").bind("click", function (i_event) {
      //     $("#clipPlayer .previewImage")[0].style.visibility = "hidden";
      //     $("#clipPlayer .playButton")[0].style.visibility = "hidden";
      //     $("#clipPlayer video")[0].style.visibility = "visible";
      //     $("#clipPlayer video")[0].play();
      // });
  
      $("#clipPlayer video").click(function() {
          if (this.paused)
          {
              this.play();
          }
          else
          {
              this.pause();
          }
      });
  
  // This is no longer used as audio only plays on non-video pages now.
      // $('.suspends-background-audio video').bind("play", function() {
      // 	window.parent.suspendAudio();
      // 	// $("#clipPlayer .previewImage")[0].style.visibility = "hidden";
      // 	// $("#clipPlayer .playButton")[0].style.visibility = "hidden";
      //     // $("#clipPlayer video")[0].style.visibility = "visible";
      // });
  
      // $('.suspends-background-audio video').bind("pause", function() {
      // 	window.parent.resumeAudio();
      // 	// $("#clipPlayer .previewImage")[0].style.visibility = "visible";
      // 	// $("#clipPlayer .playButton")[0].style.visibility = "visible";
      //     // $("#clipPlayer video")[0].style.visibility = "hidden";
      // });
  
  // Advance to next page on completion
      $(".advance-page-on-completion video").bind("ended", function() {
          var url = window.parent.menu_adjacentUrl(window.parent.g_subpage_currentUrl, 1);
          // find the menu button and click it
          $('#menu', window.parent.document).find('a[href="'+url+'"]')[0].click()
      });
  
      $(".fullscreenButton").click(function() {
          var element = document.getElementById('video');       
            if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
            } else if (element.webkitRequestFullScreen) {
              element.webkitRequestFullScreen();
            } 
      });
  });
  