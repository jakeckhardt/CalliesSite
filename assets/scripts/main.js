/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

jQuery(document).ready(function(){

  var burger = jQuery("#burger");
  var nav = jQuery(".nav");
  var textContainerDiv = jQuery("#hero-texts");
  var textContainerText = jQuery("#hero-texts p").text();
  var submitButton = jQuery(".wpcf7-submit");
  var burgerSpans = jQuery("#burger span");
  var navLinks = jQuery(".nav a");
  var navHovers = jQuery("#navHover span");


/***

Navigation Toggle

***/

burger.click(function() {
  burgerSpans.toggleClass("stacked");
  burgerSpans.toggleClass("exed");
  nav.toggleClass("hidden");
});


/***

Stack words on homepage hero

***/

  function stackWords(text) {

    var newText = '<div class="headerText"><p>';

    for (var i = 0; i < text.length; i++) {

      if (text[i] === " ") {
        newText += '</p><div class="textUnderline"></div></div><div class="headerText"><p>';
      } else {
        newText += text[i];
      }
    }

    return newText + '</p><div class="textUnderline"></div></div>';

  }

  textContainerDiv.html(stackWords(textContainerText));


/***

Homepage carousel

***/

  jQuery('.hero-img').slick({
    autoplay: true,
    autoplaySpeed:4000,
    arrows: false,
    dots: false,
    pauseOnHover: false,
  });

  if (screen.width <= 1024) {
    var featCounter = 0;

    jQuery('#next').click( function(){
      if (featCounter !== 2) {
        jQuery('#items').animate({
          right: '+=100%'
        }, function(){
          featCounter += 1;
        });
      } else {
        jQuery('#items').animate({
          right: '-=200%'
        }, function(){
          featCounter = 0;
        });
      }
    });

    jQuery('#prev').click( function(){
      if (featCounter !== 0) {
        jQuery('#items').animate({
          right: '-=100%'
        }, function(){
          featCounter -= 1;
        });
      } else {
        jQuery('#items').animate({
          right: '+=200%'
        }, function(){
          featCounter = 2;
        });
      }
    });
  }


/***

Custom form validation

***/

  submitButton.click( function() {
    var inputs = jQuery(".wpcf7-form-control-wrap input");
    var textarea = jQuery(".wpcf7-form-control-wrap textarea");

    inputs.removeClass("errorBorder");
    textarea.removeClass("errorBorder");

    if ( inputs.eq(0).val() === "" ) {
      inputs.eq(0).addClass("errorBorder");
    }

    if ( inputs.eq(1).val() === "" || inputs.eq(1).val().indexOf("@") === -1 || inputs.eq(1).val().indexOf(".com") === -1 ) {
      inputs.eq(1).addClass("errorBorder");
    }

    if ( textarea.val() === "" ) {
      textarea.addClass("errorBorder");
    }

  });
});
