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
 * Slide show class to synchronize with the TV-Div and automatically
 * walk along the keys of retrived JSON store. Setions are akin to 
 * movie genres, and pages are akin to movies of a genre. All sectionIDs
 *  are stored in an array, and the pages array is updated depending 
 * on the acive section.
 * 
 * All movements around the section & page arrays are circular. Meaning,
 * first backwards moves to the last, and move forwards from the last,
 * navigates to the first.
 *
 */
class SlideShow {

    // Private field declarations
    #dataset;
    #sections = 0;
    #sectionPages = 0;
    #currentSection = -1;
    #currentPage = -1;
    #sectionIDs = [];
    #pageIDs = [];


    /**
     * 
     * Default constructor does not need a dataset. More for debugging
     *  purposes to see how things work different structures etc.
     * 
     */
    constructor() {
        this.#dataset = {};
        this.#sections = 0;
        this.#sectionPages = 0;
        this.#currentSection = -1;
        this.#currentPage = -1;
    }

    /**
     * Set the dataset attribute, and set the active position 
     * to be the first page of the first section.
     * 
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
        this.#sections = this.#sectionIDs.length-1;
        this.#sectionPages = this.#pageIDs.length-1;
    }

    /**
     * Set page data for the required section
     * 
     */
    setPages(section){
        let sectionID = Object.keys(this.#dataset)[section];
        this.#pageIDs = Object.keys(this.#dataset[sectionID]);
        this.#sectionPages = this.#pageIDs.length-1;
    }

    /**
     * Go to a specific page in a specific section
     * 
     */
    goToPage(section, page) {

        // Set section
        this.#currentSection = this.#sectionIDs.indexOf(section);
        this.setPages( this.#currentSection );

        // Set page in section
        this.#currentPage = this.#pageIDs.indexOf(page);

    }

    /**
     * Go to the first page of a specific section
     */
    goToSection(section) {

        // Set section
        this.#currentSection = this.#sectionIDs.indexOf(section);
        this.setPages( this.#currentSection );
        this.#currentPage = 0;
    }


    /**
     * Method to set the current position to the
     * first section of the slide
     */
    goToFirstSection() {
        this.#currentSection = 0;
        this.#currentPage = 0;
        this.setPages( this.#currentSection );
    }

    /**
     * Method to set the current position to the
     * first page of the slide
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
        this.#currentPage = 0;
        this.setPages( this.#currentSection );
    }
    goToLastPage(){
        this.#currentPage = this.#sectionPages;
    }


    /**
     * Method to set the current page to be the
     * index of next element in the page array, 
     * or the first page is moving from the last one
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
     * Method to go to next section and update the page position
     * 
     */
    goToNextSection() {

        // Increment while not on last position
        if ( this.#currentSection < this.#sections ) {
            this.#currentSection++;
            this.goToFirstPage();
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
     * Go to previous section and set the page position
     * 
     */
     goToPreviousSection() {

        // Increment while not on last position
        if ( this.#currentSection > 0 ) {
            this.#currentSection--;
            this.setPages( this.#currentSection );
            this.goToFirstPage();
        } else {

            // Otherwise go to the first element
            // Fuction automatically sets the page count
            this.goToLastSection();
        }
    }


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
     * 
     * @returns Key-Value pair of current page
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
     * Get the key-value pair of the page within 
     * a section.
     * @returns Key-Value pair
     */
    getElementByKeys(section, page) {
        return this.#dataset[section][page];
    }

    /**
     * Get the SlideShow dataset
     * 
     * @returns JSON object
     */
    getDataset(){
        return this.#dataset;
    }
}

// Export class
export default SlideShow;