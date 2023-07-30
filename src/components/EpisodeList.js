import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchEpisodesData } from "../api/api";

const EpisodeList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const { data, isLoading, error } = useQuery("episodes", fetchEpisodesData);
  const fetchedEpisodes = Array.isArray(data?.results) ? data.results : [];

  const filteredEpisodes = fetchedEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!filter || episode.type === filter)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Episodes</h2>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search episodes"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="normal">Normal</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <ul>
        {filteredEpisodes.map((episode) => (
          <li key={episode.id}>{episode.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
