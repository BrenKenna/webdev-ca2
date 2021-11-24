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
class SlideShow {

    // Private field declarations
    #dataset;
    #currentPos = -1;
    #firstPos = 0;
    #lastPos = 0;

    /**
     * Constructor
     */
    constructor() {
        this.#dataset = [];
        this.#currentPos = -1;
        this.#firstPos = 0;
        this.#lastPos = 0;
    }
s
    /**
     * Set #dataset attributes
     */
    setdataset(data) {
        this.#dataset = data;
        this.#currentPos = 0;
        this.#lastPos = this.#dataset.length - 1;
    }
    updatedataset(dataPoint) {
        this.#dataset.push(datapoint);
        this.#lastPos = this.#dataset.length - 1;
    }
    dropDatapoint(dataPoint) {
        let dataLocation = this.#dataset.indexOf(dataPoint);
        if (dataLocation >= 0) {
            this.#dataset.splice(dataLocation);
            this.#lastPos = this.#dataset.length - 1;
        }
    }

    // 
    // Set positions
    // 
    /**
     * Method to set the current position to the
     * first element of the slide
     */
    goToFirst() {
        this.#currentPos = 0;
    }

    /**
     * Method to set the current position to the
     * last element of the slide
     */
    goToLast() {
        this.#currentPos = this.#dataset.length - 1;
    }


    /**
     * Method to set the current position to the
     * index of next element, or the first element
     * of #dataset if on the last position
     */
    goToNext() {

        // Increment while not on last position
        if (this.#currentPos < this.#lastPos) {
            this.#currentPos++;

        } else {

            // Otherwise go to the first element
            this.goToFirst();
        }

    }

    /**
     * Method to set the current position to the
     * index of previous element, or the last element
     * of #dataset if on the first position
     */
    goToPrevious() {

        // Decrement while not on the first position
        if (this.#currentPos > 0) {
            this.#currentPos--;

        } else {

            // Otherwise go to the last
            this.goToLast();
        }
    }

    // 
    // Get attributes
    //
    /**
     * Method to return the current position in #dataset
     *
     * @returns Current Position in the #dataset as integer
     */
    getPosition() {
        return this.#currentPos;
    }

    /**
     * Returns the element in list corresponding to the
     * current position
     * @returns dataType
     */
    getActiveElement() {
        return this.#dataset[ this.getPosition() ];
    }
}

// Export class
export default SlideShow;