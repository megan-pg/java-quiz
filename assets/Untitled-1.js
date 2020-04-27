
$(function () {
    $('#view-scores').on('click', function () {
        var scorePotatoes = getScores();
        console.log("@@@@@@@@@", scorePotatoes)
        $("#score-list").text(scorePotatoes)

    });

    function getScores() {
        // get all of the current scores from local storage
        var scores = localStorage.getItem('scores');

        // JSON.parse the value from local storage to get an array
        if (scores) {
            return JSON.parse(scores);
        }

        return [];
    }
})