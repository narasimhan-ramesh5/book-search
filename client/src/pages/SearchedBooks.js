import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { BookDetail} from "../components/BookDetail";

var lastSearchedBooks = [];

class SearchedBooks extends Component {
  state = {
    books: [],
    title: ""
  };

  componentWillMount() {
    this.setState({books : lastSearchedBooks})
  }

  componentWillUnmount() {
    lastSearchedBooks = this.state.books;
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  setSearchResults = (searchResults) => {
    // Update the state, set books to new search results
    this.setState({books : searchResults});
  }

  handleBookSearch = event => {
    event.preventDefault();
    console.log("Issuing book search for " + this.state.title);
    if (this.state.title) {
      API.searchBook(this.state.title)
        .then(res => this.setSearchResults(res.data))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>React Google Books Search</h1>
              <h4>Search for and save books of interest</h4>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleBookSearch}
              >
                Search
              </FormBtn>
            </form>
          </Col>
        </Row>

        {/* 
          * If there are search results, render those.
          * Each book result is rendered in a BookDetail component.
          */}
        {/*console.log(this.state.books.length)*/}
        {this.state.books.length ?
          this.state.books.map ((currentBook, index) => (
            <BookDetail key={index.toString()} bookToDisplay={currentBook} type="searched"/>
          )) 
          : null}
      </Container>
    );
  }
}

export default SearchedBooks;
