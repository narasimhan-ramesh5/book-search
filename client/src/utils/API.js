import axios from "axios";

export default {
  
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },

  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/saved/" + id);
  },

  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books/saved/", bookData);
  },

  // Gets all books
  getSavedBooks: function() {
    return axios.get("/api/books/saved/");
  },

  // Searches for the specified book title.
  // Uses the Google Book API to retrieve info on the book
  searchBook: function(bookToSearch) {
    return axios.get("/api/books/search/" + bookToSearch);
  }
};
