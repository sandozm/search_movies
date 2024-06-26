import React from "react";
import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Loader = styled.div`
  width: 50px;
  height: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid transparent;
  border-right-color: ${(props) => props.theme.colors.yellow};
  position: relative;
  animation: ${spinAnimation} 1s infinite linear;

  &:before,
  &:after {
    content: "";
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: inherit;
    animation: ${spinAnimation} 2s infinite;
  }

  &:after {
    animation-duration: 4s;
  }
`;

const Loading = () => {
  return (
    <LoadingOverlay>
      <Loader />
    </LoadingOverlay>
  );
};

export default Loading;
