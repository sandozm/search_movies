import React from "react";
import styled from "styled-components";
import Head from "next/head";

const Container = styled.div`
  padding: 32px;
`;

const Layout = ({ title, children }) => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      {children}
    </Container>
  );
};

export default Layout;
