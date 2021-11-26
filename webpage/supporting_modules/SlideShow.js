/**
 *  -> JSON Dataset much easier to work with and consider.
 * 
 *  -> Updated methods to allow moving between sections, and pages within sections.
 * 
 *  -> Methods for retriving the active page, active position and by Section-Page Key combo
 * 
 *  -> Attributes for moving around list of sectionIDs and pageIDs
 * 
 *  -> Much to do on documentation, try out buttons first :(
 */


/**
 *
 * Slide show class to better represent the slide object
 *
 */
class SlideShow {

    // Private field declarations
    #dataset;
    #sections = 0;
    #sectionPages = 0;
    #currentSection = -1;
    #currentPage = -1;
    #firstSection = -1;
    #lastSection= -1;
    #firstPage = -1;
    #lastPage = -1;
    #sectionIDs = [];
    #pageIDs = [];


    /**
     * Constructor
     */
    constructor() {
        this.#dataset = {};
        this.#sections = 0;
        this.#sectionPages = 0;
        this.#currentSection = -1;
        this.#currentPage = -1;
        this.#firstSection = -1;
        this.#lastSection = -1;
        this.#firstPage = -1;
        this.#lastPage = -1;
    }

    /**
     * Set #dataset attributes
     */
    setdataset(data) {
        this.#dataset = data;
        this.#currentSection = 0;
        this.#currentPage = 0;

        // Set IDs
        let firstSectionID = Object.keys(this.#dataset)[0];
        this.#sectionIDs = Object.keys(this.#dataset);
        this.#pageIDs = Object.keys(this.#dataset[firstSectionID]);

        // Set section
        this.#sections = Object.keys(this.#dataset).length;
        this.#lastSection = Object.keys(this.#dataset).length -1;

        // Assume pages to be read from first section
        this.#firstPage = 0;
        this.#lastPage = Object.keys(this.#dataset[firstSectionID]).length -1;

        

    }

    /**
     * Set page count for active section
     */
    setPages(section){
        this.#sectionPages = Object.keys(this.#dataset[section]).length - 1;
    }

    // 
    // Set positions
    // 
    /**
     * Method to set the current position to the
     * first element of the slide
     */
    goToFirstSection() {
        this.#currentSection = 0;
        this.#currentPage = 0;
        this.setPages( this.#currentSection );
    }

    /**
     * Method to set the current position to the
     * first element of the slide
     */
     goToFirstPage() {
        this.#currentPage = 0;
    }

    /**
     * Method to set the current position to the
     * last element of the slide
     */
    goToLastSection() {
        this.#currentSection = this.#sections;
        this.setPages( this.#currentSection );
    }
    goToLastPage(){
        this.#currentPage = this.#sectionPages;
    }


    /**
     * Method to set the current position to the
     * index of next element, or the first element
     * of #dataset if on the last position
     */
    goToNextPage() {

        // Increment while not on last position
        if ( this.#currentPage < this.#sectionPages ) {
            this.#currentPage++;

        } else {

            // Otherwise go to the first element
            this.goToFirstPage();
        }
    }

    /**
     * 
     * Method to go to next section and update the page count
     * 
     */
    goToNextSection() {

        // Increment while not on last position
        if ( this.#currentSection < this.#sections ) {
            this.#currentSection++;
            this.setPages( this.#currentSection );
        } else {

            // Otherwise go to the first element
            // Fuction automatically sets the page count
            this.goToFirstSection();
        }
    }

    /**
     * Method to set the current position to the
     * index of previous element, or the last element
     * of #dataset if on the first position
     */
    goToPreviousPage() {

        // Decrement while not on the first position
        if (this.#currentPage > 0) {
            this.#currentPage--;

        } else {

            // Otherwise go to the last
            this.goToLastPage();
        }
    }

    /**
     * 
     * Go to previous section and set the page count
     * 
     */
     goToPreviousSection() {

        // Increment while not on last position
        if ( this.#currentSection > 0 ) {
            this.#currentSection--;
            this.setPages( this.#currentSection );
        } else {

            // Otherwise go to the first element
            // Fuction automatically sets the page count
            this.goToLastSection();
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
        return [ this.#currentSection, this.#currentPage];
    }

    /**
     * Returns the element in list corresponding to the
     * current position
     * @returns dataType
     */
    getActiveElement() {
        let position, data, sectionID, pageID;
        position = this.getPosition();
        sectionID = this.#sectionIDs[ position[0] ];
        pageID = this.#pageIDs[ position[1] ];
        data = this.#dataset[sectionID][pageID];
        return data;
    }

    /**
     * 
     * Get the data for required section, page
     * 
     */
    getElementByKeys(section, page) {
        return this.#dataset[section][page];
    }

    /**
     * Get dataset
     */
    getDataset(){
        return this.#dataset;
    }
}

// Export class
export default SlideShow;