import React, {Component} from "react";
import InputField from "./InputField";
import DisplayCard from "./DisplayCard"

const IPSTACK_URL = "http://api.ipstack.com/check?access_key=15d1ae7d2dbaaae6f31b2c46a2d3e320";

class Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            total: "",
            longitude: "0",
            latitude: "0"
        }

        this.callback = this.callback.bind(this);
    }

    callback = (data, total) => {
        this.setState({data: data});
        this.setState({total: total});
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
    }


    render() {
        return(
            <div className="row">
            <div className = "col col-4 left">
                <h1>welcome to yelp roulette!</h1>
                <InputField longitude={this.state.longitude} latitude={this.state.latitude} callback={this.callback}/>
            </div>
            <div className="col right">
                <DisplayCard data={this.state.data} total={this.state.total}/>
            </div>
        </div>
        );
    }
}

export default Container;