var equalheight = require('./equalHeight');
var $ = jQuery = require('jquery');
init();
module.exports = {};

function init() {
    var is_root = location.pathname == "/";

    doEqualHeights('.great-equal-hights-container');
    setupLocaleSelector();
    blurLinks();
    resizeListner();

    if (is_root) {
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
    $(item).slideToggle('2000', 'easeInOutSine', function() {
        // Animation complete.
    });
};

function scrollingBG() {
    // Y axis scroll speed
    var velocity = 0.15;

    function update() {
        var pos = $(window).scrollTop();
        var $element = $(this);
        // subtract some from the height b/c of the padding
        var height = $element.height() + 50;
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
    var supportedGBCountries = ['GB', 'IE'];
    $.getJSON('//freegeoip.net/json/', function() {})
        .done(function(data) {
            if ($.inArray(data.country_code, supportedGBCountries) != '-1') {
                getRedirectPath(data.country_code)
            } else {
                doRedirect("/uk/")
            }
        })
        .fail(function() {
            loaded()
        })
}

function getRedirectPath(countryCode) {
    //TODO move lookup table to more stable location
    $.getJSON('https://cdn.rawgit.com/uktrade/iigb-beta-structure/develop/redirects/ip_redirects.json', function(data) {})
        .done(function(data) {
            doRedirect(data[countryCode])
        })
        .fail(function() {
            loaded()
        })
}

function doRedirect(redirectLocation) {
    if (redirectLocation == undefined || redirectLocation == '') {
        window.location.pathname = '/int/'
    } else {
        window.location.pathname = redirectLocation
    }
}
