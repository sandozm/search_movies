import React from "react";
import Layout from "@/components/templates/Layout";
import SearchMovieForm from "@/components/organisms/SearchMovieForm";

const Movies = () => {
  const onSearchMoviesSubmit = async (formData) => {
    console.log(formData);
  };

  return (
    <Layout title="Recherche de film">
      <SearchMovieForm onSearchMoviesSubmit={onSearchMoviesSubmit} />
    </Layout>
  );
};

export default Movies;
