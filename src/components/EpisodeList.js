// EpisodeList.js
import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchEpisodesData } from "../api/api";

const EpisodeList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [episodeCode, setEpisodeCode] = useState("");
  const { data, isLoading, error } = useQuery(
    ["episodes", searchQuery, episodeCode],
    () => fetchEpisodesData(searchQuery, episodeCode)
  );

  const fetchedEpisodes = Array.isArray(data?.results) ? data.results : [];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEpisodeCodeChange = (e) => {
    setEpisodeCode(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Episodes</h2>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search episodes by name"
        />
        <input
          type="text"
          value={episodeCode}
          onChange={handleEpisodeCodeChange}
          placeholder="Search episodes by episode code"
        />
      </div>
      <ul>
        {fetchedEpisodes.map((episode) => (
          <li key={episode.id}>
            {episode.name} - {episode.episode}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
