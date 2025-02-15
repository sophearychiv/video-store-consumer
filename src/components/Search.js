import React, {Component} from 'react';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './Search.css';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            searched: false,
            error: null,
            success: null
        };
    }

    getSearchResults = (queryString) => {
        axios.get('http://localhost:3001/movies?query=' + queryString)
        .then((response) => {
            this.setState({
                searchResults: response.data
            })
        })
        .catch((error) => {
            this.setState({
                error: error.message
            });
        });
    }

    searchCallback = (queryString) => {
        this.setState({
          queryString,
          searched: true
        });

        this.getSearchResults(queryString);

    };

    addMovieCallback = (movie) => {

        if (this.props.moviesInLibrary.find(currentMovie => currentMovie.external_id === movie.external_id)) {
            this.setState({
                error: "Movie already exists!"
            })
        } else {
            const movieToLibrary = {
                external_id: movie.external_id,
                image_url: movie.image_url.substring(31, movie.image_url.length),
                // image_url: movie.image_url,
                title: movie.title,
                overview: movie.overview,
                release_date: movie.release_date
            }
            axios.post('http://localhost:3001/movies', movieToLibrary)
            .then((response)=> {
                if (response.status === 200) {
                    this.setState({
                        success: "Movie has been added to the rental library!"
                    });
                    this.props.addMovieCallback(movie);
                }
            })
            .catch((error) => {
                this.setState({
                    error: error.message
                })
            });
        }
    }

    render() {

        const errorSection = (this.state.error) ?
            (<section>Error: {this.state.error}</section>) : null;
        
        const successSection = (this.state.success) ?
        (<section>{this.state.success}</section>) : null;
    
        let movieCards;

        if (this.state.searchResults !== null) {
            movieCards = this.state.searchResults.map((movie,i) => {
                return [<MovieCard 
                            key={i}
                            external_id={movie.external_id}
                            image_url={movie.image_url}
                            title={movie.title}
                            overview={movie.overview}
                            release_date={movie.release_date}
                            addMovieCallback={this.addMovieCallback}/>]
            });

        } else if (this.state.searched) {
            movieCards = (<tr><td>No matched Results!</td></tr>);
        } else {
            movieCards = null;
        }

        return (
            <section className="search_container">
                <h3 className="search_title">Search Titles</h3>
                <SearchBar searchCallback={this.searchCallback}/>
                {errorSection}
                {successSection}
                <Table>
                    <tbody>
                        {movieCards}
                    </tbody>
                </Table>

            </section>
        )
    }
};

export default Search;