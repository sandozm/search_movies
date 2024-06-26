import { useState, useEffect } from "react";
import { fetchMovies } from "@/services/omdbService";
import MovieList from "@/components/organisms/MovieList";
import Layout from "@/components/templates/Layout";
import SearchMovieForm from "@/components/organisms/SearchMovieForm";
import useFavorites from "@/hooks/useFavorites";
import generateQueryString from "@/utils/generateQueryString";

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const onSearchMoviesSubmit = async (formData) => {
    if (formData.searchTerm.trim().length) {
      const formattedQueryString = generateQueryString({
        s: formData.searchTerm,
        type: formData.type,
        y: formData.year,
      });

      await searchMovies(formattedQueryString);
    } else {
      setMovies(null);
    }
  };

  const searchMovies = async (query, page) => {
    try {
      const data = await fetchMovies(query);
      if (data.Response.toLowerCase() === "true") {
        setMovies(data.Search);
      } else {
        setMovies(null);
      }
    } catch (error) {
      console.error(error.message);
      setMovies(null);
    }
  };

  return (
    <Layout title="Recherche de film">
      <SearchMovieForm onSearchMoviesSubmit={onSearchMoviesSubmit} />

      <MovieList
        movies={movies || favorites}
        onToggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
    </Layout>
  );
};

export default Movies;
