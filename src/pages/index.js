import { useState, useEffect, useCallback } from "react";
import { fetchMovies } from "@/services/omdbService";
import MovieList from "@/components/organisms/MovieList";
import Layout from "@/components/templates/Layout";
import SearchMovieForm from "@/components/organisms/SearchMovieForm";
import Pagination from "@/components/molecules/Pagination";
import useFavorites from "@/hooks/useFavorites";
import generateQueryString from "@/utils/generateQueryString";
import Alert from "@/components/atoms/Alert";
import Loading from "@/components/atoms/Loading";

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Effet pour gérer le changement de page courante
  useEffect(() => {
    if (params) {
      searchMovies(params, currentPage);
    }
  }, [currentPage, params]);

  // Effet pour update la pagination des favoris
  useEffect(() => {
    if (!params) {
      setPaginationForFavorites();
    }
  }, [favorites, params]);

  const setPaginationForFavorites = () => {
    const totalPage = Math.ceil(favorites.length / 10);
    let newCurrentPage = currentPage;
    if (currentPage > totalPage) {
      newCurrentPage = Math.max(1, totalPage); // Réajuste currentPage si c'est trop grand
    }

    setCurrentPage(newCurrentPage);
    setTotalPages(totalPage || 1);
  };

  const onSearchMoviesSubmit = (formData) => {
    if (formData.searchTerm.trim().length) {
      const formattedQueryString = generateQueryString({
        s: formData.searchTerm,
        type: formData.type,
        y: formData.year,
      });

      setAlert(null);
      setParams(formattedQueryString);
    } else {
      setMovies(null);
      setParams(null);
    }

    setCurrentPage(1);
  };

  const searchMovies = async (query, page) => {
    try {
      setIsLoading(true);
      const data = await fetchMovies(query, page);
      if (data.Response.toLowerCase() === "true") {
        setMovies(data.Search);
        setTotalPages(Math.ceil(data.totalResults / 10));
      } else {
        setAlert({ text: data.Error, type: "info" });
        setMovies(null);
        setTotalPages(1);
      }
    } catch (error) {
      setAlert({ text: error.message, type: "error" });
      setMovies(null);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Recherche de film">
      {isLoading && <Loading />}
      <SearchMovieForm onSearchMoviesSubmit={onSearchMoviesSubmit} />
      {alert === null ? (
        <>
          <MovieList
            movies={
              movies ||
              favorites.slice((currentPage - 1) * 10, currentPage * 10)
            }
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            css="margin:24px; justify-content: center;"
          />
        </>
      ) : (
        <Alert text={alert.text} type={alert.type} />
      )}
    </Layout>
  );
};

export default Movies;
