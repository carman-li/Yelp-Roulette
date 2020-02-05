import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import Container from "./Container"

ReactDOM.render(
    <div className="container-fluid">
        <div className="row">
            <div className="col"><Container /></div>
        </div>
    </div>
    , document.getElementById('root'));
