import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

const SearchMovieForm = ({ onSearchMoviesSubmit, ...restProps }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchMoviesSubmit({
      searchTerm: searchTerm,
      type: type,
      year: year,
    });
  };

  return (
    <div {...restProps}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="s">Rechercher :</label>
          <Input
            type="text"
            id="s"
            name="s"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="type">Type :</label>
          <Select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={[
              { value: "", label: "Aucun" },
              { value: "movie", label: "Film" },
              { value: "series", label: "Serie" },
              { value: "episode", label: "Episode" },
            ]}
          ></Select>
        </div>
        <div>
          <label htmlFor="y">Année :</label>
          <Input
            type="number"
            min="1900"
            max="2099"
            step="1"
            id="y"
            name="y"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <Button type="submit">Rechercher</Button>
      </form>
    </div>
  );
};

export default SearchMovieForm;
