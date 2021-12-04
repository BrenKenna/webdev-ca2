/**
 * 
 * Supporting functions to swap the TV-Div-Screen between
 * a loader for getting the database and pending results
 * content.
 * 
 * Really should shape towards a SlideShow-Utils.js
 * 
 */

// Set the loader
function set_TV_Loader() {

    // Clear present & define content
    $(".tv-screen").empty();
    let content = `
        <div class="loaderHolder">
            <div class="loader"></div>
            <p id="loaderText">Fetching database...</p>
        </div>
    `;
    $(".tv-screen").html(content);
} 

// Set the pending results
function set_TV_PendingResults() {

    // Set TV-Screen Content
    $(".tv-screen").empty();
    let content = `
        <!-- Header / Query Label -->
        <div id="blockTitle" class="text-center tv-item">
            <h3 id="blockHeading" class="modal-title"></h3>
        </div>

        <!-- Query Code Block -->
        <div id="queryBlock" class="tv-item">
            <p class="text-justify" id="queryText"></p>
        </div>

        <!-- Results -->
        <div id="resultsBlock" class="tv-item">

            <!-- Simple Table -->
            <table id="resultsTable" class="table">
                <thead id="colHead"><br><br><span id="tempTab">Press the Run Query Button</span></thead>
                <tbody id="resultsBody"><br><span id="tempTab">To view your results</span></tbody>
            </table>
        </div>
    `;

    // Set tv-screen content
    $(".tv-screen").html(content);
}


/**
 * Function to handle displaying alerts
 *  if database is not loaded
 * 
 * function manageNav(dbLoaded) {}
 * 
 */

/**
 * Set target content to be active position
 * Target = "#blockHeading",
 * Key = data["Label"]
 * 
 */
function setTargetContent(slides, target, key) {

    // Update content from the TV-Div
    let data = slides.getActiveElement();
    $(target).text( data[key] );
}

/**
 * Function to default the results block html
 * 
 */
function default_ResultsBlock(){
    $("#resultsBlock").html(`
        <!-- Simple Table -->
        <table id="resultsTable" class="table">
            <thead id="colHead"><br><br><span id="tempTab">Press the Run Query Button</span></thead>
            <tbody id="resultsBody"><br><span id="tempTab">To view your results</span></tbody>
        </table>
    `);
}


/**
 * Function to print alert message
 */
function navAlert() {
    window.alert("Warning! Cannot interact with the database while it is loading, or navigate while a query is pending");
}

// Export functions
export {set_TV_Loader, set_TV_PendingResults, setTargetContent, default_ResultsBlock, navAlert};