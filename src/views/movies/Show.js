import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Genre = props => (
  <Badge variant="light">{props.genre}</Badge>
)

export default class MovieShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {},
      loading: true
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`http://localhost:4000/movies/${id}`)
    .then(response => {
      console.log(response);
      this.setState({
        movie: response.data,
        loading: false
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  genreList() {
    return this.state.movie.genre.map((currentGenre, index) => {
      return <Genre genre={currentGenre.name} key={index} />;
    })
  }

  render() {
    const { movie, loading } = this.state;

    if (loading) {
      return (
      <div>
        <h3>Loading...</h3>
      </div>
      )
    }

    return (
    <div>
    <br/>
      <Card>
        <Card.Header as="h5">{movie.title} <span className="float-right">{ this.genreList() }</span></Card.Header>
        <Card.Body>
          <Card.Title>Synopsis</Card.Title>
          <Card.Text>
            There is no synopsis in the DB
          </Card.Text>
          <Button as={Link} to="/" variant="primary">View all movies</Button>
        </Card.Body>
      </Card>

    </div>
    )
  }
}
