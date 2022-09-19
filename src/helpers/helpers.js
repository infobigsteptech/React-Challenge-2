import defaultConfig from '../config';
import axios from 'axios';

export async function fetchAuthToken() {
    const hashKey = window.location.hash
    let tokenGenerated = window.localStorage.getItem("token")

    if (!tokenGenerated && hashKey) {
        tokenGenerated = hashKey.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
        window.location.hashKey = ""
        window.localStorage.setItem("token", tokenGenerated)
    }
    return tokenGenerated;
}


// setting the default baseUrl and header type
axios.defaults.baseURL = defaultConfig.api.baseUrl;
axios.defaults.headers.common['Content-Type'] = 'application/json';

//getting token
const token = fetchAuthToken();

// constants with three axios get calls 

export const fetchNewReleases = axios.get("browse/new-releases", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const fetchFeaturedPlaylists = axios.get("browse/featured-playlists", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const fetchCategories = axios.get("browse/categories", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});