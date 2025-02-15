import React from 'react';
import Button from 'react-bootstrap/Button'
import './MovieCard.css';

const MovieCard = (props) => {
    const {image_url, title, overview, release_date,addMovieCallback } = props;
    const addMovie = () => {
        addMovieCallback(props);
    }
    return (

        <tr>
            <td className="movie_container">
            <img src={image_url} alt={title}/>
            <div className="movie_description">
                <h3 className="title">{title}</h3>
                <p><span className="bold_words">Release Date: </span>{release_date}</p>
                <p><span className="bold_words">Overview: </span>{overview}</p>
                <Button variant="dark" id="button_font" onClick={addMovie}>Add to Library</Button>
            </div>
            </td>
        </tr>
    )
}

export default MovieCard;