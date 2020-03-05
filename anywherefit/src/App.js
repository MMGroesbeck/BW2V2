import React, {useState} from 'react';
import { Route, useHistory } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import startData from "./dummyData";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import LogReg from "./components/LoginReg";
import Dashboard from "./components/Dashboard";

function App() {
  const history = useHistory();
  const [user, setUser] = useState({name:"",instructor:false,password:"",enrolled:[]});
  const loginUser = newUser => {
    userList.forEach(existingUser => {
      if ((existingUser.name === newUser.name) && (existingUser.password === newUser.password)){
        setUser(existingUser);
      }
      history.push("/dashboard");
    })
  }
  const updateUserClasses = (newClassList) => {
    const updatedUser={
      name: user.name,
      instructor: user.instructor,
      password: user.password,
      enrolled: newClassList
    }
    setUserList([...userList.filter(thisUser => thisUser.name != user.name)], updatedUser);
  }
  const enroll = (id) => {
    updateUserClasses([...user.enrolled, id]);
    updateEnrollment(id, 1);
  }
  const withdraw = (id) => {
    updateUserClasses(user.enrolled.filter(thisID => thisID != id));
    updateEnrollment(id, -1);
  }
  const [userList, setUserList] = useState(startData.users);
  const addUser = newUser => {
    console.log("Adding user: ", newUser);
    setUserList([...userList, newUser]);
  }
  const [classList, setClassList] = useState(startData.classes);
  const addClass = newClass => {
    setClassList([...classList, newClass]);
  }
  const deleteClass = id => {
    setClassList(classList.filter(thisClass => thisClass.id != id));
  }
  const updateEnrollment = (id, val) => {
    let thisClass = {};
    for (const currentClass in classList) {
      if (currentClass.id === id){
        thisClass = currentClass;
        deleteClass(id);
        addClass(thisClass);
      }
    }
  }
 
  //RETURN:
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
        <Dashboard activeUser={user} classList={classList} addClass={addClass} deleteClass={deleteClass} enroll={enroll} withdraw={withdraw}/>
      </Route>
    </div>
  );
}

export default App;
