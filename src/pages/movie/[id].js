import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchMovieById } from "@/services/omdbService";
import MovieDetail from "@/components/organisms/MovieDetail";
import Layout from "@/components/templates/Layout";
import Alert from "@/components/atoms/Alert";
import BackLink from "@/components/molecules/BackLink";
import Loading from "@/components/atoms/Loading";

const MovieDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const getMovie = async () => {
        try {
          const movieData = await fetchMovieById(id);
          setMovie(movieData);
        } catch (error) {
          setError(error.message);
        }
      };
      getMovie();
    }
  }, [id]);

  if (!movie) {
    return <Loading />;
  }

  return (
    <Layout title={movie.Title}>
      {!error ? (
        <MovieDetail movie={movie} />
      ) : (
        <Alert text={error} type="error" />
      )}
      <BackLink />
    </Layout>
  );
};

export default MovieDetailPage;
