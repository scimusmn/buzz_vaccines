//
// Hide all of the questions to start
//
$('.question, .question-choices, .explanation, .selection-arrow').hide();

//
// Get the current question and show the right options
//
var question = getUrlVar('question');
$('#question-' + question).show();
$('#question-choices-' + question).show();

//
// Get the user's selected answer
//
var selectedAnswer = getUrlVar('answer');

//
// Get the correct answer from the page meta tag
//
var correctAnswer = $('#question-choices-' + question).attr('correct');

$('#question-num').text(parseInt(question));

var score = getUrlVar('score');
// If the score is unset, make it 0
if (! score) {
    console.log('no score');
    score = 0;
}
if (question == '01' && selectedAnswer == 'question') {
    $('#your-score').hide();
} else {
    console.log("in here");
    $('#your-score').text('Your score: ' + parseInt(score) + '/6');
}

//
// Question page
//
// We start a timer that kicks you to the answer page if you don't answer
//
if (selectedAnswer == 'question'){

    $('.next-question').hide();

    $('.quiz-choice a').each(function() {
        var _href = $(this).attr("href");
        $(this).attr("href", _href + '&score=' + score);
    });

    $(window).bind("load", function() {
        $('div#timer-1').pietimer({
            seconds: 5,
            colour: '#B32037'
        }, function() {
            window.location.replace('quiz_a_question.html?question=' +
                                    question + '&answer=none' +
                                    '&score=' + score);
        });
    });

    jQuery.fn.pietimer = function( options, callback ) {
        var settings = {
            'seconds': 5,
            'colour': 'rgba(255, 255, 255, 0.8)',
            'height': this.height(),
            'width': this.width()
        };
        if ( options ) {
            $.extend( settings, options );
        }
        this.html('<canvas id="pie_timer" width="'+settings.height+'" height="'+settings.height+'"></canvas>');
        var val = 360;
        interval = setInterval(timer, 40);
        function timer(){
            var canvas = document.getElementById('pie_timer');
            if (canvas.getContext){
                val -= ( 360 / settings.seconds ) / 24;
                if ( val <= 0 ){
                    clearInterval(interval);
                    canvas.width = canvas.width;
                    if(typeof callback == 'function'){
                        callback.call();
                    }
                } else {
                    canvas.width = canvas.width;
                    var ctx = canvas.getContext('2d');
                    var canvas_size = [canvas.width, canvas.height];
                    var radius = Math.min(canvas_size[0], canvas_size[1]) / 2;
                    var center = [canvas_size[0]/2, canvas_size[1]/2];
                    ctx.beginPath();
                    ctx.moveTo(center[0], center[1]);
                    var start = ( 3 * Math.PI ) / 2;
                    ctx.arc(
                        center[0],
                        center[1],
                        radius,
                        start - val * ( Math.PI / 180 ),
                        start,
                        false
                    );
                    ctx.closePath();
                    ctx.fillStyle = settings.colour;
                    ctx.fill();
                }
            }
        }
        return this;
    }
}

//
// Answer page
//
// If the selectedAnswer var is not question or none, then you're on the
// default answer page.
else {


    //
    // Remove links from answers
    //
    $('.quiz-choice a').contents().unwrap();
    $('.quiz-choice').addClass('quiz-answer');
    $('.quiz-choice').removeClass('quiz-choice');

    //
    // Add a style to the correct answer
    //
    $('.' + correctAnswer).addClass('correct');

    if (correctAnswer == selectedAnswer) {
        score = parseInt(score) + 1;
        console.log('You got it right' + score);
        $('#your-score').text('Your score: ' + parseInt(score) + '/6');
    }

    //
    // Show the explanation
    //
    $('.explanation-' + question).show();

    // Don't show the next question button on the last question.
    //
    if (question != '06') {
        var nextQuestion = parseInt(question) + 1;
        nextQuestion = nextQuestion.toString();
        if (nextQuestion.length == 1) {
            nextQuestion = '0' + nextQuestion;
        }
        $('.next-question a').attr('href', 'quiz_a_question.html?' +
                                   'question=' + nextQuestion + '&' +
                                   'answer=question&' +
                                   'score=' + score);
    }
    else {
        console.log('test');
        $('.next-question').hide()
    }


    var choiceHeight = $('#question-choices-' + question + ' .' + selectedAnswer).height();
    var choiceOffset = $('#question-choices-' + question + ' .' + selectedAnswer).offset();
    console.log(choiceOffset);
    var arrowTop = choiceOffset.top + (choiceHeight / 2) - 50;
    console.log(arrowTop);

    $('.selection-arrow').show();
    $('.selection-arrow').css('top', arrowTop);
    if (question == '03' || question == '06') {
        $('.selection-arrow').css('left', '30px');
    }

}

//
// Answer page - No answer
//
// If you land on the answer page and haven't answered, then don't display
// the "your answer" arrow
//
if (selectedAnswer == 'none'){
    $('.selection-arrow').hide();
}

