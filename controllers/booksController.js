const db = require("../models");
const  axios = require("axios");

require('dotenv').config();

/**
 * BooksController
 * 
 * Implements the controller for the Book Search full stack
 * web application
 */
module.exports = {
  findAll: function(req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .findById( req.params.id )
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Search for the specified book in Google Books
  searchBook: function(req, res) {
    var searchURL = "https://www.googleapis.com/books/v1/volumes?q=";
    var maxResults = 10;

    // Validate client parameters
    if(!req.params.searchPhrase) {
      return res.status(400).json("Oops, didn't get the search string");
    }

    var apiKey=process.env.BOOKS_API_KEY;
    
    // Append the search query and API Key. Also limit the results to 10.
    searchURL += req.params.searchPhrase;
    searchURL += ("&key="+apiKey);
    searchURL += ("&maxResults=" + maxResults);

    // COMMENT THIS BEFORE DEPLOYMENT
    console.log("Searching Google Books API - ");
    //console.log(searchURL);

    axios
      .get(searchURL)
      .then(
        (searchResults) => {
          responseData = searchResults.data.items.map( (item) => {
            let book = {};
            let volumeInfo = item.volumeInfo;

            //console.log("Mapping item");
            //console.log(volumeInfo);

            book.title = volumeInfo.title;

            if(!volumeInfo.authors)
              book.authors = ["Anonymous"];
            else
              book.authors = volumeInfo.authors;

            if(volumeInfo.description)
              book.description = volumeInfo.description ;

            if(volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) {
              book.image = volumeInfo.imageLinks.thumbnail;
            }
              
            if(volumeInfo.infoLink){
              book.link = volumeInfo.infoLink;
            }

            return book;
          });

          //console.log("About to send back ");
          //console.log(responseData);

          res.send(responseData);
        }
      )
      .catch( (err) => res.status(422).json(err) );
  }

};
