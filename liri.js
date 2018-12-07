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

if (command === 'concert-this') { concert(input); };
if (command === 'spotify-this-song') { song(input); };
if (command === 'movie-this') { movie(input); };
if (command === 'do-what-it-says') { textRead(); };


function concert(artist) {
    axios.get(
        `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`
    ).then(function (response) {
        let reply = response.data;
        console.log(`${artist}... performing ${reply.length} events soon!`);
        for (let i = 0; i < reply.length; i++) {
            console.log(` `);
            console.log(`Venue Name: ${reply[i].venue.name}`);
            console.log(`Location: ${reply[i].venue.city}, ${reply[i].venue.country}`);
            console.log(`Date: ${moment(reply[i].datetime).format("MMM Do YYYY")}`);
            console.log('------------------------------------------');
        };
        logThis(command, artist);
    });
};


function song(song) {
    if (song === undefined) { song = 'The Sign Ace of Base' }

    spotify
        .search({ type: 'track', query: song, limit: '1' })
        .then(function (response) {
            let reply = response.tracks.items[0];
            console.log('');
            console.log(`Spotify found "${reply.name}", performed by "${reply.artists[0].name}" from the album "${reply.album.name}"`);
            console.log('');
            console.log(`Spotify link: "${reply.external_urls.spotify}"`);
            console.log('');
        })
        .catch(function (err) {
            console.log(err);
        });
    logThis(command, song);
};


function movie(movie) {
    if (movie === undefined) { movie = 'Mr. Nobody' };
    axios.get(
        `http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`
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
    logThis(command, movie);
};


function textRead() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.split(',');

        if (data[0] === 'concert-this') {
            concert(data[1]);
        };

        if (data[0] === 'spotify-this-song') {
            song(data[1]);
        };

        if (data[0] === 'movie-this') {
            movie(data[1]);
        };
    });
};

function logThis(logCommand, logInput) {
    if (command === 'do-what-it-says') {
        logInput = `random.txt input: ${logInput}`;
    };
    logInput = logInput.split('+').join(' ');
    console.log('after' + logInput)
    fs.appendFile(
        "log.txt",
        `At "${moment().format('MM/DD/YY HH:mm')}" you entered the command "${logCommand}" with the input "${logInput}" on liri.\n`,
        function (err) {
            if (err) {
                return console.log(err);
            };
        });
};