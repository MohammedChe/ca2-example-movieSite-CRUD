import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Badge from 'react-bootstrap/Badge'


const Genre = props => (
  <Badge variant="light">{props.genre}</Badge>
)

export default class MovieCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imdb_id: '',
      title: '',
      genre: [],
      genreText: ''
    };

    // need to bind 'this' to all functions if not using arrow function..
    // remember: arrow functions don't have their own context/ 'this'

    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.onAddGenre = this.onAddGenre.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(`Input name ${name}. Input value ${value}.`);

    this.setState({
      [name]: value
    });
  };

  onAddGenre = () => {
    this.setState(state => {
      const genre = [...state.genre, state.genreText];
      return {
        genre,
        genreText: '',
      };
    });
  };

  onSubmit = e => {
    e.preventDefault();

    let genreJSON = this.state.genre.map((name, index) => {
      return {name};
    })

    const movie = {
      imdb_id: this.state.imdb_id,
      title: this.state.title,
      genre: genreJSON
    }

    console.log(movie);

    axios.post('http://localhost:4000/movies', movie)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    window.location = '/';
  };


  genreList() {
    return this.state.genre.map((currentGenre, index) => {
      return <Genre genre={currentGenre} key={index} />;
    })
  }

  render() {

    return (
    <div>
      <h3>Add new Movie</h3>
      <Form onSubmit={this.onSubmit}>
        <Form.Group as={Row} controlId="formHorizontalIMDB">
          <Form.Label column sm={2}>
            IMDB ID
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="IMDB id"
              name="imdb_id"
              value={this.state.imdb_id}
              onChange={this.handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalTitle">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Title"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalTitle">
          <Form.Label column sm={2}>
            Genres
          </Form.Label>
          <Col sm={4}>
            <InputGroup>
              <Form.Control type="text" placeholder="Genre"
                name="genreText"
                value={this.state.genreText}
                onChange={this.handleInputChange}
              />
              <InputGroup.Append>
                <Button onClick={this.onAddGenre} variant="outline-success">Add Genre</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Group>

        <Row>
          <Col sm={{ span: 10, offset: 2 }}>
            { this.genreList() }
          </Col>
        </Row>
        <br/>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Add Movie</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
    )
  }
}
