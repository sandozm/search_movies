import React, { useState } from "react";
import styled from "styled-components";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  border-radius: 4px;
  margin: 16px auto;
  position: relative;

  @media (${(props) => props.theme.screen.sm}) {
    width: 600px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (${(props) => props.theme.screen.sm}) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Label = styled.label`
  @media (${(props) => props.theme.screen.sm}) {
    position: absolute;
    top: -8px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (${(props) => props.theme.screen.sm}) {
    flex-direction: row;
  }
`;

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
    <SearchContainer {...restProps}>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Label htmlFor="s">Rechercher :</Label>
          <Input
            type="text"
            id="s"
            name="s"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="type">Type :</Label>
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
        </InputContainer>
        <InputContainer>
          <Label htmlFor="y">Année :</Label>
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
        </InputContainer>

        <Button type="submit">Rechercher</Button>
      </Form>
    </SearchContainer>
  );
};

export default SearchMovieForm;
