import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { BookDetail} from "../components/BookDetail";

class SavedBooks extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getSavedBooks()
      .then(res =>
        this.setState({ books: res.data })
      )
      .catch(err => console.log(err));
  };

  bookDeleted = (id) => {
    var updatedBooks = this.state.books.filter((item) => item._id !== id);

    this.setState( { books:updatedBooks } );
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>React Google Books Search</h1>
              <h4>Search for and save books of interest</h4>
            </Jumbotron>
            <h1>
              Saved Searches
            </h1>
          </Col>
        </Row>

        {/* If there are search results, render those*/}

        {this.state.books.length ?
          this.state.books.map ((currentBook, index) => (
            <BookDetail key={index.toString()} bookToDisplay={currentBook} type="saved"
             bookDeletedCallback={this.bookDeleted}/>
          )) 
          : <p>No saved books</p>}
      </Container>
    );
  }
}

export default SavedBooks;
