import React, { createContext, useReducer } from 'react';
import EmployeeReducer from '../reducers/EmployeeReducer';

// interface employee {
//     id: 1, 
//     name: 'Ishan Manandhar', 
//     location: 'Kathmandu', 
//     designation: 'Frontend Dev'
    
// }

const initialState = {
    employees: [
        { id: 1, name: 'Ishan Manandhar', location: 'Kathmandu', designation: 'Frontend Dev' }
    ],
    
};

export const EmployeeContext = createContext(initialState);
export const EmployeeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EmployeeReducer, initialState);

    // function removeEmployee(id) {
    //     dispatch({
    //         type: 'REMOVE_EMPLOYEE',
    //         payload: id
    //     });
    // };

    // function addEmployee(employees) {
    //     dispatch({
    //         type: 'ADD_EMPLOYEES',
    //         payload: employees
    //     });
    // };

    // function editEmployee(employees) {
    //     dispatch({
    //         type: 'EDIT_EMPLOYEE',
    //         payload: employees
    //     });
    // };

    return (<EmployeeContext.Provider value={{
        employees: state.employees,
        removeEmployee,
        addEmployee,
        editEmployee
    }}>
        {children}
    </EmployeeContext.Provider>);
}