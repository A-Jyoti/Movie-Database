import inception from "./assets/inception.jpg"
import darkknight from "./assets/dark_knight.jpg"

const movies = [
  {
    id: 1,
    title: "Inception",
    rating: 8.8,
    genre: "Sci-Fi",
    poster: inception,
    ageRating: "PG-13",
    description: "A mind-bending thriller by Christopher Nolan.",
    whereToWatch: "Netflix",
  },
  {
    id: 2,
    title: "The Dark Knight",
    rating: 9.0,
    genre: "Action",
    poster: darkknight,
    ageRating: "PG-13",
    description: "Gotham's vigilante fights crime.",
    whereToWatch: "HBO Max",
  },
];

export default movies;
