import React, {Component} from "react";

const CORS_URL = 'https://cors-anywhere.herokuapp.com/';
const YELP_KEY = process.env.REACT_APP_YELP_API_KEY;
const YELP_URL = `https://api.yelp.com/v3/businesses/search`;
const IPSTACK_URL = "http://api.ipstack.com/check?access_key=15d1ae7d2dbaaae6f31b2c46a2d3e320";

class InputField extends Component{
    constructor(props) {
        super(props);

        this.state = {
            longitude: "",
            latitude: "",
            search: ""
        }

        this.handleChange = this.handleChange.bind(this); // whenever handleChange is invoked, we want the context to be InputField
        this.handleSubmit = this.handleSubmit.bind(this); // whenever handleSubmit is invoked, we want the context to be InputField
    }

    async componentDidMount() {
        await fetch(IPSTACK_URL)
        .then (response => response.json())
        .then (data => {
            let latitudeFromApi = data.latitude;
            let longitudeFromApi = data.longitude;
            this.setState({latitude: latitudeFromApi});
            this.setState({longitude: longitudeFromApi});
        })
        .catch(error => {
            console.log(`Looks like there was a problem: \n ${error}`);
        })

        let url = new URL(CORS_URL + YELP_URL);
        let params = {
            search: this.state.search,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        console.log(url);

        await fetch ((url), {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${YELP_KEY}`
            }
        })
        .then(response => {
            console.log(response.json());
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
        this.componentDidMount();
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