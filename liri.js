//require dotenv
var dotenv = require("dotenv").config();
// require keys.js file
var keys = require("./keys.js");
//require request for OMDB
var request = require("request");
//require omdb-client, ajax headaches begone
var omdbc = require("omdb-client");
//require twitter
var Twitter = require("twitter");
//require Spotify
var Spotify = require('node-spotify-api');
// require fs
var fs = require("fs");

//request keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//first arg
var nodefunc = process.argv[2];
var nodeinput = process.argv[3];

// node func selector switchcase
function nodefuncSelector() {
    switch (nodefunc) {
        case "movie-this":
            omdbGET();
            break;
    
        case "my-tweets":
                tweetGET();
                break;

        case "spotify-this-song":
                songGET();
                break;
        default:
            console.log("not a function, please choose from:" + 
            "\nmovie-this, spotify-this-song, my-tweets, do-what-it-says");
            break;
    }
}



// ajax was getting hairy, chose this nifty library, hope is ok..
var omdbGET = function () {
    var params = {
        apiKey: "trilogy",
        title: nodeinput,
    }
    omdbc.get(params, function (err, data) {
        if (!err) {
            console.log("Movie Title: " + data.Title
                + "\nYear: " + data.Year
                + "\nIMDB Rating: " + data.Ratings[0].Value
                + "\nRT Rating: " + data.Ratings[1].Value
                + "\nCountry: " + data.Country
                + "\nLanguage: " + data.Language
                + "\nPlot: " + data.Plot
                + "\nActors: " + data.Actors
                + "\n===================\n");
        }
        else {
            console.log(err, "If you haven't watched Mr Nobody, then you should: http://www.imdb.com/title/tt0485947/, It's on Netflix!")
        }
    });
};

// my-tweets twitter API function, still figuring out how to parse this chunkodata: FOR LOOP
var tweetGET = function () {
    var params = {screen_name: 'UTAustin'};
    client.get('statuses/user_timeline', params, function(error, tweet, response) {
        if (!error) {
            console.log(tweet);
        }
    });
}

// spotify-this-song spotify API function, yeesh
var songGET = function () {
    spotify.search({ type: 'track', query: nodeinput }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.); 
      });
}      

// do-what-it-says function






//callllllback
nodefuncSelector();