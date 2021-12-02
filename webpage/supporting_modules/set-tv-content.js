/**
 * 
 * Supporting functions to swap the TV-Div-Screen between
 * a loader for getting the database and pending results
 * content
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
        <div id="queryBlock" class="tv-item text-justify">
            <p id="queryText"></p>
        </div>

        <!-- Results -->
        <div id="resultsBlock" class="tv-item">

            <!-- Simple Table -->
            <table id="resultsTable" class="table">
                <thead id="colHead"><br><br>Press the Run Query Button</thead>
                <tbody id="resultsBody"><br>To view your results</tbody>
            </table>
        </div>
    `;

    // Set tv-screen content
    $(".tv-screen").html(content);
}


// Export functions
export {set_TV_Loader, set_TV_PendingResults};