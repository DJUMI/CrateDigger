/*

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var connection = mysql.createConnection({
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

export function getListing(listing_id) {
  let sql = `CALL getListing(listing_id)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getArtistName(listing_id) {
  let sql = `CALL getArtistName(listing_id)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getAlbumName(listing_id) {
  let sql = `CALL getAlbumName(listing_id)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getLabelName(listing_id) {
  let sql = `CALL getLabelName(listing_id)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getFormat(listing_id) {
  let sql = `CALL getFormat(listing_id)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getPrice(listing_id) {
  let sql = `CALL getPrice(listing_id)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getReleaseYear(listing_id) {
  let sql = `CALL getReleaseYear(listing_id)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getAlbumArt(listing_id) {
  let sql = `CALL getAlbumArt(listing_id)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function addToCart(listing_id) {
  let sql = `CALL addToCart(listing_id)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getNumInCart(listing_id) {
  let sql = `CALL getNumInCart(listing_id)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function removeFromCart(listing_id) {
  let sql = `CALL removeFromCart(listing_id)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getSearchResults(input) {
  let sql = `CALL getSearchResults(input)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getRandomListings() {
  let sql = `CALL getRandomListings()`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getRecommendedListings() {
  let sql = `CALL getRandomListings()`; /* implement getRecommendedListings stored procedure */ /*
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getAlbumSearchResults(input) {
  let sql = `CALL getAlbumSearchResults(input)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getArtistSearchResults(input) {
  let sql = `CALL getArtistiSearchResults(input)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}

export function getLabelSearchResults(input) {
  let sql = `CALL getLabelSearchResults(input)`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    return(results); 
  });
}



export const getNewListings = `
TODO: Later
`;

export const getHotListings = `
TODO: Later
`;


module.exports = connection;

*/