const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema for books collection.
 * 
 * title: Book Title (String)
 * authors: Book Author(s) (Array of strings)
 * description : Description of the book as 
 *               returned by Google Books API (String)
 * image: URL to the book's image as returned by
 *        Google Books API
 * link: URL to this book's page in Google Books
 * 
 */

const bookSchema = new Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  description: String,
  image: String,
  link: String
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
