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


/***

Featured Photos carousel

***/

function featureNext(counter) {
  if (counter!== 2) {
    jQuery('#items').animate({
      right: '+=100%'
    });
  } else {
    jQuery('#items').animate({
      right: '-=200%'
    });
  }
}

function featurePrev(counter) {
  if (counter !== 0) {
    jQuery('#items').animate({
      right: '-=100%'
    });
  } else {
    jQuery('#items').animate({
      right: '+=200%'
    });
  }
}


if (screen.width <= 1024) {
  var featCounter = 0;

  jQuery('#next').click( function(){
    featureNext(featCounter);
    featCounter += 1;
    if (featCounter === 3) {
      featCounter = 0;
    }
    console.log("how");
  });

  jQuery('#prev').click( function(){
    featurePrev(featCounter);
    if (featCounter === 0) {
      featCounter = 3;
    }
    featCounter -= 1;
  });
} else {

  jQuery( window ).resize(function() {

    if (screen.width <= 1024) {
      var featCounter = 0;

      jQuery('#next').click( function(){
        featureNext(featCounter);
        featCounter += 1;
        if (featCounter === 3) {
          featCounter = 0;
        }
        console.log("what");
      });

      jQuery('#prev').click( function(){
        featurePrev(featCounter);
        if (featCounter === 0) {
          featCounter = 3;
        }
        featCounter -= 1;
      });
    }
  });
}



/***

Single Product Related Product Carousel

***/
var singlePage = jQuery(".product").first();
var relatedCounter = 0;
var relatedItems = jQuery(".related .products li");
var itemCount = relatedItems.length;
var relatedWrap = jQuery(".related .products");
var productPhotos = jQuery(".slick-track li");
var productGallery = jQuery("#wpis-gallery");

singlePage.append("<div class='relatedArrows'><div class='relatedPrev'></div><div class='relatedNext'></div></div>");

function relatedItemsNext(itemWidth, itemsShown) {
  if (relatedCounter !== itemCount - itemsShown) {
    jQuery('.related .products').animate({
      right: '+=' + itemWidth + '%'
    }, function(){
      relatedCounter += 1;
    });
  } else {
    jQuery('.related .products').animate({
      right: '-=' + (itemCount - itemsShown) * itemWidth + "%"
    }, function(){
      relatedCounter = 0;
    });
  }
}

function relatedItemsPrev(itemWidth, itemsShown) {
  if (relatedCounter !== 0) {
    jQuery('.related .products').animate({
      right: '-=' + itemWidth + '%'
    }, function(){
      relatedCounter -= 1;
    });
  } else {
    jQuery('.related .products').animate({
      right: '+=' + (itemCount - itemsShown) * itemWidth + "%"
    }, function(){
      relatedCounter = itemCount - itemsShown;
    });
  }
}

jQuery( window ).on("load resize", function(){
  if (screen.width >= 479) {
    if (itemCount < 3 ) {
      jQuery(".relatedArrows").css("display", "none");
    } else {
      jQuery(".relatedArrows").css("display", "flex");
    }
    relatedWrap.css("width", 100 / 3 * itemCount + "%");
    relatedWrap.css("right", "0");
    relatedCounter = 0;
  } else if ( screen.width <= 479 ) {
    if (itemCount <= 1 ) {
      jQuery(".relatedArrows").css("display", "none");
    } else {
      jQuery(".relatedArrows").css("display", "flex");
    }
    relatedWrap.css("width", itemCount * 100 + "%");
    relatedWrap.css("right", "0");
    relatedCounter = 0;
  }
  jQuery(".relatedArrows").css("bottom", jQuery(".related").height() / 2 + "px");
});

jQuery('.relatedNext').click( function() {
  if (screen.width >= 479) {
    relatedItemsNext(100 / 3, 3);
  } else {
    relatedItemsNext(100, 1);
  }
});

jQuery('.relatedPrev').click( function() {
  if (screen.width >= 479) {
    relatedItemsPrev(100 / 3, 3);
  } else {
    relatedItemsPrev(100, 1);
  }
});

if (productPhotos.length === 1) {
  productGallery.css("display", "none");
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
