var questions = [
    {
        prompt:"What is the primary purpose of a primer in makeup?\n(a) Moisturizing\n(b) Enhancing Fragrance\n(c) Preparing the Skin for Makeup\n(d) Adding Color",
        answer:"c" 

    },
    {
        prompt:"Which vitamin is often associated with promoting healthy skin?\n(a) Vitamin A\n(b) Vitamin C\n(c) Vitamin K\n(d) Vitamin D",
        answer:"b"

    },
    {
        prompt:"Which makeup product is commonly used to add a natural flush to the cheeks?\n(a) Lip Gloss\n(b) Highlighter\n(c) Blush\n(d) Setting Spray",
        answer:"c"

    },
    {
        prompt:"What is the essential function of a cleanser in skincare?\n(a) Removing Impurities and Makeup\n(b) Adding Fragrance\n(c) Moisturizing\n(d) Sunscreen",
        answer:"a"

    },
    {
        prompt:"What is the main function of a hair conditioner?\n(a) Cleansing\n(b) Styling\n(c) Coloring\n(d) Moisturizing ",
        answer:"c"

    }
];

var score = 0;
var points = 0;

for (var i = 0; i < questions.length; i++) {
    var response = window.prompt("Question" + (i + 1) + ": " + questions[i].prompt + "\n\nSelecet the correct answer out of a,b,c and d.....");

    if (response && response.toLowerCase() === questions[i].answer.toLowerCase()){
        score++;
        points+=2;
        alert("Your answer is Correct");
    } else{
        alert("Your answer is Wrong");
    }
}
alert("You got " + score + "/" + questions.length + " Correct")
if (score != 0){
    alert("You have earned " + points + " points!!! \nPlease claim the points in your next purchase");}