import React from 'react';
import './createUser.css';
import CreateUserHeader from "./create-user-header/createUserHeader";
import CreateUserContent from "./create-user-content/createUserContent";

const CreateUser = () => {

    return (
        <div>
            <CreateUserHeader/>
            <CreateUserContent/>
        </div>
    )
};

export default CreateUser;
