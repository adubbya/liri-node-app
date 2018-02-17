// GLOBAL VARS/REQUIRES
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
//nodefunc is the function the user wants to use, nodeinput is the searchterm or keyword to query
var nodefunc = process.argv[2];
var nodeinput = process.argv[3];


// FUNCTION CALLS
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

        case "do-what-it-says":
            randoGET();
            break;

        default:
            console.log("not a function, please choose from:" +
                "\nmovie-this, spotify-this-song, my-tweets, do-what-it-says");
            break;
    }
}


// FUNCTION BLOCKS

// movie-this OMDB API  ajax was getting hairy, chose this nifty library, hope is ok..
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
        else if (nodeinput === undefined) {
            console.log(err, "If you haven't watched Mr Nobody, then you should: http://www.imdb.com/title/tt0485947/, It's on Netflix!")
        }
    });
};

// my-tweets Twitter API function, still figuring out how to parse this chunkodata: FOR LOOP
var tweetGET = function () {
    var params = { screen_name: 'UTAustin' };
    client.get('statuses/user_timeline', params, function (error, tweet, response) {
        if (!error) {
            console.log(tweet);
        }
    });
}

// spotify-this-song Spotify API function, yeesh, thinking usage with promises
var songGET = function () {

    if (nodeinput === undefined) {// this is argh, wrong input???
        nodeinput = "The Sign";
    }

    spotify.search({ type: 'track', query: nodeinput })
        .then(function (response) {
            console.log(   // this looks wet, stuff for later, but works!
                "Artist Name: " + response.tracks.items[0].artists[0].name +
                "\nSong Name: " + response.tracks.items[0].name +
                "\nAlbum Name: " + response.tracks.items[0].album.name +
                "\nSong URL: " + response.tracks.items[0].preview_url
            );
        })

        .catch(function (err) {
            console.log(err);
        });
}

// do-what-it-says function






//callllllback
nodefuncSelector();