import React, { useState, useEffect } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import defaultConfig from '../../../config';
import { fetchAuthToken, fetchNewReleases, fetchFeaturedPlaylists, fetchCategories } from '../../../helpers/helpers';

export default function Discover() {
  // declaring component states at top level
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] =  useState(false);
  const [newReleases, setNewReleases] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [categories, setCategories] = useState([]);

  // Assigning values to constants which are used to redirect login page
  const CLIENT_ID = defaultConfig.api.clientId;
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  // fetching token on clicking login url
  useEffect(() => {
    async function fetchData() {
    const tokenGenerated = await fetchAuthToken();
    setToken(tokenGenerated);
    }
    fetchData();
  }, [loggedIn]);

// setting false to login state while unmounting
  useEffect(() => {
    return () => setLoggedIn(false);
  }, []);

  // fetching all the three api's using promise.all which will give response after everything resolves,
  // triggered when token changes
  useEffect(() => {
    Promise.all([fetchNewReleases, fetchFeaturedPlaylists, fetchCategories])
    .then(values => {
      // setting the response to local states which will rerender the UI with fresh data
      setNewReleases(values[0]);
      setPlaylists(values[1]);
      setCategories(values[2]);
    });
  }, [token]);


  return (
    <div className="discover">
      {!token ?
        <div style={{ margin: '30px' }} onClick={() => setLoggedIn(true)}>
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify to fetch the below results</a>
        </div>
        :
        <>
          <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
          <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
          <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
        </>
      }
    </div>
  );
}
