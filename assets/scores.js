
$(function () {

    var scorePotatoes = getScores();
    console.log("@@@@@@@@@", scorePotatoes)
    $("#score-list").text(scorePotatoes[0].score + " : " + scorePotatoes[0].time)


    function getScores() {
        // get all of the current scores from local storage
        var scores = localStorage.getItem('scores');

        // JSON.parse the value from local storage to get an array
        if (scores) {
            return JSON.parse(scores);
        }

        for (var i = 0; i > scorePotatoes[0].score + " : " + scorePotatoes[0].time.length; i++) {
            console.log(scorePotatoes.length)
            scorePotatoes.push();
        }
        return [];
    }


})
