import React from "react";
import MovieCard from "@/components/molecules/MovieCard";

const MovieList = ({ movies, onToggleFavorite, isFavorite, ...restProps }) => {
  return (
    <ul {...restProps}>
      {movies &&
        movies.map((movie) => (
          <li key={movie.imdbID}>
            <MovieCard
              movie={movie}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite(movie)}
            />
          </li>
        ))}
    </ul>
  );
};

export default MovieList;
