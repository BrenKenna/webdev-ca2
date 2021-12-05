/**
 * Functions to get content:
 *  -> Quite a bit to figure out post-CA to make work efficiently
 */
import SlideShow from './SlideShow.js';
import {set_TV_PendingResults, setTargetContent} from './set-tv-content.js';


/**
 * Function to get the query store and return
 * an populate the SlideShow with the dataset
 */
function getQueryStore() {

    // Initalize variables
    let xhttp, slides;
    slides = new SlideShow();

    // Send get request for index.html content
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./queries/queries.json", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {

        // Update when ready
        // Encountered issues when encapsulated within CMS.js
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the slides object
            slides.setdataset( JSON.parse(xhttp.responseText) );
            window.alert("Dataset was imported into the slides");

            // Iterate over the sections
            for( sectionID in slides.getDataset() ) {

                // Setting the query label
                for(queryID in slides.getDataset()[sectionID] ) {
                    menuID=`${sectionID}_${queryID}`;
                    $(`#${menuID}`).text( slides.getDataset()[sectionID][queryID]["Label"] )
                }
            }

            // Return the SlideShow object
            return slides;
        };
    };
}


/**
 * Function to get the database
*/
function getDatabase() {

    // Request database
    let xhttp, empDB;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./database/employees.db", true);
    xhttp.responseType = 'arraybuffer';
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Instantiate db object from response
            console.log("\nSetting up database");
            empDB = new Uint8Array(xhttp.response);
            set_TV_PendingResults();
            
            // Update content from the TV-Div
            setTargetContent(slides, "#blockHeading", "Label");
            setTargetContent(slides, "#queryBlock", "Query");
            databaseLoaded = true;
            return empDB;
        }
    };
}

// Export functions
export {getQueryStore, getDatabase} ;