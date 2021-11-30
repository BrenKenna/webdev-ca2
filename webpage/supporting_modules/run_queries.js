/**
 * Get database:
 *  wget https://github.com/siara-cc/employee_db/raw/master/employees.db.bz2
 * 
 * Unzip:
 *  bzip2 -d employees.db.bz2 
 * 
 * - Figure out optimizing handling the database after all button 
 *   functionality has been implemented.
 *
 */


/**
 * Function to fetch database to run query.
 * The combo used here is really slow, can see why they
 * used a worker. So perhaps better to incorporate fetching 
 * & connecting to the database as part of the loading.
 * 
 */
function manageQueries(query, activeQuery) {

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
            activeQuery = false;
            return activeQuery;      
        }
    };
}

// Export the manage queries function
export default manageQueries;