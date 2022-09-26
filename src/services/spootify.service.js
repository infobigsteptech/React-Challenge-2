import axios from "axios";
import config from "../config";

const { baseUrl, clientId, clientSecret } = config.api;

export const getAuthToken = () =>
  axios("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    data: "grant_type=client_credentials",
  });

export const getNewReleases = (headers) =>
  axios.get(`${baseUrl}/browse/new-releases`, {
    headers,
  });

export const getFeaturedPlaylists = (headers) =>
  axios.get(`${baseUrl}/browse/featured-playlists`, {
    headers,
  });

export const getCategories = (headers) =>
  axios.get(`${baseUrl}/browse/categories`, {
    headers,
  });
