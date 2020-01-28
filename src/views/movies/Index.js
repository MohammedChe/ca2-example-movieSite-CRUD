import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';

const Movie = props => (
  <tr>
    <td><a target="_blank" rel="noopener noreferrer" href={'https://www.imdb.com/title/'+ props.movie.imdb_id}>{props.movie.imdb_id}</a></td>
    <td><Link to={`/movies/${props.movie._id}`}>{props.movie.title}</Link></td>
  </tr>
)

export default class MovieIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/movies/')
    .then(response => {
      console.log(response);
      this.setState({
        movies: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  movieList() {
    return this.state.movies.map(currentMovie => {
      return <Movie movie={currentMovie} key={currentMovie._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Movie List</h3>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>IMDB</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            { this.movieList() }
          </tbody>
        </Table>
      </div>
    );
  }
}
