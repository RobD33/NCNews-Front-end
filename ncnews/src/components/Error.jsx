import React from 'react';
import './Error.css';

const Error = (props) => {
    const {msg, status} = props.history.location.state ? props.history.location.state : {msg: 'File not Found', status: 404}
    return (
        <div>
            <h1>Some error type thing happened</h1>
            <h2>{msg}</h2>
            <img src={require(`../../public/${status}.png`)} alt={status} />
        </div>
    );
};

export default Error;