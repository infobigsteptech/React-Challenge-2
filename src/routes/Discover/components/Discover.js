import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import apiDetail from '../../../config';
import axios from 'axios';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      accessToken: '',
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount() {
    const reqTokenOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(apiDetail.api.clientId + ':' + apiDetail.api.clientSecret)
      },
      data: 'grant_type=client_credentials',
    };
    axios('https://accounts.spotify.com/api/token', reqTokenOptions)
      .then(res => this.setState({ accessToken: res.data.access_token }))
      .then(() => {
        if (this.state.accessToken) {
          const apiConfig = {
            headers: { 'Authorization': 'Bearer ' + this.state.accessToken }
          };
          Promise.all([
            axios(apiDetail.api.baseUrl + '/browse/new-releases', apiConfig),
            axios(apiDetail.api.baseUrl + '/browse/featured-playlists', apiConfig),
            axios(apiDetail.api.baseUrl + '/browse/categories', apiConfig),
          ]).then(([newReleasesData, playlistsData, categoriesData]) => {
            this.setState({ newReleases: newReleasesData.data.albums.items });
            this.setState({ playlists: playlistsData.data.playlists.items });
            this.setState({ categories: categoriesData.data.categories.items });
          }).catch(error => {
            console.log(error);
          })
        } else {
          console.log('Error fetching token !');
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
