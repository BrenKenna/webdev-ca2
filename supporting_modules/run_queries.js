/**
 * Get database:
 *  wget https://github.com/siara-cc/employee_db/raw/master/employees.db.bz2
 * 
 * Unzip:
 *  bzip2 -d employees.db.bz2 
 * 
 * - Figure out optimizing handling the database after all button 
 *   functionality has been implemented.
*/

/**
 * Function to manage running queries to the connected database
 * & and delivery the results as content to the TV-Div
 */
 function manageQueries(binArrayDB, query) {

    // Initial needed variables & inform user of table loading
    let con, counter, results, row, columns, out, colHead, col, data;
    console.log(query);

    // Create connection
    con = new SQL.Database(binArrayDB);
    binArrayDB = null;

    // Reset table
    $("#resultsBlock").html(`
        <table id="resultsTable" class="table">
            <thead id="colHead"></thead>
            <tbody id="resultsBody"></tbody>
        </table>
    `);

    // Run query: stmnt.free()
    results = con.exec(query);
    con.close();
    columns = results[0]["columns"];

    /**
     * Serve the colHead content
    */
    colHead = `<tr><th scope="col">#</th>`;
            
    // Loop through columns
    for(col of columns) {
        colHead = `${colHead}<th scope="col">${col}</th>`;
    }

    // Close colHead
    colHead = colHead + "</tr>";

    // Set content and clear table body
    $("#colHead").html(colHead);

    // Handle pushing a count
    counter = 1;
    data = [];
    if(results[0]["values"].length == 1 ) {

        // Initalize count row
        console.log("Pushing count");
        row = results[0]["values"][0];
        out = `<tr><th scope="row">${counter}</th>`;

        // Add each column to the row
        for (col of row){
            out = out + `<td>${col}</td>`;
        }

        // Close row
        out = out + `</tr>`;

        // Add to the data object
        data.push(out);
        $("#resultsBody").html(data.toString());

    } else {

        // Otherwise the handle results as a table
        console.log("Pushing rows");
        for(row of results[0]["values"]){

            // Initalize the row
            out = `<tr><th scope="row">${counter}</th>`;

            // Add each column to the row
            for (col of row){
                out = out + `<td>${col}</td>`;
            }

            // Close row
            out = out + `</tr>`;
            data.push(out);

            // Handle placement: Not completely necessary given empty division but useful to know
            if (data.length == 5 ) {
                console.log(`Pushing next batch of table rows`);
                if(counter == 5) {
                    $("#resultsBody").html(data.toString());
                }
                else {
                    $("#resultsBody").append(data.toString());
                }
                data = [];
            }
            counter++;
        }
    }

    // Clean up
    data = [];
    results = null;
    console.log(`Query complete with N rows = ${counter-1}`);
}


/**
 * Function to manage running queries to the connected database
 * & and delivery the results as content to the TV-Div
 */
function manageQueries_old(query) {

    // Initial needed variables & inform user of table loading
    let xhttp, db, counter, results, row, columns, out, colHead, col, data;
    console.log(query);
    $("#resultsBlock").html(`<br><br><h4>Results Pending</h4>`);

    // Instantiate xhttp & send request for SQLite DB as an array buffer
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./database/employees.db", true);
    xhttp.responseType = 'arraybuffer';
    xhttp.send();

    // Handle the request response
    xhttp.onreadystatechange = function() {

        // Only go forward on a successful request
        if (this.readyState == 4 && this.status == 200) {
                
            // Instantiate db object from response
            console.log("\nSetting up database");
            db = new SQL.Database( new Uint8Array(xhttp.response) );

            // Reset table
            $("#resultsBlock").html(`
                <table id="resultsTable" class="table">
                    <thead id="colHead"></thead>
                    <tbody id="resultsBody"></tbody>
                </table>
            `);

            // Run query
            counter = 1;
            results = db.exec(query);
            db.close();
            columns = results[0]["columns"];

            /**
             * Serve the colHead content
             */
            colHead = `<tr><th scope="col">#</th>`;
            
            // Loop through columns
            for(col of columns) {
                colHead = `${colHead}<th scope="col">${col}</th>`;
            }

            // Close colHead
            colHead = colHead + "</tr>";

            // Set content and clear table body
            $("#colHead").html(colHead);

            // Serve results to tableDiv
            data = [];
            for(row of results[0]["values"]){
                
                // Initalize the row
                out = `<tr><th scope="row">${counter}</th>`;

                // Add each column to the row
                for (col of row){
                    out = out + `<td>${col}</td>`;
                }

                // Close row
                out = out + `</tr>`;

                // Add to the data object
                data.push(out);

                // Handle placement: Not completely necessary given empty division but useful to know
                if (data.length == 5 ) {
                    console.log(`Pushing next batch of table rows`);
                    if(counter == 5) {
                            $("#resultsBody").html(data.toString());
                    }
                    else {
                            $("#resultsBody").append(data.toString());
                    }
                    data = [];
                }

                // Handle pushing a count
                if(results[0]["values"].length == 1 ) {
                    console.log("Pushing count");
                    $("#resultsBody").html(data.toString());
                }
                counter++;
            }
            console.log(`Query complete with N rows = ${counter-1}`);

            // Clean up
            data = [];
            results = null;
            db = null;   
        }
    };
}


/**
 * Read database from local storage path.
 *  Not exported because copy & paste is buggey
 *   and too hard to read for now... Must not want folks doing it :(
 */
 function readDatabase (dbPath) {
	var l = dbPath.length,
	arr = new Uint8Array(l);
	for (var i=0; i<l; i++) arr[i] = dbPath.charCodeAt(i);
	return arr;
}


// Export the manage queries function
export {manageQueries, manageQueries_old};