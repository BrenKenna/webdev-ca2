/**
 * 
 * Class destined to be swallowed by slide-show
 *  -> Help transition from reading and populating web page.
 *  -> To then navigating and fetching more content.
 * 
 */

class CMS {

    // Properties
    dataset;

    /**
     * Constructor
     */
    constructor(){
        this.dataset = new Map([
            ["Section1", new Map()],
            ["Section2", new Map()],
            ["Section3", new Map()],
        ]);
    }

    /**
     * 
     * Get dataset
     * 
     */
    getDataset(){
        return this.dataset;
    }

    /**
     * 
     * Populate the in-memory cms from xhttp response
     * @param response
     */
    setContent(response) {

        // Initalize variables
        let cmsEntry, sectionID, query, queryID, queryLabel;

        // Populate each section
        for(cmsEntry of response.split('\n') ) {
                    
            // Setup section data
            sectionID = cmsEntry.split("|")[0];
            queryID = cmsEntry.split('|')[1];
            queryLabel = cmsEntry.split('|')[2];
            query = cmsEntry.split('|')[3];

            // Handle updating in memory CMS
            console.log("Updated " + sectionID);
            this.getDataset().get(sectionID).set(queryID, new Map());
            this.getDataset().get(sectionID).get(queryID).set("QueryLabel", queryLabel);
            this.getDataset().get(sectionID).get(queryID).set("Query", query);
        }
    }

    /**
     * Update target content
     *  -> Format = sectionID_queryID
     */
    updateLabeledContent(){

        // Initalize variables
        let section, sectionQuery, menuID;

        // Populate the menu bar
        for(section of this.getDataset().keys()){
            console.log("Printing the data for " + section + ":");
            for(sectionQuery of this.getDataset().get(section).keys()) {
                menuID=`${section}_${sectionQuery}`;
                $(`#${menuID}`).text( this.getDataset().get(section).get(sectionQuery).get("QueryLabel") );
            }
        }
    }
}

// Export module
export default CMS;