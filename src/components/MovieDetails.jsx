import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [watchProviders, setWatchProviders] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await api.fetchMovieDetails(id);
        setMovie(movieData);

        const creditsData = await api.fetchMovieCredits(id);
        setCredits(creditsData);

        const providersData = await api.fetchMovieWatchProviders(id);
        setWatchProviders(providersData.results.US?.flatrate || []);  // Assuming availability in the US
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const director = credits.crew.find((crewMember) => crewMember.job === "Director");

  return (
    <div className="details-container">
      <div className="details-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
        />
      </div>
      <div className="details-info">
        <h1 className="details-title">{movie.title || movie.name}</h1>
        <p className="details-overview"><strong>Overview:</strong> {movie.overview}</p>
        <p className="details-genres">
          <strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="details-runtime"><strong>Runtime:</strong> {movie.runtime || movie.episode_run_time?.[0]} minutes</p>
        <p className="details-language">
          <strong>Original Language:</strong> {movie.original_language.toUpperCase()}
        </p>
        <p className="details-release">
          <strong>Release Date:</strong> {movie.release_date || movie.first_air_date}
        </p>
        {director && <p className="details-director"><strong>Director:</strong> {director.name}</p>}
        <p><strong>Production Companies:</strong></p>
        <ul className="details-production-list">
          {movie.production_companies.map((company) => (
            <li key={company.id} className="details-production-item">
              {company.logo_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                  alt={company.name}
                  className="details-production-logo"
                />
              )}
              {company.name}
            </li>
          ))}
        </ul>
        <h3 className="details-cast-title">Cast</h3>
        <div className="details-cast-list">
          {credits.cast.slice(0, 10).map((actor) => (
            <div key={actor.id} className="details-cast-member">
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="details-cast-photo"
              />
              <p className="details-cast-name">{actor.name}</p>
              <p className="details-cast-role">as {actor.character}</p>
            </div>
          ))}
        </div>
        <h3 className="details-watch-title">Where to Watch</h3>
        <div className="details-watch-list">
          {watchProviders.length > 0 ? (
            watchProviders.map((provider) => (
              <div key={provider.provider_id} className="details-watch-item">
                <img
                  src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="details-watch-logo"
                />
                <p>{provider.provider_name}</p>
              </div>
            ))
          ) : (
            <p>Currently unavailable for streaming.</p>
          )}
        </div>
        <Link to="/" className="details-back-button">Back to Movie List</Link>
      </div>
    </div>
  );
};

export default MovieDetails;
