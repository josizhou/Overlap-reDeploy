//function to generate random group code for /group/create post request
function generateGroupCode(){

    //set password length/complexity
    let complexity = 7//document.getElementById("slider").value;

    //possible password values
    let values = "ABCDEFGHIJKLMNOPQRSTUVWZYZ1234567890";

    let password = "";

    //create for loop to choose password characters
    for(var i = 0; i <= complexity; i++){
        password = password + values.charAt(Math.floor(Math.random() * Math.floor(values.length - 1)));
    }
    
    //returns generated group code
    return password
}

/**
 * Method used to calculate the averages of people's top artists
 * @param {[track objects]} data, pass array of track objects to calcualte the averages 
 * @returns 
 */
function calculateMusicalProfile (data) {
    let pop = (dnce = nrgy = spch = acst = inst = vale = 0);

    for (x of data){
        pop += x.trackPopularity;
        dnce += x.danceability;
        nrgy += x.energy;
        spch += x.speechiness;
        acst += x.acousticness;
        inst += x.instrumentalness;
        vale += x.valence;
    }

    dataLen = data.length;

    musicalProfile = {
        trackPopularity: pop / dataLen,
        danceability: (dnce / dataLen),
        energy: (nrgy / dataLen),
        speechiness: (spch / dataLen),
        acousticness: (acst / dataLen),
        instrumentalness: (inst / dataLen),
        valence: (vale / dataLen),
      };

    return musicalProfile;
}

/**
 * Used to extract the information we want from spotify in the GET getMyTopTracks
 * parameter passed should be data.body.items
 * @param {Array} data From Spotify getTopTracks data.body.items
 * @returns 
 */
function extractUsersTopTracks (data) {
    // returns empty string if improper data sent
    if (typeof data === "undefined"){
        return ""; // return empty string if data is undefined 
    }

    let topTracks = [];
    let topTrackIDs = [];

    for (x of data) {
        let track = {};

        // if name is empty it usually means that the track has been removed from spotify (ex. Kpop songs on 2021-03-01)
        if (x.name.length === 0) {
            continue;
        }
        track.trackName = x.name;
        track.trackID = x.id;
        track.trackPopularity = x.popularity;
        track.linkURL = x.external_urls.spotify;

        //If album images array isn't empty, set the imageURL to the first element
        //Else set to empty string
        if (x.album.images.length != 0) {
            track.imageURL = x.album.images[0].url;
        } else {
            track.imageURL = "";
        }

        //If artists array isn't empty, set the artistName to the first element
        //Else set to empty string
        if (x.artists.length != 0) {
            track.artistName = x.artists[0].name;
        } else {
            track.artistName = "";
        }

        topTrackIDs.push(x.id);
        topTracks.push(track);
    }
    return [topTracks, topTrackIDs];
}

function extractUsersTopArtists (data) {
    
    if (typeof(data) === "undefined") {
        return "";
    }

    let topArtists = [];
    // iterate over data and add relevant artist attributes
    for (x of data) {

        //if artist name is empty, continue
        if (x.name.length === 0 || x.name.length == null || x.images.length == 0) {
            continue;
        }
        
        topArtists.push({
            artistName: x.name,
            artistID: x.id,
            followerCount: x.followers.total,
            artistPopularity: x.popularity,
            imageURL: x.images[0].url,
            linkURL: x.external_urls.spotify,
        });
    }

    return topArtists;
}

//export generateGroupCode() as a module for use in Controller.js
module.exports.generateGroupCode = generateGroupCode;

//export music profile calculation method
module.exports.calculateMusicalProfile = calculateMusicalProfile;

// export getTopTracks data extraction method
module.exports.extractUsersTopTracks = extractUsersTopTracks;

// export getTopTracks data extraction method
module.exports.extractUsersTopArtists = extractUsersTopArtists;