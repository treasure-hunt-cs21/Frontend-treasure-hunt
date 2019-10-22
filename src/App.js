import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom';

import GamePage from './views/GamePage';
import AboutPage from './views/AboutPage';

function App() {
  return (
      <div>
      <Route path="/about" component={AboutPage} />
      <Route exact path="/" component={GamePage} />
      </div>
  );
}

export default App;
