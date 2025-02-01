
import axios from "axios";

const API_KEY = "f1d5cd894d84e7570ef8baa4b589b86f"; // Replace with your TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";

const api = {
  fetchTrending: async () => {
    const response = await axios.get(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
    return response.data.results;
  },
  fetchGenres: async () => {
    const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return response.data.genres;
  },
  fetchMovies: async (query) => {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    return response.data.results;
  },
  fetchMoviesByFilter: async (genreId, minRating) => {
    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&vote_average.gte=${minRating}`
    );
    return response.data.results;
  },
  fetchMovieDetails: async (id) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    return response.data;
  },
  fetchMovieCredits: async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  return response.data;
},
    fetchWatchProviders: async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`);
  return response.data;
},

};

export default api;
