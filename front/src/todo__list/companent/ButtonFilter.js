import React from 'react';
import ChangeStatus from './function/ChangeStatus'


const ButtonFilter = ({allStatus,activeStatus,completedStatus, ...props}) => {

    return(
        <div>
            <button onClick={allStatus}>ALL</button> 
            <button onClick={activeStatus}>active</button>
            <button onClick={completedStatus}>completed</button>
            
        </div>
    )
}

export default ButtonFilter;