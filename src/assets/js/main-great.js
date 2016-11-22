doEqualHeights('.great-equal-hights-container');
setupLocaleSelector();
blurLinks();
resizeListner();
removeloading();


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