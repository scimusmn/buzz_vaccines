// Get the URL parameters
function getUrlVar(key){
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && unescape(result[1]) || "";
}

var s_saver;
var s_saver_enabled = getUrlVar('saver');
var s_saver_timeout = 360000;
//var s_saver_timeout = 2000;
var current_page = $(location).attr('pathname');

//
// Check screensaver states on ever page load
//
$( document ).ready(function() {

    // Check if the URL tells us to load the screensaver.
    // This happens when the timeout occurs on a sub page. The user is sent
    // back to the index page with this URL flag, enabling the screensaver.
    if (s_saver_enabled != 'true') {
        // Start by hiding the screensaver overlay
        $('#screensaver').hide();

        // Play the video
        // Disabling this for testing
        //$('#intro-overlay').show();

        // Run a timer from the load of the page
        s_saver = setTimeout(function(){
            // If we're not on the homepage, go back there and start the
            // screen saver.
            if (current_page != 'index.html') {
                window.location.replace('index.html?saver=true');
            }
            // If we're on the homepage, just start the screensaver.
            else {
                $('#screensaver').fadeIn(900);
            }
        }, s_saver_timeout);
    }
});

$(window).bind("load", function() {
    if (current_page == 'index.html') {
        $('#intro-overlay').hide();
    }
    if (s_saver_enabled != 'true') {
        // Start by hiding the screensaver overlay
        $('#screensaver').hide();

        // Play the intro video
        $('#intro-overlay').show();
        $("#intro-overlay-video")[0].player.play();

    }
});


//
// Any time we get a click, reset the screensaver timer and make sure the
// screensaver is cleared.
//
$('body').mousedown(function() {
    clearTimeout(s_saver);

    // Start the screensaver timer after a click
    s_saver = setTimeout(function(){
        // TODO - don't duplicate this form above. Make a function.
        if (current_page != 'index.html') {
            window.location.replace('index.html?saver=true');
        }
        else {
            $('#screensaver').fadeIn(900);
        }
    }, s_saver_timeout);
    $('#screensaver').fadeOut(100);

    //if (current_page != 'index.html') {
        //$('#intro-overlay').fadeIn(300);
        //$("#intro-overlay-video")[0].player.play();
    //}
});

$('#intro-overlay').mousedown(function() {
    $("#intro-overlay-video")[0].player.pause();
    $('#intro-overlay').fadeOut(300);
});

$(".box").click(function(){
    window.location=$(this).find("a").attr("href");
    return false;
});

// Clickable boxes
$('.box p').addClass('box-resting');

$(".box").mousedown(function(){
    console.log("down");
    $(this).children('p').addClass('box-active');
});

$(".box").mouseup(function(){
    $(this).children('p').removeClass('box-active');
    $(this).children('p').addClass('box-resting');
});
