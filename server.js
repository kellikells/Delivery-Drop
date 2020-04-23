// ==================== DEPENDENCIES ================
var express = require("express");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var axios = require("axios");
// ---------------------------------------------------

// ==================== SCRAPING TOOLS ================
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
// ---------------------------------------------------

// ================= REQUIRE ALL MODELS ==============
var db = require("./models");
// ---------------------------------------------------

var PORT = 3000;

// =============== INITIALIZE EXPRESS ================
var app = express();
// ---------------------------------------------------

// ============= PUBLIC STATIC FOLDER ================
// setting up a static folder (public) for out web app
app.use(express.static("public"));
// ---------------------------------------------------

// ================ MIDDLEWARE =======================
var logger = require("morgan");
// Configure our app for morgan and body parsing with express.json and express.urlEncoded
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// ---------------------------------------------------


// ============== DATABASE/MONGO CONFIGURATION ========
// Mongojs configuration
var databaseUrl = "warmup";
var collections = ["books"];


// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Routes

// A GET route for scraping the echoJS website
app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://www.echojs.com/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("article h2").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });

        // Send a message to the client
        res.send("Scrape Complete");
    });
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
    // TODO: Finish the route so it grabs all of the articles
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {
    // TODO
    // ====
    // Finish the route so it finds one article using the req.params.id,
    // and run the populate method with "note",
    // then responds with the article with the note included
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {
    // TODO
    // ====
    // save the new note that gets posted to the Notes collection
    // then find an article from the req.params.id
    // and update it's "note" property with the _id of the new note
});

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});




























// // Make a request via axios to grab the HTML body from the site of your choice
// axios.get("https://www.thrillest.com").then(function (response) {

//     // Load the HTML into cheerio and save it to a variable
//     // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//     var $ = cheerio.load(response.data);

//     // An empty array to save the data that we'll scrape
//     var results = [];

//     // Select each element in the HTML body from which you want information.
//     // NOTE: Cheerio selectors function similarly to jQuery's selectors,
//     // but be sure to visit the package's npm page to see how it works
//     $("article").each(function (i, element) {

//         var title = $(element).children().text();
//         var link = $(element).find("a").attr("href");

//         // Save these results in an object that we'll push into the results array we defined earlier
//         results.push({
//             title: title,
//             link: link
//         });
//     });

//     // Log the results once you've looped through each of the elements found with cheerio
//     console.log(results);
// });
