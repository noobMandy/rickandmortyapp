import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api/";

export const fetchCharactersData = async () => {
  const response = await axios.get(`${BASE_URL}character`);
  return response.data;
};



export const fetchEpisodesData = async (name = "", episodeCode = "") => {
  const queryParams = new URLSearchParams();
  if (name) {
    queryParams.append("name", name);
  }
  if (episodeCode) {
    queryParams.append("episode", episodeCode);
  }

  const response = await axios.get(`${BASE_URL}episode?${queryParams.toString()}`);
  return response.data;
};

export const fetchLocationsData = async () => {
  const response = await axios.get(`${BASE_URL}location`);
  return response.data;
};
