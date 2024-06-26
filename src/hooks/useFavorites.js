import { useState, useEffect, useCallback } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const isFavorite = useCallback(
    (movie) => {
      return favorites.some((fav) => fav.imdbID === movie.imdbID);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (movie) => {
      let updatedFavorites;

      if (favorites.some((fav) => fav.imdbID === movie.imdbID)) {
        updatedFavorites = favorites.filter(
          (fav) => fav.imdbID !== movie.imdbID
        );
      } else {
        updatedFavorites = [...favorites, movie];
      }

      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    },
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
};

export default useFavorites;
