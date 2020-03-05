import React from 'react';
import ClassCard from './ClassCard';

const InstrClasses = ({activeUser, classList}) => {
    return(
        <div>
            <h2>Classes I teach:</h2>
            {classList.map( currentClass => {
                if (currentClass.instructor === activeUser.name) {
                    return (
                        <ClassCard
                          activeClass={currentClass}
                          withdraw={false}
                          enroll={false}
                          deleteClass={false}
                        />
                      );
                }
            })}
        </div>
    )
}

export default InstrClasses;