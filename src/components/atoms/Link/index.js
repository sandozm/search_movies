import React from "react";
import NextLink from "next/link";

const Link = ({ href, children, ...restProps }) => {
  return (
    <NextLink href={href} passHref {...restProps}>
      {children}
    </NextLink>
  );
};

export default Link;
