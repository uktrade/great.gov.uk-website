var equalheight=require('./equalHeight');
var $=jQuery= require('jquery');
init();
module.exports={};

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
    return $.ajax({
      url: '//freegeoip.net/json/',
      type: 'GET',
      dataType: 'jsonp',
    }).then(function(data) {
      debug('Resolved country code as ', data.country_code)
      return doGeoRouting(data.country_code);
    })
  }

function doGeoRouting(countryCode) {
    var build=document.iigbBuild ? document.iigbBuild + '/':'';
    var ipRedirectUrl='/assets/' + build+ 'ip_redirects.json';
    return $.getJSON( ipRedirectUrl)
      .done(function(data) {
        debug('Redirecting to', data[countryCode])
        doRedirect(data[countryCode])
        return true
      })
}

function doRedirect(countryCode) {
    if (redirectLocation == undefined || redirectLocation == '') {
      debug('Location code is empty, redirecting to /int')
      window.location.pathname = '/int/'
    } else {
      window.location.pathname = redirectLocation
    }
}
