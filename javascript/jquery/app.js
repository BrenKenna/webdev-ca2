// Import the slideshow
import SlideShow from './SlideShow.js';



// Instantiate
let paragraphData = [
    "<p class=\"sildePara\" id=\"slide\">I am another paragraph 1</p>",
    "<p class=\"sildePara\" id=\"slide\">I am another paragraph 2</p>",
    "<p class=\"sildePara\" id=\"slide\">I am another paragraph 3</p>",
    "<p class=\"sildePara\" id=\"slide\">I am another paragraph 4</p>",
    "<p class=\"sildePara\" id=\"slide\">I am another paragraph 5</p>",
    "<p class=\"sildePara\" id=\"slide\">I am another paragraph 6</p>"
];
let slides = new SlideShow();
slides.setdataset(paragraphData);
console.dir(slides, {depth: null});


// Responsive buttons after page is loaded
$(document).ready( function() {

    /**
     * 
     * Play with the blue box
     *    - To Animate changes in the $().css();
     * 
     */

    // Expand the blue box
    $("#expandButton").click( function() {
        console.log("Changing size of blue box");
        $("#blueBox").animate({
            width: "600px"
        }, 1000);
    });

    // Retract the blue box
    $("#retractButton").click( function() {
        console.log("Retracting blue box");
        $("#blueBox").animate({
            width: "400px"
        }, 1000);
    });


    /**
     * 
     * Play with the red box
     *    - Manipulate CSS properties
     *    - Tying these changes with HTML changes
     * 
     */

    // Change invisible box
    $("#visibleButton").click( function() {
        $("#invisbleBox").css("display", "inline");
        $("#MoveButton").css("display", "inline");
    });

    // Move the invisible box
    $("#MoveButton").click( function() {

        // Prepend the invisble box to the blue box
        let invisBox = $("#invisbleBox").html();
        $("#invisbleBox").remove();
        $("#blueBox").prepend(invisBox);
    } );

    /**
     * 
     * Play with the yellow box
     *    - "Wrapping acquired" content in html
     *    - Inserting / dropping content
     */

    // Div to insert
    let yellowBoxDiv = `
        <div id="insertBox">
            <p>Hello I just got here</p>
        </div>
    `;

    // Insert into yellow box
    $("#updateButton").click( function() {
        $("#yellowBox").prepend(yellowBoxDiv);
    });

    // Drop the inserted box
    $("#resetButton").click( function() {
        $("#insertBox").remove();
    });


    /**
     * 
     * Play with green box
     *    - Handling active properties
     */

    // Handle showing or hiding box
    $("#showHideButton").click( function () {

        // Get current display property
        let greenDisplay = $("#greenBox").css("display");

        // Handle action
        if (greenDisplay == "none") {

            // Display if hidden
            $("#greenBox").show(1000);

        } else {

            // Otherwise hide
            $("#greenBox").hide(1000);
        }
    });

    /**
     * 
     * Play with slide show
     *    - Tying JS object states to HTML content
     * 
     */

    // Handle forward
    $("#nextSlide").click( function() {

        // Handle moving about list logically
        slides.goToNext();

        // Set content of span
        $("#active").text(slides.getPosition() + 1);
        $("#slide").replaceWith(slides.getActiveElement());
    });

    // Handle backward
    $("#prevSlide").click(function() {

        // Handle moving about list logically
        slides.goToPrevious();

        // Set content of span
        $("#active").text(slides.getPosition() + 1);
        $("#slide").replaceWith(slides.getActiveElement());
    });
});