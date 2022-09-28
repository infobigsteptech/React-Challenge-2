import React,{useState,useEffect} from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import Axios from 'axios';
import { Credentials } from '../../../config';

export default function Discover() {
  const [newReleases, setNewReleases] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [categories, setCategories] = useState([])


const spotify = Credentials();  

  useEffect(() => {
    Axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      console.log(tokenResponse)
      getNewreleases(tokenResponse.data.access_token)
      getFeaturedList(tokenResponse.data.access_token)
      getCategories(tokenResponse.data.access_token)
    });
    
  }, [spotify.ClientId, spotify.ClientSecret]);
  

  const getNewreleases =(token)=>{
    Axios("https://api.spotify.com/v1/browse/new-releases", {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
      }).then((res)=>{
        if(res){
          const data = res?.data?.albums?.items
          setNewReleases(data)
        }
      }).catch((err)=>{
        console.log(err)
      })
  }

  const getFeaturedList = (token) => {
    Axios("https://api.spotify.com/v1/browse/featured-playlists" , {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
      }).then((res)=>{
        if(res){
          const data = res?.data?.playlists?.items
          setPlaylists(data)
        }
      }).catch((err)=>{
        console.log(err)
      })
  }
  const getCategories =(token)=>{
    Axios("https://api.spotify.com/v1/browse/categories" , {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    }).then((res)=>{
      if(res){
        const data = res?.data?.categories?.items
        setCategories(data)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  
  return (
    <div className="discover">
      <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
      <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
    </div>
  );
}

