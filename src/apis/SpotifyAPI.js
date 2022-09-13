import axios from "axios";
import config from "../config";

const { baseUrl, sampleToken } = config.api;

const HEADERS = {
  Accept: "application/json",
  Authorization: "Bearer " + sampleToken,
  "Content-Type": "application/json",
};

export function getNewReleases() {
  return axios.get(`${baseUrl}/new-releases`, {
    headers: HEADERS,
  });
}

export function getFeaturedPlaylists() {
  return axios.get(`${baseUrl}/featured-playlists`, {
    headers: HEADERS,
  });
}

export function getCategories() {
  return axios.get(`${baseUrl}/categories`, {
    headers: HEADERS,
  });
}
