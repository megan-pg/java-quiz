# java-quiz
The purpose of this activity is to have a quiz that removed time from the clock as the player answered questions. If the
question was correct, the player recieved a point. If the player was wrong, the player would lose 10 seconds from the clock. 
The player has a total of 60 seconds to complete the game.
The player must answer 4 questions about the topic Star Trek: Deep Space Nine.
The player should be able to see a list of all the scores played by the player (this is not actually true).

The overall goal was to have a background image of space and space themed css stylings, but trying to make the quiz work took
a large lift. So the page is incredibly boring.

The introduction (intro id) hides when the start game button is clicked - this is accomplished with an addEventListener. Once
clicked, the questions appear. The are generated via a for loop that contains a for loop due to the Javascript containing 
an array with multiple arrays in it. I had orginally started with objects, but the for loops could only see the oject, but
not pull anything within them.

There is a mixture of Javascript and Jquery because my tutor initiated the use of Jquery and it became difficult to backtrack
to correct.

The view scores page requires more attention because the for loop isn't working. When I play several games and view, I can 
only see the the first index displayed, dispite the local storage containing 35+ indexes.

The Play Again button takes you back to the begining. 
