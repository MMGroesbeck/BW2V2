import React, { useEffect, useState } from "react";
import { Route, useHistory } from 'react-router-dom';
import ClassSrchList from './ClassSrchList';
import ClassCard from "./ClassCard";

const ClientClasses = ({ activeUser, classList, withdraw, currentList, enroll }) => {
    const [myClassList, updateMyClassList] = useState(classList);
    useEffect(() => {
        const watchClassList = () => {
            updateMyClassList(classList);
        }
        watchClassList();
    },[classList]);
  return (
    <div>
      {/* <Route exact path="/dashboard/results">
          {currentList && <ClassSrchList currentList={currentList} enroll={enroll} />}
      </Route> */}
      <h2>Classes I am enrolled in:</h2>

      {myClassList.map(currentClass => {
        if (activeUser.enrolled.includes(currentClass.id)) {
          return (
            <ClassCard
              activeClass={currentClass}
              withdraw={withdraw}
              enroll={false}
              deleteClass={false}
            />
          );
        }
      })}
    </div>
  );
};

export default ClientClasses;
