import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import InputField from "./InputField";
// import Display from "./Display"

ReactDOM.render(
    <div className="container-fluid">
        <div className="row">
            <div className = "col col-4 left">
                <h1>welcome to yelp roulette!</h1>
                <InputField />
            </div>
            <div className="col right">
                {/* <Display /> */}
            </div>
        </div>
    </div>
    , document.getElementById('root'));
