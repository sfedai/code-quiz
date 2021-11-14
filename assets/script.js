var Question_Current = 0;
var time_Initial = 75, time_Cur = 75;
var stage_cur = "main";

var HTML =
{
    topLeft: {
        mDiv: $("#top-left"),
        main: {
            mText: $("<u>").text("Highscores"),
            mClasses: "p-2",
            mID: "run-HS"
        },
        testing: {
            mText: $("<span>").text("Current Score : "),
            mClasses: "p-2",
            mID: "cur-score"
        },
        finished: {
            mText: $("<u>").text("Highscores"),
            mClasses: "p-2",
            mID: "run-HS"
        },
        highscores:
        {
            mText: $("<u>").text("Return to main"),
            mClasses: "p-2",
            mID: "run-main"
        }

    },

    topRight: {
        mDiv: $("#top-right"),
        main: {
            mText: $("<h6>").text("")
        },
        testing: {
            mText: $("<h6>").text("Time left : "),
            mID: "timer"
        },
        finished: {
            mText: $("<h6>").text("Time Left over : "),
            mID: "timer"
        },
        highscores:
        {
            mText: $("<h6>").text("")
        }
    },

    prompt: {
        mDiv: $("#prompt"),
        main: {
            mText: $("<h3>").text("Code Quiz"),
            mClasses: "mx-auto"
        },
        testing: {
            mText: [
                $("<h6>").text("1. Which of the following is NOT a commonly used data type?"),
                $("<h6>").text("2. An 'if' condition can be followed by what other condition?"),
                $("<h6>").text("3. Which of these languages is a superset of JavaScript?"),
                $("<h6>").text("4. What is Bootrap?"),
                $("<h6>").text("4. What is one benefit of using fat arrows?")
            ],
            mClasses: "ml-3"
        },
        finished: {
            mText: $("<h3>").text("Quiz Complete!"),
            mClasses: "mx-auto",
            mID : "prompt-text"
        },
        highscores: {
            mText: $("<h3>").text("Highscores"),
            mClasses: "mx-auto"
        }
    },

    buttonList: {
        mDiv: $("#button-list"),
        main: {
            mText: $("<button>").text("Start Quiz"),
            mClasses: "btn btn-primary mx-auto py-auto",
            mID: "start-btn"
        },
        testing: {
            mText: [
                $("<button>").text("B1"),
                $("<button>").text("B2"),
                $("<button>").text("B3"),
                $("<button>").text("B4")
            ],
            mClasses: "btn btn-primary my-2 col col-md-6 mx-md-2",
            mID: "btn",
            mAnswerSets:[
                ["A) strings", "B) booleans", "C) numbers", "D) alerts"],
                ["A) else", "B) otherwise", "C) instead", "D) or if"],
                ["A) C#", "B) Linux", "C) Java", "D) TypeScript"],
                ["A) A paid service", "B) A front-end framework", "C) A full-stack framework", "D) A programming language"],
                ["A) It contextualizes the function", "B) It makes the function an object", "C) It makes the function an event", "D) It's useless"]
            ],

            mAnswerSets_Correct:[
                4,
                1,
                4,
                2,
                1
            ]
        },
        finished: {
            mText: $("<input>").text("Initials"),
            mClasses: "input-group-text",
            mID: "input-initials",
            mAriaLabel: "initials"
        }
    },

    footer: {
        mDiv:$("#footer"),
        main: {

        },
        testing: {

        },
        finished: {

        }
    }
};

//----------FUNCTIONS----------//
//-----------------------------//

//Set up the elements of the 'main' display.
function SetMainElements() {
    stage_cur = "main";
    console.log("Setting up main elements...");
    HTML.topLeft.mDiv.empty();
    HTML.topRight.mDiv.empty();
    HTML.prompt.mDiv.empty();
    HTML.buttonList.mDiv.empty();


    var $iTopLeft = ModifyText(HTML.topLeft.main);
    HTML.topLeft.mDiv.append($iTopLeft);


    var $iTopRight = ModifyText(HTML.topRight.main);
    HTML.topRight.mDiv.append($iTopRight);

    var $iPrompt = ModifyText(HTML.prompt.main);
    HTML.prompt.mDiv.append($iPrompt);

    var $ibuttonList = ModifyText(HTML.buttonList.main);
    HTML.buttonList.mDiv.append($ibuttonList);
}

//Sets up the elements of the 'testing' display.
function SetTestingElements() {
    stage_cur = "testing";
    console.log("Setting up testing elements...");
    
    
    HTML.topLeft.mDiv.empty();
    HTML.topRight.mDiv.empty();
    HTML.prompt.mDiv.empty();
    HTML.buttonList.mDiv.empty();
    
    var $iTopLeft = ModifyText(HTML.topLeft.testing);
    HTML.topLeft.mDiv.append($iTopLeft);
    
    var $iTopRight = ModifyText(HTML.topRight.testing);
    HTML.topRight.mDiv.append($iTopRight);
    
    var $iPrompt = ModifyText(HTML.prompt.testing, 0);
    HTML.prompt.mDiv.append($iPrompt);
    
    for (var i = 0; i < HTML.buttonList.testing.mText.length; i++) {
        var $iButton = ModifyText(HTML.buttonList.testing, i);
        HTML.buttonList.mDiv.append($iButton);
    }
    
    RunQuiz(0);
    StartTimer();
}

//Sets up the elements of the 'finished' display.
function SetFinishedElements() {
    stage_cur = "finished";
    console.log("Setting up Finished elements...");
    HTML.topLeft.mDiv.empty();
    HTML.topRight.mDiv.empty();
    HTML.prompt.mDiv.empty();
    HTML.buttonList.mDiv.empty();

    var $iTopLeft = ModifyText(HTML.topLeft.finished);
    HTML.topLeft.mDiv.append($iTopLeft);

    var $iTopRight = ModifyText(HTML.topRight.finished);
    HTML.topRight.mDiv.append($iTopRight);
    
    var $iTimer = $("#timer");
    var $iSpan = $("<span>").text(time_Cur);
    $iTimer.append($iSpan);

    var $iPrompt = ModifyText(HTML.prompt.finished);
    HTML.prompt.mDiv.append($iPrompt);

    var $iButtonList = ModifyText(HTML.buttonList.finished);
    HTML.buttonList.mDiv.append($iButtonList);

    EndTimer(timer);
}

//Sets up the elements of the 'Highscores' display.
function SetHSElements() {
    stage_cur = "highscores";
    console.log("Setting up Highscore elements...");
    HTML.topLeft.mDiv.empty();

    var $iTopLeft = ModifyText(HTML.topLeft.highscores);
    HTML.topLeft.mDiv.append($iTopLeft);

    var $iTopRight = ModifyText(HTML.topRight.highscores);
    HTML.topRight.mDiv.append($iTopRight);
}

//Sets up the text to be appended to its Div.
function ModifyText(pPrefix, pIndex) {
    var $iDiv;

    if (!isNaN(pIndex)) {
        console.log("is a number");
        $iDiv = pPrefix.mText[pIndex];
    }
    else {
        $iDiv = pPrefix.mText;
    }

    $iDiv.attr("id", pPrefix.mID);
    $iDiv.attr("class", pPrefix.mClasses);
    $iDiv.attr("aria-label", pPrefix.mAriaLabel);
    $iDiv.attr("placeholder", pPrefix.mAriaLabel);

    return $iDiv;
}

//Iterates through each question of the quiz, channging the prompt and the answers.  Stops when it reaches the length of the questions available.
function RunQuiz(pIndex) {
    HTML.prompt.mDiv.empty();

    if (pIndex < HTML.prompt.testing.mText.length) {
        var $iQuestion = ModifyText(HTML.prompt.testing, pIndex);
        HTML.prompt.mDiv.append($iQuestion);
        
        for (var i = 0; i < HTML.buttonList.testing.mText.length; i++) {
            var iAnswer = HTML.buttonList.testing.mAnswerSets[pIndex][i];
            $(HTML.buttonList.mDiv.children()[i]).text(iAnswer);
        }
        
        Question_Current++;
        AssignCurrentRightAnswer(pIndex);
    }
    else {
        console.log("Quiz over");
        EndTimer();
        SetFinishedElements();
        Question_Current = 0;
    }
}

//Assigns an ID of "right-btn" to the button which is the correct answer for this question.
function AssignCurrentRightAnswer(pIndex)
{
    var rightAnswer = HTML.buttonList.testing.mAnswerSets_Correct[pIndex] - 1;

    if(!isNaN(rightAnswer))
    {
        //Set a reference to the array of children on our button list div
        var iChildren = HTML.buttonList.mDiv.children();

        //For each child within our button list, do...
        for(var i = 0; i < iChildren.length; i++)
        {
            //If this iteration is equal to the right answer, then set the ID to the right answer
            if(i === rightAnswer)
            {
                $RightButton = $(HTML.buttonList.mDiv.children()[i]);

                $RightButton.attr("id", "right-btn");
            }
            //Else, remove the ID: this will indicate that it is a wrong answer
            else
            {
                $WrongButton = $(HTML.buttonList.mDiv.children()[i]);

                $WrongButton.attr("id", "");
            }
        }
    }
    else
    {
        console.error("Attempting to grab a 'rightAnswer' which is not a number");
    }
}

/*Time functions*/
/****************/

function StartTimer()
{
    time_Cur = time_Initial;
    $timer = $("#timer");
    $span = $("<span>").text(time_Cur);
    $timer.append($span);

    timer = setInterval(function()
    {
        time_Cur--;

        $span.text(time_Cur);
        
        if(time_Cur <= 0)
        {
            time_Cur = 0;
            TimeUp();
        }

    }, 1000)
}

function EndTimer()
{
    clearInterval(timer);
}

function TimeUp()
{
    clearInterval(timer);
    SetFinishedElements();

    $("#prompt-text").text("No Time!");
}

function DeductTime()
{
    time_Cur -= 15;
}


//----------MAIN----------//
//------------------------//

//A prompt for testing which triggers the previous functions.
switch (prompt("Input run 0-3")) {
    case "0":
        SetMainElements();
        break;
    case "1":
        SetTestingElements();
        break;
    case "2":
        SetFinishedElements();
        break;
    case "3":
        SetHSElements();
        break;
}

//----------EVENTS----------//
//--------------------------//


//Adds a click event to the HTML element identified as '#btn-start'
//This event will begin the function 'SetTestingElements'
// $("#btn-start").on("click", function (e) {
//     SetTestingElements();
// })

$("#top-left").on("click", function (e) {
    var $target = $(event.target);
    var $target_ID = $(event.target).attr("id");

    switch ($target_ID) {
        case "run-main":
            SetMainElements();
            break;
        case "run-HS":
            SetHSElements();
            break;
    }
})

$("#button-list").on("click", function (e) {
    var $target = $(event.target);
    var $target_ID = $(event.target).attr("id");

    switch ($target_ID) {
        case "start-btn":
            SetTestingElements();
            break;
        case "right-btn":
            alert("You're right!");
            RunQuiz(Question_Current);
            break;
        case "input-initials":
            break;
        default:
            if(stage_cur === "testing")
            {
                alert("Wrong answer");
                RunQuiz(Question_Current);
                DeductTime();
            }
            break;
    }
})