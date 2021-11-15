/**
 * 
 * AJAX code to run post loading: 
 *  - Call to text file
 *  - Call to the sites database
 * 
 * Notes:
 *  - Should read
 * 
 */

// AJAX http request object & SQL.js variables
let xhttp, updated;
let db, query, results, counter, out;


// Run code after page loads
$(document).ready(function() {


    // AJAX call on click
    $("#populate").click(function() {

        // Change heigth to auto if more than 2 articles
        let nArticles = ( $("article[class*='articles']").length + 1 );
        console.log(`${nArticles}`);
        if ( nArticles >= 2 && updated == undefined) {
            console.log("Changing heigth of articleDiv");
            $("#articleDiv").css("height", "auto");
            updated = 1;
        }


        // Update the article div with the get response text
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                $("#articleDiv").prepend(this.responseText);
            } else {
                console.log(`\nError updating articleDiv with AJAX call state = ${this.readyState}, status = ${this.status}`);
                console.log(`Response = ${this.response}`);
            }
        };

        // Get the article.txt
        xhttp.open("GET", "./article.txt", true);
        xhttp.send();

    });

    // AJAX call to db on click
    $("#query").click(function() {

        // Initalize request
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                // Instantiate db object from response
                console.log("\nSetting up database");
                db = new SQL.Database( new Uint8Array(this.response) );
        
                // Query and handle results with function
                counter = 0;
                query = "SELECT * from testing ORDER BY RANDOM();";
                results = db.exec(query);
                for(row of results[0]["values"]){
                    
                    // Template paragraph
                    out = `<p id="row-${counter}">Row ID = ${counter}, FirstName = ${row[0]}, LastName = ${row[1]}, Age = ${row[2]}</p>`;

                    // Handle placement: Not completely necessary given empty division but useful to know
                    if (counter == 0) {
                        $("#resultDiv").prepend(out);
                    } else {
                        $("#resultDiv").append(out);
                    }
                    counter++;
                }
                console.log(`Query complete with N rows = ${counter}`);
        
            } else {
                console.log(`\nError querying db with AJAX call state = ${this.readyState}, status = ${this.status}`);
                console.log(`Response = ${this.response}`);
            }
        };

        
        // Get database as an arraybuffer
        xhttp.open("GET", "testing.db", true);
        xhttp.responseType = 'arraybuffer';

        // Send request
        xhttp.send();

    });

});