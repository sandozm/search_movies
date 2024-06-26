import React from "react";
import Link from "@/components/atoms/Link";
import styled from "styled-components";
import Image from "next/image";
import FavoriteStar from "@/components/atoms/FavoriteStar";

const Card = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-bottom: 24px;
  border: 1px solid ${(props) => props.theme.colors.gray.normal};
  border-radius: 8px;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  background-color: ${(props) => props.theme.colors.gray.dark};
  color: ${(props) => props.theme.colors.white};

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (${(props) => props.theme.screen.sm}) {
    width: 230px;
  }
`;

const CardHeader = styled.header`
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray.normal};
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.font.size.lg};
  font-weight: 500;
  color: ${(props) => props.theme.colors.white};

  &:first-letter {
    color: ${(props) => props.theme.colors.yellow};
    font-size: ${(props) => props.theme.font.size.xl};
  }
`;

const Year = styled.p`
  color: ${(props) => props.theme.colors.yellow};
`;

const CardBody = styled.div`
  display: flex;
  justify-content: center;
  min-height: 280px;
  padding: 0 16px 16px 16px;
`;

const CardFooter = styled.footer`
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.colors.gray.normal};
`;

const FavoriteStarContainer = styled.div`
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 280px;
`;

const MovieCard = ({ movie, onToggleFavorite, isFavorite, ...restProps }) => {
  return (
    <Card {...restProps}>
      <StyledLink href={`/movie/${movie.imdbID}`}>
        <CardHeader>
          <Title>{movie.Title}</Title>
        </CardHeader>
        <CardBody>
          {movie.Poster.match("^https?://") && (
            <ImageContainer>
              <Image
                src={movie.Poster}
                alt={movie.Title}
                width={200}
                height={280}
                priority
              />
            </ImageContainer>
          )}
        </CardBody>
      </StyledLink>
      <CardFooter>
        <div>
          <Year>Année</Year>
          {movie.Year}
        </div>
        <FavoriteStarContainer onClick={() => onToggleFavorite(movie)}>
          <FavoriteStar isFavorite={isFavorite} />
        </FavoriteStarContainer>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
