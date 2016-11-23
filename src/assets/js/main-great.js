init();



function init() {
    var is_root = location.pathname == "/";
    console.log(location.pathname);

    doEqualHeights('.great-equal-hights-container');
    setupLocaleSelector();
    blurLinks();
    resizeListner();

    if(is_root) {
        checkGeoLocation();
    } else {
        removeloading();
    }
    // removeloading();
    // doGeoRouting();
}


function doEqualHeights(input) {
    equalheight(input);
    // $('.great-tile .great-btn').css('position', 'absolute');
}

function blurLinks() {
    $('a').click(function(event) {
        $(this).blur();
    });
}

function setupLocaleSelector() {
    $('.great-locale-selector__toggle').click(function(event) {
        event.preventDefault();
        slideToggle('.great-locale-selector');
    });

    $('.great-locale-selector').hide();
}

function removeloading() {
    $('.dit-loading').fadeOut(300);
}

function slideToggle(item) {
    // $(item).slideToggle("easeInOutSine");
    $(item).slideToggle('2000', 'easeInOutSine', function () {
        // Animation complete.
    });
};

function scrollingBG() {
    // Y axis scroll speed
    var velocity = 0.15;

    function update(){ 
    var pos = $(window).scrollTop(); 
    var $element = $(this);
    // subtract some from the height b/c of the padding
    var height = $element.height()+50;
        $('body').css('backgroundPosition', '0 ' + Math.round(-(height - pos) * velocity) + 'px'); 
    };

    $(window).bind('scroll', update);
    
};

function resizeListner() {
    $(window).resize(function() {
        doEqualHeights('.great-equal-hights-container');
    });
}


function checkGeoLocation() {
    var jqxhr = $.getJSON( "http://freegeoip.net/json/", function(data) {
      // console.log( "success" );
    })
      .done(function( data) {
        doGeoRouting(data.country_code);
        // console.log( "second success" );
      })
      .fail(function() {
        // console.log( "error" );
        removeloading();
      })
}

function doGeoRouting(countryCode) {
    var supportedCountries = [ 'US', 'CN', 'DE' ];

   if($.inArray( countryCode, supportedCountries)!='-1') {
    var redirectLocation = countryCode.toLowerCase();
    window.location.replace(redirectLocation);
   }
}