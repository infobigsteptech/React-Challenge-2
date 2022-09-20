import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      accessToken: "",
    };
  }

  componentDidMount() {
    const { clientId, clientSecret, baseUrl, authUrl } = config.api
    const headersData = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      data: "grant_type=client_credentials",
    }

    axios(authUrl, headersData)
      .then((res) => this.setState({ accessToken: res.data.access_token }))
      .then(() => {
        if (this.state.accessToken) {
          const authHeader = {
            headers: { Authorization: "Bearer " + this.state.accessToken },
          }
          Promise.all([
            axios(baseUrl + "/browse/new-releases", authHeader),
            axios(baseUrl + "/browse/featured-playlists", authHeader),
            axios(baseUrl + "/browse/categories", authHeader),
          ])
            .then(([newReleasesData, playlistsData, categoriesData]) => {
              this.setState({
                newReleases: newReleasesData.data?.albums?.items,
                playlists: playlistsData.data?.playlists?.items,
                categories: categoriesData.data?.categories?.items,
              })
            })
            .catch((e) => {
              console.log(e)
            })
        } else {
          console.log(" Access token not found!")
        }
      })
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
