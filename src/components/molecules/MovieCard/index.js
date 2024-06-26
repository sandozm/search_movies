import React from "react";
import Link from "@/components/atoms/Link";
import Image from "next/image";
import Button from "@/components/atoms/Button";

const MovieCard = ({ movie, onToggleFavorite, isFavorite, ...restProps }) => {
  return (
    <div {...restProps}>
      <Link href={`/movie/${movie.imdbID}`}>
        <header>
          <h2>{movie.Title}</h2>
        </header>
        <div>
          {movie.Poster.match("^https?://") && (
            <Image
              src={movie.Poster}
              alt={movie.Title}
              width="200"
              height="280"
            />
          )}
        </div>
      </Link>
      <footer>
        <div>
          <p>Année</p>
          {movie.Year}
        </div>
        <Button onClick={() => onToggleFavorite(movie)}>
          {isFavorite(movie) ? "Retirer des favoris" : "Ajouter aux favoris"}
        </Button>
      </footer>
    </div>
  );
};

export default MovieCard;
