import React from 'react';
import PropTypes from 'prop-types';
import MovieDetails from './MovieDetails';
import './Movie.css';
import Button from 'react-bootstrap/Button'


const Movie = (props) => {
  const onSelectMovie = () => {
    props.onSelectMovieCallback(props.movie.id)
  }

  const onViewMovieDetails = () => {
    props.onClickMovieDetailsCallback(props.movie.id)
  }

  const onCloseMovieDetails = () => {
    props.onCloseMovieDetailsCallback(props.movie.id)
  }

  const onDeselectMovie = () => {
    props.onDeselectMovieCallback(props.movie.id)
  }

  let movieDescription = <div>
      <h3 className="title">{props.movie.title}</h3>
      <p><span className="bold_words">Release Date: </span>{props.movie.release_date}</p>
      <p><span className="bold_words">Overview: </span>{props.movie.overview.length > 128 ? `${props.movie.overview.substring(0, 150)}...` : props.movie.overview}</p>
    </div>

  let movieDetails = null;
  let showButton = <Button size="sm" className="movie-button" variant="outline-dark" onClick={onViewMovieDetails}>Show More</Button>
  let selectButton =  <Button variant="dark" size="sm" className="movie-button" onClick={onSelectMovie}>Select Movie</Button>

  if (props.viewMovieDetails) {
    if (props.viewMovieDetails.title === props.movie.title) {
      movieDescription = null;
      movieDetails = <MovieDetails {...props.viewMovieDetails} />
              
      showButton =  <Button size="sm" className="movie-button" variant="outline-dark" onClick={onCloseMovieDetails}>Show Less</Button>
                  
    }
  }

  if (props.selectedMovie === props.movie) {
    selectButton = <Button variant="danger"  size="sm" className="movie-button" onClick={onDeselectMovie}>Deselect</Button>
  }

  if (props.deselectedMovie === props.movie) {
    selectButton = <Button variant="dark"  size="sm" className="movie-button" onClick={onSelectMovie}>Select Movie</Button>
  }
  
  return (
    
    <tr>
      <td className="movie_container">
        <img className="movie_image" src={props.movie.image_url} alt={props.movie.title}/>
        <div className="movie_description">
          {movieDescription}
          {movieDetails}
          <div className="description"> 
            <div className="buttons">
                {showButton}
                {selectButton}
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  viewMovieDetails: PropTypes.bool,
  onClickMovieDetailsCallback: PropTypes.func.isRequired,
  onSelectMovieCallback: PropTypes.func.isRequired,
};

export default Movie;