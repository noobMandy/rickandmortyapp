import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api/";

export const fetchCharactersData = async () => {
  const response = await axios.get(`${BASE_URL}character`);
  return response.data;
};

export const fetchEpisodesData = async () => {
  const response = await axios.get(`${BASE_URL}episode`);
  return response.data;
};

export const fetchLocationsData = async () => {
  const response = await axios.get(`${BASE_URL}location`);
  return response.data;
};
