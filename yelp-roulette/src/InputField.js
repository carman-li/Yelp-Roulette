import React, {Component} from "react";

const CORS_URL = 'https://cors-anywhere.herokuapp.com/';
const YELP_KEY = process.env.REACT_APP_YELP_API_KEY;
const YELP_URL = `https://api.yelp.com/v3/businesses/search?location=waterloo&term=`;

class InputField extends Component{
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            search: ""
        }

        this.handleChange = this.handleChange.bind(this); // whenever handleChange is invoked, we want the context to be InputField
        this.handleSubmit = this.handleSubmit.bind(this); // whenever handleSubmit is invoked, we want the context to be InputField
    }

    componentDidMount() {
        fetch ((CORS_URL + YELP_URL + this.state.search), {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${YELP_KEY}`
            }
        })
        .then(response => {
            console.log(response.text());
        })
        .catch(error => {
            console.log(`Looks like there was a problem: \n ${error}`);
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value});
        alert(this.state.search);
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <h3>you are searching for: {this.state.search}</h3>
                    <input className="field" type="text" name="search" value={this.state.search} onChange={this.handleChange}></input>
                    <input className="button" type="submit"></input>
                </form>
            </div>
        );
    }
}

export default InputField;