import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchCharactersData } from "../api/api";

const CharacterList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const { data, isLoading, error } = useQuery(
    "characters",
    fetchCharactersData
  );
  const fetchedCharacters = Array.isArray(data?.results) ? data.results : [];

  const filteredCharacters = fetchedCharacters.filter(
    (character) =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!filter || character.gender === filter)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Characters</h2>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search characters"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
      <ul>
        {filteredCharacters.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
