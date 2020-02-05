import React, {Component} from "react";

const CORS_URL = 'https://cors-anywhere.herokuapp.com/';
const YELP_KEY = process.env.REACT_APP_YELP_API_KEY;
const YELP_URL = `https://api.yelp.com/v3/businesses/search`;

class InputField extends Component{
    constructor(props) {
        super(props);

        this.state = {
            data:[],
            total: "",
            search: "",
            radius: 5000,
            limit: 50,
            offset: 0,
            isHidden: true
        }

        this.handleChange = this.handleChange.bind(this); // whenever handleChange is invoked, we want the context to be InputField
        this.handleSubmit = this.handleSubmit.bind(this); // whenever handleSubmit is invoked, we want the context to be InputField
        this.sendData = this.sendData.bind(this);
        this.sendHidden = this.sendHidden.bind(this);
    }

    sendData = () => {
        this.props.callback(this.state.data);
    }

    sendHidden = () => {
        this.props.callbackTwo(!this.state.isHidden);
    }

    async componentDidMount() {
        let url = new URL(CORS_URL + YELP_URL);

        let offset = Math.floor(Math.random() * 50) + 1;
        let params = {
            search: this.state.search,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            radius: this.state.radius,
            limit: this.state.limit,
            offset: offset
        };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        console.log(url);

        let response = await fetch ((url), {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${YELP_KEY}`
            }
        })
        .catch(error => {
            console.log(`Looks like there was a problem: \n ${error}`);
        })

        let data = await response.json()
        .catch(error => {
            console.log(`Looks like there was a problem: \n ${error}`);
        })

        this.setState({data: data.businesses})
        this.sendData();
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value});
        this.componentDidMount();
        this.sendHidden();

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