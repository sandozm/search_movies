import { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Effet pour mettre à jour la pagination lorsque les favoris sont visibles
  useEffect(() => {
    if (!params) {
      setPaginationForFavorites();
    }
  }, [params]);

  // Effet pour gérer le changement de page courante
  useEffect(() => {
    if (params) {
      searchMovies(params, currentPage);
    }
  }, [currentPage]);

  const setPaginationForFavorites = () => {
    const totalPage = Math.ceil(favorites.length / 10);
    setParams(null);
    setCurrentPage(1);
    setTotalPages(totalPage || 1);
  };

  const onSearchMoviesSubmit = async (formData) => {
    if (formData.searchTerm.trim().length) {
      const formattedQueryString = generateQueryString({
        s: formData.searchTerm,
        type: formData.type,
        y: formData.year,
      });

      setAlert(null);
      setCurrentPage(1);
      setParams(formattedQueryString);
      await searchMovies(formattedQueryString, currentPage);
    } else {
      setMovies(null);
      setPaginationForFavorites();
    }
  };

  const searchMovies = async (query, page) => {
    try {
      setIsLoading(true);
      const data = await fetchMovies(query, page);
      if (data.Response.toLowerCase() === "true") {
        setMovies(data.Search);
      } else {
        setAlert({ text: data.Error, type: "info" });
        setMovies(null);
        setTotalPages(1);
      }
      setTotalPages(Math.ceil(data.totalResults / 10));
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
