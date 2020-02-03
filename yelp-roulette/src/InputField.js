import React, {Component} from "react";

const YELP_KEY = process.env.REACT_APP_YELP_API_KEY;

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

    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        fetch("https://api.yelp.com/v3/businesses/search?")
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