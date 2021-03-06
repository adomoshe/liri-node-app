# liri-node-app
### LIRI bot is a language interpretation and recognition interface, a command line node app that takes parameters and gives back data.


### Resources:
##### Written in JavaScript on Node.js using the following npm packages: 
* axios 
* node-spotify-api 
* moment 
* dotenv

Internal node package: 
* fs 

APIs:
* Bands in Town
* Spotify
* OMDB


### Functionality:
Liri recognizes **4** `command` inputs:
* **concert-this**
* **spotify-this-song**
* **movie-this**
* **do-what-it-says**

`command` is the first user input `process.argv[2]`.

`input` is the second user input `process.argv[3]` and will be concatonated with following `process.argv` values using a `.join('+')` method.

**concert-this** `command` calls a function and wil use axios npm package to hit the Bands in Town API for the `input` artist and display their upcoming concerts, listing the venue, location (City, Country) and date.

![concert-this screenshot](/screenshots/concert-this.png)

**spotify-this-song** `command` calls a function that uses the node-spotify-api npm package to display the artist, album, and Spotify link for the selected `input`. If no `input` is entered a default song "The Sign" by Ace of Base is used.

![spotify-this-song screenshot](/screenshots/spotify-this-song.png)

**movie-this** `command` calls a function that uses axios to hit the OMDB API and displays the release year, production countries, actors, languages, IMDB and Rotten Tomatoes ratings, and short plot of the `input`. If no `input` is entered a default movie "Mr. Nobody" is used.

![movie-this screenshot](/screenshots/movie-this.png)

**do-what-it-says** `command` that uses fs built in package to read the random.txt file splitting the parsed string on `','` and calls the correct liri function depending using the following value written.

![do-what-it-says screenshot](/screenshots/do-what-it-says.png)

### Bonus:

A log.txt file is made as a receipt for all the searches a user makes.

![log screenshot](/screenshots/log.png)
