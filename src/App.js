import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import GamePage from './views/GamePage';
import AboutPage from './views/AboutPage';

function App() {
  return (
      <div>
        <h1>App</h1>
      <Route exact path="/" component={GamePage} />
      <Route path="/about" component={AboutPage} />
      </div>
  );
}

export default App;
