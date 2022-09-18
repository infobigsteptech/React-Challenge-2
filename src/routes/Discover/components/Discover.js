import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import {
  getNewReleases,
  getFeaturedPlaylists,
  getCategories,
} from "../../../apis/SpotifyAPI";
import "../styles/_discover.scss";
import axios from "axios";

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
    const getSpotifyData = async () => {
      try {
        const [newReleases, featuredPlaylists, categories] = await Promise.all([
          getNewReleases(),
          getFeaturedPlaylists(),
          getCategories(),
        ]);

        this.setState({
          newReleases: newReleases.data.albums.items,
          playlists: featuredPlaylists.data.playlists.items,
          categories: categories.data.categories.items,
        });
      } catch (error) {
        console.error(error.message);
      }
    };
    getSpotifyData();
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
