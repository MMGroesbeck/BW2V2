import React from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import startData from "./dummyData";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import LogReg from "./components/LoginReg";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/">
        <Welcome />
      </Route>
      <Route path="/login">
        <LogReg />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </div>
  );
}

export default App;
