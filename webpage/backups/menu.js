/**
 * 
 * Populate menu with ajax calls
 * 
 */

// Initalize required variables
let xhttp, updated;
let db, query, results, counter, out;
let sectionID = 0;
let queryID = 0;
let menuID = `s${sectionID}q${queryID}`;

// Setup data object
cms = new Map([
    ["Section1", new Map()],
    ["Section2", new Map()],
    ["Section3", new Map()],
]);

// Run ajax call after loading
$("#sidebar").ready(function () {

    // Update the sidebar
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        // Populate the menu
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {

                // Populate each section
                for(cmsEntry of this.responseText.split('\n') ) {
                    
                    // Setup section data
                    sectionID = cmsEntry.split("|")[0];
                    queryID = cmsEntry.split('|')[1];
                    queryLabel = cmsEntry.split('|')[2];
                    query = cmsEntry.split('|')[3];

                    // Handle updating in memory CMS
                    console.log("Updated " + sectionID);
                    cms.get(sectionID).set(queryID, new Map());
                    cms.get(sectionID).get(queryID).set("QueryLabel", queryLabel);
                    cms.get(sectionID).get(queryID).set("Query", query);
                }
                
                // Update the side bar
                for(section of cms.keys()){
                    console.log("Printing the data for " + section + ":");
                    for(sectionQuery of cms.get(section).keys()) {
                        menuID=`${section}_${sectionQuery}`;
                        $(`#${menuID}`).text( cms.get(section).get(sectionQuery).get("QueryLabel") );
                    }
                }
                
            } else {
                console.log(`\nError updating articleDiv with AJAX call state = ${this.readyState}, status = ${this.status}`);
                console.log(`Response is a '${typeof(this.responseText)}'`);
            }

        };

        // Get the CMS
        xhttp.open("GET", "./queries/queries.txt", true);
        xhttp.send();

    });

});