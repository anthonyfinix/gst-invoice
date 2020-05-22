import React from 'react';
import { Redirect } from 'react-router-dom';
export default (props) => {
    if (!props.userDetails) return <Redirect to="/login" />
    return (
        <h1>Layout</h1>
    )
}