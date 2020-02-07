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
            longitude: 0,
            latitude: 0,
            isHidden: true
        }

        this.callback = this.callback.bind(this);
        this.callbackTwo = this.callbackTwo.bind(this);
    }

    callback = (data) => {
        this.setState({data: data});
    }

    callbackTwo = (isHidden) => {
        this.setState({isHidden: isHidden});
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
        <div className="container-fluid cont">
            <div className="row">
                <div className = "col-md header">
                    <h1>Welcome to Yelp Roulette!</h1>
                </div>
            </div>
            <div className = "row">
                <div className="col-md"></div>
                <div className = "col-md left">
                    <InputField isHidden={this.state.isHidden} longitude={this.state.longitude} latitude={this.state.latitude} callback={this.callback} callbackTwo={this.callbackTwo}/>
                </div>
                <div className="col-md right">
                    {this.state.isHidden && 
                    <div className="card cardStyle">
                        <h4 className="cardPlaceholder">Restaurant Incoming...</h4>
                    </div>}
                    {!this.state.isHidden && <DisplayCard data={this.state.data} />}
                </div>
                <div className="col-md"></div>
            </div>
        </div>
        );
    }
}

export default Container;