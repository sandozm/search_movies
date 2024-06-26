import React from "react";
import styled from "styled-components";
import Button from "@/components/atoms/Button";
import useFavorites from "@/hooks/useFavorites";
import Image from "next/image";

const DetailContainer = styled.div`
  background-color: ${(props) => props.theme.colors.gray.dark};
  color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 24px auto;
  display: flex;
  flex-direction: column;

  @media (${(props) => props.theme.screen.sm}) {
    flex-direction: row;
    gap: 24px;
  }
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.font.size.xl};
  margin-bottom: 12px;
  color: ${(props) => props.theme.colors.primary.normal};
`;

const Text = styled.p`
  font-size: ${(props) => props.theme.font.size.md};
  line-height: 1.5;
  margin: 18px 0;
`;

const Strong = styled.span`
  display: block;
  color: ${(props) => props.theme.colors.primary.normal};
`;

const Poster = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  border-radius: 8px;
`;

const MovieDetail = ({ movie, ...restProps }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <DetailContainer {...restProps}>
      {movie.Poster.match("^https?://") && (
        <Poster>
          <Image
            src={movie.Poster}
            alt={movie.Title}
            width={300}
            height={450}
          />
        </Poster>
      )}
      <div>
        <Title>{movie.Title}</Title>
        <Text>
          <Strong>Année :</Strong>
          {movie.Year}
        </Text>
        <Text>
          <Strong>Genre :</Strong> {movie.Genre}
        </Text>
        <Text>
          <Strong>Synopsis :</Strong>
          {movie.Plot}
        </Text>
        <Text>
          <Strong>Réalisateur:</Strong> {movie.Director}
        </Text>
        <Text>
          <Strong>Acteurs:</Strong> {movie.Actors}
        </Text>
        <Text>
          <Strong>Note IMDB:</Strong> {movie.imdbRating}
        </Text>
        <Button onClick={() => toggleFavorite(movie)}>
          {isFavorite(movie) ? "Retirer des favoris" : "Ajouter aux favoris"}
        </Button>
      </div>
    </DetailContainer>
  );
};

export default MovieDetail;
