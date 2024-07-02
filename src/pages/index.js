import { useState, useEffect } from "react";
import MovieList from "@/components/organisms/MovieList";
import Layout from "@/components/templates/Layout";
import SearchMovieForm from "@/components/organisms/SearchMovieForm";
import Pagination from "@/components/molecules/Pagination";
import useFavorites from "@/hooks/useFavorites";
import generateQueryString from "@/utils/generateQueryString";
import Alert from "@/components/atoms/Alert";
import Loading from "@/components/atoms/Loading";
import useGetMovies from "@/hooks/useGetMovies";

const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { movies, resetMovies, getMovies, isLoading, error, resetError } =
    useGetMovies();

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

      setParams(formattedQueryString);
    } else {
      resetMovies();
      setParams(null);
    }
    resetError();
    setCurrentPage(1);
  };

  const searchMovies = async (query, page) => {
    const result = await getMovies(query, page);
    if (!error) {
      setTotalPages(result);
    }
  };

  return (
    <Layout title="Recherche de film">
      {isLoading && <Loading />}
      <SearchMovieForm onSearchMoviesSubmit={onSearchMoviesSubmit} />
      {error === null ? (
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
        <Alert text={error.text} type={error.type} />
      )}
    </Layout>
  );
};

export default Movies;
