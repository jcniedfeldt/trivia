var trivia = [{
    question: "What is John Niedfeldt's goto Taco Bell name?",
    choices: ["Kuzco",
        "Batman",
        "Clyde",
        "Gollum"
    ]
}, {
    question: "What is the air-speed velocity of a swallow?",
    choices: ["African or European?",
        "42",
        "You mom! (Tee-hee-hee)",
        "24 miles per hour"
    ]
}, {
    question: "Which of the following quotes is said by Sid the Sloth in Ice Age?",
    choices: ["I think mating for life is stupid.",
        "If you find a mate in life you should be loyal, in your case grateful, now get away from me.",
        "I suggest you take the shortcut.",
        "If you weren't smart enough to plan ahead then doom on you!"
    ]
}, {
    question: "2+2=",
    choices: ["4",
        "3",
        "5",
        "I hate math."
    ]
}, {
    question: "Which color is NOT a base color in a rainbow?",
    choices: ["White",
        "Violet",
        "Indigo",
        "Orange"
    ]
}, {
    question: "What happens if you add the element Calcium to water?",
    choices: ["It sizzles.",
        "It explodes.",
        "Nothing.",
        "It turns into milk."
    ]
}, {
    question: "Which instrument is not a woodwind?",
    choices: ["Trumpet",
        "Oboe",
        "Bassoon",
        "Saxaphone"
    ]
}]

//  Variable that will hold our setInterval that runs the timer
var intervalId;
var transitionTime = 1000;
var wins=0;
var losses=0;

// prevents the clock from being sped up unnecessarily
var timerRunning = false;

// Our timer object
var timer = {
    timePerQuestion: 20,
    timeLeft: 20,

    reset: function () {

        timer.timeLeft = timer.timePerQuestion;
        var converted = timer.timeConverter(timer.timeLeft);
        // DONE: Change the "display" div to "00:00."
        // $("#display").text("00:00");
        $("#timer").text(converted);
    },
    start: function () {

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!timerRunning) {
            intervalId = setInterval(timer.count, 1000);
            timerRunning = true;
        }
    },
    stop: function () {

        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        timerRunning = false;
    },
    count: function () {
        // TODO if no time left, stop timer and call answerChosen

        timer.timeLeft--;

        // DONE: Get the current time, pass that into the timer.timeConverter function,
        //       and save the result in a variable.
        var converted = timer.timeConverter(timer.timeLeft);
        // console.log(converted);

        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#timer").text(converted);
        if (timer.timeLeft < 1) {
            timer.stop();
            noAnswerChosen();
        }
    },
    timeConverter: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
};
// {
//     question: "W",
//     choices: ["",
//         "",
//         "",
//         ""
//     ]
// }, {
//     question: "",
//     choices: ["",
//         "",
//         "",
//         ""
//     ]
// }, {
//     question: "",
//     choices: ["",
//         "",
//         "",
//         ""
//     ]
// },

function addQuestionsToCarousel() {
    function addQuestionToCarousel(questionObj) {
        carouselEl = $("<div class=\"carousel-item question\" data-interval=\"false\">");
        carouselEl.append("<h2>" + questionObj.question + "</h2>");
        var choiceOrder = generateRandomOrder(questionObj.choices.length);
        choiceOrder.forEach(index => {
            //add question
            carouselEl.append("<button type=\"button\" class=\"btn btn-primary option\" data-index=\"" + index + "\" style=\"margin-bottom:4px;white-space: normal;\">" + questionObj.choices[index] + "</button>");
        });
        $(".triviaQuestions").append(carouselEl)
    };

    trivia.forEach(questionObj => {
        addQuestionToCarousel(questionObj);
    });

    carouselEl = $("<div class=\"carousel-item endQuestions\" data-interval=\"false\">");
    carouselEl.append("<h2>" + "Finished!" + "</h2>");
    carouselEl.append("<h4>Wins: <span id=\"correctAnswers\"></span></h4>");
    carouselEl.append("<h4>Losses: <span id=\"incorrectAnswers\"></span></h4>");
    carouselEl.append("<button type=\"button\" class=\"btn btn-primary begin\">Play Again</button>");

    $(".triviaQuestions").append(carouselEl)
}

function generateRandomOrder(numObjs) {
    var list2ret = [];
    while (list2ret.length < numObjs) {
        var randInt = Math.floor(Math.random() * numObjs);
        if ($.inArray(randInt, list2ret) == -1) {
            list2ret.push(randInt);
        }
    }
    // console.log(list2ret);
    return list2ret;
};

function answerChosen() {
    // display chosen answer and correct answer if incorrect
    // keep tally of correct answers
    // wait a few seconds
    // go to next slide
    // $(".carousel").carousel("next");

    if (timerRunning) {
        timer.stop();
        showAnswer();
        if ($(this).attr("data-index") == "0") {
            // console.log("Good Job!");
            wins++;
            $("#correctAnswers").text(wins);
        }
        else {
            // console.log("Missed it by that much.");
            losses++;
            $("#incorrectAnswers").text(losses);
            //show incorrect answer
            $(this).addClass("bg-danger");
        }
        // console.log("Called by user click.");
        //start 3 second wait, then start next question
        intervalId = setTimeout(nextQuestion, transitionTime);
    }
}

function noAnswerChosen() {
    losses++;
    $("#incorrectAnswers").text(losses);
    showAnswer();
    intervalId = setTimeout(nextQuestion, transitionTime);

}
function showAnswer() {
    //TODO show answers, making sure to stop click events if timer is stopped
    answer = $(".active").find(".option[data-index='0']");
    answer.addClass("bg-success");

}


addQuestionsToCarousel();

$(document).on("click",".begin", function (event) {
    timer.reset();
    $(".carousel").carousel(1);
    timer.start();
    // $(".carousel").carousel("next");
});

function resetQuestionColors(){
    $(".active").find(".option").removeClass("bg-success bg-danger");
}

function nextQuestion() {
    // reset timer
    timer.reset();
    // TODO reset question colors
    resetQuestionColors();
    $(".carousel").carousel("next");
}

$('.carousel').on('slid.bs.carousel', function () {
    if ($(".active").attr("class").includes("endQuestions")) {
        console.log("Last Slide");
        //display correct and wrong answers

        //reset all variables
        wins=0;
        losses=0;
    } else {
        timer.start();

    }
  })

$(document).on("click", ".option", answerChosen);