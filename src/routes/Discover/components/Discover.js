import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import axios from 'axios';
import { api } from '../../../config';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      token: '',
      newReleases: [],
      playlists: [],
      categories: []
    };
  }
  componentDidMount = () => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(api.clientId + ':' + api.clientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
      .then(res => {
        this.setState({ token: res.data.access_token });
        console.log("Token", res.data.access_token)
        axios('https://api.spotify.com/v1/browse/new-releases', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
          .then(res => {
            this.setState({ newReleases: res.data.albums.items })
          });
      })
      .then(res => {
        axios('https://api.spotify.com/v1/browse/featured-playlists', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
          .then(res => {
            this.setState({ playlists: res.data.playlists.items })
          });
      })
      .then(res => {
        axios('https://api.spotify.com/v1/browse/categories', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
          .then(res => {
            this.setState({ categories: res.data.categories.items })
          });
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
