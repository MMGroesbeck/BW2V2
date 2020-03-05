import React, {useState} from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import startData from "./dummyData";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import LogReg from "./components/LoginReg";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState({name:"",instructor:false,password:"",enrolled:[]});
  const loginUser = newUser => {
    userList.forEach(existingUser => {
      if ((existingUser.name === newUser.name) && (existingUser.password === newUser.password)){
        setUser(existingUser);
      }
    })
  }
  //"Fake server" states for user list and class list:
  const [userList, setUserList] = useState(startData.users);
  const addUser = newUser => {
    setUserList([...userList, newUser]);
  }
  const [classList, setClassList] = useState(startData.classes);
  const addClass = newClass => {
    setClassList([...classList, newClass]);
  }
  const deleteClass = id => {
    setClassList(classList.filter(thisClass => thisClass.id != id));
  }
  return (
    <div className="App">
      <Header />
      <Route exact path="/">
        <Welcome />
      </Route>
      <Route path="/login">
        <LogReg activeUser={user} loginUser={loginUser} addUser={addUser}/>
      </Route>
      <Route path="/dashboard">
        <Dashboard user={user} classList={classList} addClass={addClass} deleteClass={deleteClass}/>
      </Route>
    </div>
  );
}

export default App;
