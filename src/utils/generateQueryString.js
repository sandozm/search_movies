// Generate a QueryString by object list
// example : [{a: 'foo', b: 'bar }] => "&a=foo&b=bar" (String)

const generateQueryString = (params) => {
  if (!params || typeof params !== "object") return "";

  const queryString = Object.entries(params)
    .map(([key, value]) => {
      if (value) {
        return `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
    })
    .join("");

  return queryString;
};

export default generateQueryString;
