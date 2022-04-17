import logo from '../logo.svg';
import React from 'react';
  
const Home = () => {
  return (
    <div>
      <h1>MBTA Minisite</h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://github.com/Fungsten"
          target="_blank"
          rel="noopener noreferrer"
        >
          Will's Github
        </a>
      </header>
    </div>
  );
};
  
export default Home;