//
// Get the URL parameters
//
function getUrlVar(key){
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && unescape(result[1]) || "";
}

//
// Set the screensaver
//
// 6 min = 360 sec = 360000 msec
// Longer than normal since we've got some long-ish videos
//
var s_saver;
// Debug screensaver length
var s_saver_timeout = 5000;
//var s_saver_timeout = 360000;

// Page attributes
var current_page = $(location).attr('pathname');
console.log(current_page);
var s_saver_enabled = getUrlVar('saver');

//
// Screensaver - load
//
// Check if the URL tells us to load the screensaver.
// This happens when the timeout occurs on a sub page. The user is sent
// back to the index page with this URL flag, enabling the screensaver.
//
$(window).bind("load", function() {

    if (s_saver_enabled != 'true') {
        // Start by hiding the screensaver overlay
        $('#screensaver').hide();

        // Run a timer from the load of the page
        s_saver = setTimeout(function(){
            window.location.replace('index.html?saver=true');
        }, s_saver_timeout);
    }

});

//
// Screensaver - reset
//
// Any time we get a click, reset the screensaver timer and make sure the
// screensaver is cleared.
//
$('body').mousedown(function() {

    // Hide screensaver
    $('#screensaver').fadeOut(100);

    // Reset the screensaver timer
    clearTimeout(s_saver);
    s_saver = setTimeout(function(){
        window.location.replace('index.html?saver=true');
    }, s_saver_timeout);

});

//
// Expand click area of links inside a box.
//
// This lets people click anywhere inside a box that has a link inside,
// instead of requiring people to click on the link text. Better default
// for a touch screen.
//
$(".box").click(function(){
    window.location=$(this).find("a").attr("href");
    return false;
});

//
// Add state classes for clickable boxes
//
// Default resting state
$('.box p').addClass('box-resting');

// Pressed state
$(".box").mousedown(function(){
    console.log("down");
    $(this).children('p').addClass('box-active');
});

// Reset states on mouseup
$(".box").mouseup(function(){
    $(this).children('p').removeClass('box-active');
    $(this).children('p').addClass('box-resting');
});
