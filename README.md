# webdev-ca2
Web app for the supplied database where a javascript app is used to responsively query this database, and pass content + stylings to browser to update the client side.

Storing the required queries to execute in a separate database, with each section being its own auto-incremented table, can serve to tone down on the amount of total content to ideally one HTML page. For instance a bootstrap sidebar / jQuery-UI accordion can be populated with these tables, and the queries to run stored in an object / means to acquire as per the "*javascript/jquery/buttons.html*" page's slide.

Each query and their results can then be sent to a "*TV*" like div broken into one section for the query and another for the results. The TV could also have buttons for switching between the major sections, going to a new section should update the title of the page. Then the "*run all*" button can just channel surf through each query of each section for a set amount of time (~30s results display per query). Would also be nice to link this activity to the sidebar/accordion on the left, where it opens/highlights current position, give the feel of descending through it instead of an instance of class in memory :).



![app-index](./plan/app-index.jpg)



## Notes

- jQuery and AJAX offer simplest means to make the site, particularly as the should be assumed as being with the website. The buttons.html slide show div is simpler and less hassle version of bootstraps-carousel since all decisions can be made via converting this to a class and making the current object a Hashmap. The class implementation will allow for simpler getters-setters, potential converter of array to HTML content (post-ca coding fun).

  - Most queries are done and a few examples can be imported.
  - Will next store these in a text file, add start on the TV HTML.
  - After this look at the slide show.

  

- Should clarify if SQL.js loads the entire database into memory & how to evaluate such things.

  

- Should try out both jQuery's accordion and bootstraps sidebar for navigating content next with 3 example queries from each section (ignore naive CMS for now). Ideally this element can displayed / hidden by a click (template jQuery-animation first div in the buttons.html). However could be a bit too much this time around given the additional software requirements on the menu system side.

  - Started sidebar, straight forward enough could be simpler than the accordion.
  - Changes to the example will be that each section of queries is a drop down listing the queries for that section query.
  - For the top nav bar, the links are to the first query of each section.
  - Each queries section of dropdowns is going to start as an empty list and is then loaded.
  - Could maybe add the "run all" button here as the last element.
  - Some small CSS touch-ups to implement, but media queries are in for the boilerplate. Can add font sizes to this later.

  

- No helper functions are really needed since it's just button presses, if time for creating/storing a custom queries can style this using bootstrap modals.

  

- With the boilerplate of the side + nav bar from bootstrap, the starting JS code (slide-show, AJAX, SQL.js & jQuery) can start to look at the HTML.

  - TV div that contains query, results div and buttons.
  - Separate HTML pages for sections and two example queries ( "section1/query1.html, section1/query2.html" etc ).
  - Populating sidebar with the text file containing 2 queries per section.
