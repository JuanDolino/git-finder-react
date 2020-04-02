import React, { useState } from 'react';

import Header from './components/Header';

import UserData from './components/UserData';

import RepositoriesList from './components/RepositoriesList';

import axios from 'axios';

import './global.css';

function App() {
  const github = {
    url: "https://api.github.com/users",
    clientId: "fd81480048f89c483520",
    clientSecret: ""
  }; 

  const [user, setUser] = useState({
    data: ""
  });

  const [repos, setRepos] = useState([
  ]);

  function getRepos(e) {
    if(e.target.value.length > 0)
    {
      axios.get(`${github.url}/${e.target.value}/repos?client_id=${github.clientId}&client_secret=${github.clientSecret}`)
      .then(res => setRepos(res.data));
    } 
  }  

  function getUser(e) {
  
    if(e.target.value.length > 0)
    {
      axios.get(`${github.url}/${e.target.value}?client_id=${github.clientId}&client_secret=${github.clientSecret}`)
      .then(({data}) => setUser({ data }));      
    }
  }  

  return (
    <div className="App">
      <Header/>
      <input 
      type="text" 
      className="input" 
      onChange={function(e) 
      {getUser(e);
      getRepos(e);}}/>
      <div className="main-container">
        <UserData user={user}/>
        <RepositoriesList repositories={repos}/>
      </div>
    </div>

  );

}

export default App;
