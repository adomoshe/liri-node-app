require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const moment = require('moment');
const keys = require("./keys.js")
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let input = process.argv[3];


if (process.argv[4]) {
    input = process.argv.slice(3).join("+");
};

if (command === 'concert-this') {
    axios.get(
        `https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`
    ).then(function (response) {
        let reply = response.data;
        console.log(`${input}... performing ${reply.length} events soon!`);
        for (let i = 0; i < reply.length; i++) {
            console.log(` `);
            console.log(`Venue Name: ${reply[i].venue.name}`);
            console.log(`Location: ${reply[i].venue.city}, ${reply[i].venue.country}`);
            console.log(`Date and Time: ${moment(reply[i].datetime).format("MMM Do YYYY")}`);
            console.log('------------------------------------------');
        };
    });
};


if (command === 'spotify-this-song') {
    if (!input) {input = 'The Sign Ace of Base'}
   
    spotify
    .search({ type: 'track', query: input, limit:'1' })
    .then(function(response) {
        let reply = response.tracks.items[0];
        console.log('');
      console.log(`Spotify found "${reply.name}", performed by "${reply.artists[0].name}" from the album "${reply.album.name}"`);
      console.log(`Spotify link: "${reply.external_urls.spotify}"`);
      console.log('');
    })
    .catch(function(err) {
      console.log(err);
    });
};


if (command === 'movie-this') {
    if (!input) {input = 'Mr. Nobody'}
    axios.get(
        "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy"
    ).then(function (response) {
        let reply = response.data
        console.log('');
        console.log(`${reply.Title} came out in ${reply.Year}`);
        console.log(`Actors: ${reply.Actors}`);
        console.log(`Produced in: ${reply.Country}`);
        console.log(`IMDB rating of ${reply.Ratings[0].Value}, and a Rotten Tomatoes rating of ${reply.Ratings[1].Value}`);
        console.log(`Languages: ${reply.Language}`);
        console.log('');
        console.log(`Plot: ${reply.Plot}`);
        console.log('');
    });
};

