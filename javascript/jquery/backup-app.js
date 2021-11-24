/**
 * jQuery Divs and Buttons :)
 * 
 * Slide show object:
 *   - Basically a quicker linked list for starting out.
 *   - Be good dynamically alter "data" attribute as needed
 */

/**
 * 
 * Slide show class to better represent the slide object
 * 
 */

class SlideShow{

    /**
     * Constructor
     */
    constructor(){
        this.dataset = [];
        this.currentPos = -1;
        this.firstPos = 0;
        this.lastPos = 0;
    }

    /**
     * Set dataset attributes
     */
    setDataset(data){
        this.dataset = data;
        this.currentPos = 0;
        this.lastPos = this.dataset.length - 1;
    }
    updateDataset(dataPoint){
        this.dataset.push(datapoint);
        this.lastPos = this.dataset.length - 1;
    }
    dropDatapoint(dataPoint){
        let dataLocation = this.dataset.indexOf(dataPoint);
        if(dataLocation >= 0){
            this.dataset.splice(dataLocation);
            this.lastPos = this.dataset.length - 1;
        }
    }

    // 
    // Set positions
    // 

    /**
     * Method to set the current position to the
     * first element of the slide
     */
    goToFirst(){
        this.currentPos = 0; 
    }

    /**
     * Method to set the current position to the
     * last element of the slide
     */
    goToLast(){
        this.currentPos = this.dataset.length - 1;
    }


    /**
     * Method to set the current position to the
     * index of next element, or the first element
     * of dataset if on the last position
     */
    goToNext(){

        // Increment while not on last position
        if(this.currentPos < this.lastPos) {
            this.currentPos++;

        } else{

            // Otherwise go to the first element
            goToFirst();
        }
        
    }

    /**
     * Method to set the current position to the
     * index of previous element, or the last element
     * of dataset if on the first position
     */
    goToPrevious(){

        // Decrement while not on the first position
        if(this.currentPos > 0) {
            this.currentPos--;

        } else{

            // Otherwise go to the last
            this.goToLast();
        }
    }

    // 
    // Get attributes
    //

    /**
     * Method to return the current position in dataset
     * 
     * @returns Current Position in the dataset as integer
     */
    getPosition(){
        return this.currentPos;
    }

    /**
     * Returns the element in list corresponding to the
     * current position
     * @returns dataType
     */
    getActiveElement(){
        return this.dataset[getPosition];
    }
}


// Instantiate
let paragraphData = [
    "<p class=\"sildePara\" id=\"slide\">I am another paragraph 1</p>",
    "<p class=\"sildePara\" id=\"slide\">I am another paragraph 2</p>",
    "<p class=\"sildePara\" id=\"slide\">I am another paragraph 3</p>",
    "<p class=\"sildePara\" id=\"slide\">I am another paragraph 4</p>",
    "<p class=\"sildePara\" id=\"slide\">I am another paragraph 5</p>",
    "<p class=\"sildePara\" id=\"slide\">I am another paragraph 6</p>"
];
let slidesV2 = new SlideShow();
SlideShow.setDataset(paragraphData);



// Object for slide show
let slides = {

    // Can also just store the text, for $("#slide").text(slides.data[XXX])
    data: [
        "<p class=\"sildePara\" id=\"slide\">I am paragraph 1</p>",
        "<p class=\"sildePara\" id=\"slide\">I am paragraph 2</p>",
        "<p class=\"sildePara\" id=\"slide\">I am paragraph 3</p>",
        "<p class=\"sildePara\" id=\"slide\">I am paragraph 4</p>",
        "<p class=\"sildePara\" id=\"slide\">I am paragraph 5</p>",
        "<p class=\"sildePara\" id=\"slide\">I am paragraph 6</p>"
    ],
    currentPos: -1,
    lastPos: 5,
    firstPos: 0
};


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
        slides.currentPos++;
        if ( slides.currentPos > slides.lastPos) {
            slides.currentPos = slides.firstPos;
        }

        // Set content of span
        $("#active").text(slides.currentPos + 1);
        $("#slide").replaceWith(slides.data[slides.currentPos]);
    });

    // Handle backward
    $("#prevSlide").click(function() {

        // Handle moving about list logically
        slides.currentPos--;
        if ( slides.currentPos < slides.firstPos) {
            slides.currentPos = slides.lastPos;
        }

        // Set content of span
        $("#active").text(slides.currentPos + 1);
        $("#slide").replaceWith(slides.data[slides.currentPos]);
    });
});