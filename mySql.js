var mySql = require('mysql');

var connection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Fucktard46',
    database: 'CrateDigger',
});

connection.connect(function(err){
    if(err)
        throw err;
    console.log("connected to database");
});

let sql = `CALL getRandomListing()`;
 
  connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
  });

module.exports = connection;

/*
export const getArtistName = `
TODO
`;

export const getAlbumName = `
TODO
`;

export const getLabelName = `
TODO
`;

export const getReleaseYear = `
TODO: Later
`;

export const getFormat = `
TODO
`;

export const getPrice = `
TODO
`;

export const getAlbumArt = `
TODO: Later
`;

export const addToCart = `
TODO
`;

export const getNumInCart = `
TODO
`;

export const removeFromCart = `
TODO
`;

export const getSearchResults = `
TODO
`;

export const getNewListings = `
TODO: Later
`;

export const getHotListings = `
TODO: Later
`;

export const getRandomListing = `
TODO
`;

export const getRecommendedListing = `
TODO: Later
`;

export const getAlbumSearchResults = `
TODO
`;

export const getArtistSearchResults = `
TODO
`;

export const getLabelSearchResults = `
TODO
`;

*/