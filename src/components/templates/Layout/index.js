import React from "react";
import Head from "next/head";

const SearchPageTemplate = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default SearchPageTemplate;
