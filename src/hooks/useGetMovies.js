import { useState, useEffect, useCallback } from "react";
import { fetchMovies } from "@/services/omdbService";

const useGetMovies = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetMovies = () => {
    setMovies(null);
  };

  const resetError = () => {
    setError(null);
  };

  const getMovies = useCallback(
    async (query, page = 1) => {
      try {
        setIsLoading(true);
        const data = await fetchMovies(query, page);
        if (data.Response.toLowerCase() === "true") {
          setMovies(data.Search);
          return Math.ceil(data.totalResults / 10);
        } else {
          setMovies(null);
          setError({ text: data.Error, type: "info" });
          return error;
        }
      } catch (error) {
        setMovies(null);
        setError({ text: error.message, type: "error" });
        return error;
      } finally {
        setIsLoading(false);
      }
    },
    [movies]
  );

  return { movies, resetMovies, getMovies, isLoading, error, resetError };
};

export default useGetMovies;
