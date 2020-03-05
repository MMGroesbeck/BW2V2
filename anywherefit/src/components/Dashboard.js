import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import InstrClasses from './InstrClasses';
import ClientClasses from './ClientClasses';
import SearchForm from './SearchForm';
import ClassSrchList from './ClassSrchList';

const Dashboard = ({activeUser, classList, addClass, deleteClass, enroll, withdraw}) => {
    const history = useHistory();
    const [currentList, setCurrentList] = useState([]);
    const toResults = () => {history.push("/dashboard/results")}
    return (
        <div className = "dashboard">
            <h1>Welcome, {activeUser.name}!</h1>
            <button onClick={() => history.push("/")}>Log Out</button>
            <Route exact path="/dashboard">
                <button onClick={()=>history.push("/dashboard/search")}>Search</button>
                {activeUser.instructor && <button onClick={()=>history.push("/dashboard/addclass")}>New Class</button>}
            </Route>
            <Route exact path="/dashboard/search">
                <SearchForm activeUser={activeUser} classList={classList} setCurrentList={setCurrentList} toResults={toResults}/>
            </Route>
            <Route exact path="/dashboard/results">
            {currentList && <ClassSrchList currentList={currentList} enroll={enroll} />}
            </Route>
            {activeUser.instructor && <InstrClasses activeUser={activeUser} classList={classList}  deleteClass={deleteClass}/>}
            <ClientClasses activeUser={activeUser} classList={classList} withdraw={withdraw} currentList={currentList} enroll={enroll}/>
        </div>
    );
}

export default Dashboard;