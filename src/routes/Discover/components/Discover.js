import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import {
  getAuthToken,
  getNewReleases,
  getFeaturedPlaylists,
  getCategories,
} from "../../../services/spootify.service";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  componentDidMount() {
    (async () => {
      const authResponse = await getAuthToken();
      const authToken = authResponse.data.access_token;
      if (authToken) {
        try {
          const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          };
          const [releasesResp, playlistsResp, categoriesResp] =
            await Promise.all([
              getNewReleases(headers),
              getFeaturedPlaylists(headers),
              getCategories(headers),
            ]);
          this.setState({
            newReleases: releasesResp.data.albums.items,
            playlists: playlistsResp.data.playlists.items,
            categories: categoriesResp.data.categories.items,
          });
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
