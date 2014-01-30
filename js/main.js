$(".box1").click(function(){
    window.location=$(this).find("a").attr("href");
    return false;
});

// Clickable boxes
$('.box1 p').addClass('box-resting');
$(".box1").mousedown(function(){
    console.log("down");
    $(this).children('p').addClass('box-active');
});
$(".box1").mouseup(function(){
    console.log("up");
    $(this).children('p').removeClass('box-active');
    $(this).children('p').addClass('box-resting');
});
