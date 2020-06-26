import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import ViewPage from './components/pages/ViewPage';
import LoremSeed from './components/common/LoremSeed';

function App() {
  return (
    <>
    <Switch>
      <Route exact path='/view' render={() => {
        return <ViewPage/>
      }}/>
      <Route path='/' render={() => {
        return <ViewPage/>
      }}/>
    </Switch>
    </>
  );
}

export default App;
