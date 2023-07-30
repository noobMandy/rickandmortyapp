import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchLocationsData } from "../api/api";

const LocationList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const { data, isLoading, error } = useQuery("locations", fetchLocationsData);
  const fetchedLocations = Array.isArray(data?.results) ? data.results : [];

  const filteredLocations = fetchedLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!filter || location.type === filter)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Locations</h2>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search locations"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Planet">Planet</option>
          <option value="Space station">Space station</option>
          <option value="Microverse">Microverse</option>
          <option value="Dimension">Dimension</option>
        </select>
      </div>
      <ul>
        {filteredLocations.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
