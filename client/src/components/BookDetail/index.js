import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Button } from "react-materialize";
import "./style.css";

export class BookDetail extends Component {

	/**
	 *  The same component is used to render both searched books
	 *  as well as saved books.
	 * 
	 *  When rendering searched books, it will display the "Save"
	 *  button. Once user clicks save for this book, we set saved 
	 *  to true. This in turn will disable the save button, so that
	 *  we don't save the same book multiple times.
	 * 
	 *  Similar logic when rendering saved books. It will display
	 *  the delete button. Once deleted, the button is disabled.
	 * 
	 */
	state = {
		saved : false
	}

	handleSave = () => {
		let bookToSave = this.props.bookToDisplay;
		console.log("Saving " + bookToSave.title);
		API.saveBook(bookToSave)
			.then(res => {
				console.log("Result is");
				console.log(res);

				this.setState({saved : true})

			})
      .catch(err => console.log(err));
	};

	handleDelete = () => {
		let bookToDelete = this.props.bookToDisplay;
		API.deleteBook(bookToDelete._id)
			.then(res => {
				console.log("Result is");
				console.log(res);

				this.props.bookDeletedCallback(bookToDelete._id);
			})
			.catch(err => console.log(err));
	};


	render() {
		let book = this.props.bookToDisplay;
		let type = this.props.type;

		return(
			<Row className="book-details">
				<Col s={2} m={2} l={2} className="grid-example">
					{book.image
						? <a href={book.link} target="#"><img src={book.image}></img></a>
						: <p>Image not available</p>
					}
				</Col>
				<Col s={8} m={8} l={8} className="grid-example">
					{book.title
						? <h2>{book.title}</h2>
						: <p>No title returned, this is weird</p>
					}
					{book.authors.length ? 
						book.authors.map ( (author) =>(
							<h6>{author}</h6>
						)) 
						: <p>Anonymous</p>
					}
					{book.description
						? <p>{book.description}</p>
						: <p>No description available, must be really good :) </p>
					}
				</Col>

				<Col s={2} m={2} l={2}>
					{type === "searched" ?
						<Button waves="green" onClick={this.handleSave} disabled={this.state.saved}>Save</Button>
					: <Button waves="red" onClick={this.handleDelete}>Delete</Button>
					}
				</Col>

			</Row>
		)
	}
}

