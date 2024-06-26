import React from "react";
import styled from "styled-components";
import MovieCard from "@/components/molecules/MovieCard";

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  justify-items: center;
  justify-content: center;

  @media (${(props) => props.theme.screen.sm}) {
    grid-template-columns: repeat(2, 230px);
  }

  @media (${(props) => props.theme.screen.md}) {
    grid-template-columns: repeat(3, 230px);
  }

  @media (${(props) => props.theme.screen.lg}) {
    grid-template-columns: repeat(4, 230px);
  }

  @media (${(props) => props.theme.screen.xl}) {
    grid-template-columns: repeat(5, 230px);
  }
`;

const Item = styled.ul`
  width: 100%;
`;

const MovieList = ({ movies, onToggleFavorite, isFavorite, ...restProps }) => {
  return (
    <List {...restProps}>
      {movies &&
        movies.map((movie) => (
          <Item key={movie.imdbID}>
            <MovieCard
              movie={movie}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite(movie)}
            />
          </Item>
        ))}
    </List>
  );
};

export default MovieList;
