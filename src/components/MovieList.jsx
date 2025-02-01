import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api"; // TMDb API service
import SearchBar from "./SearchBar";
import Filter from "./Filter";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ genre: "", rating: "" });

  // Fetch trending movies and genres on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      const trendingData = await api.fetchTrending(); // Fetch trending movies/shows
      setTrending(trendingData);

      const genreData = await api.fetchGenres();
      setGenres(genreData);

      setMovies(trendingData); // Set trending movies as the default display
    };

    fetchInitialData();
  }, []);

  // Fetch filtered movies
  useEffect(() => {
    const fetchFilteredMovies = async () => {
      const { genre, rating } = filter;
      const filtered = await api.fetchMoviesByFilter(genre, rating);
      setMovies(filtered);
    };

    if (filter.genre || filter.rating) {
      fetchFilteredMovies();
    }
  }, [filter]);

  // Handle search queries
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setMovies(trending);
    } else {
      const searchResults = await api.fetchMovies(query);
      setMovies(searchResults);
    }
  };

  return (
    <div className="movie-container">
      <SearchBar onSearch={handleSearch} />
      <Filter genres={genres} onFilterChange={(genre, rating) => setFilter({ genre, rating })} />
      <h2>{searchQuery ? "Search Results" : "Trending Now"}</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
              />
              <div className="movie-info">
                <h3>{movie.title || movie.name}</h3>
                <p>⭐ {movie.vote_average}</p>
                <p>Release Date: {movie.release_date || movie.first_air_date}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
