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
