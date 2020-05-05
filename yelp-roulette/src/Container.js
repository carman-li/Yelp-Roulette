import React, { Component } from "react";
import InputField from "./InputField";
import DisplayCard from "./DisplayCard";

const IP_URL = "http://ip-api.com/json";

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      total: "",
      longitude: 0,
      latitude: 0,
      isHidden: true,
    };

    this.callback = this.callback.bind(this);
    this.callbackTwo = this.callbackTwo.bind(this);
  }

  callback = (data) => {
    this.setState({ data: data });
  };

  callbackTwo = (isHidden) => {
    this.setState({ isHidden: isHidden });
  };

  async componentDidMount() {
    await fetch(IP_URL)
      .then((response) => response.json())
      .then((data) => {
        let latitudeFromApi = data.lat;
        let longitudeFromApi = data.lon;
        this.setState({ latitude: latitudeFromApi });
        this.setState({ longitude: longitudeFromApi });
      })
      .catch((error) => {
        console.log(`Looks like there was a problem: \n ${error}`);
      });
  }

  render() {
    return (
      <div className="container-fluid cont">
        <div className="row">
          <div className="col-md header">
            <h1>
              Welcome to Yelp Roulette!
              <span role="img" aria-label="taco">
                🌮
              </span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md"></div>
          <div className="col-md left">
            <InputField
              isHidden={this.state.isHidden}
              longitude={this.state.longitude}
              latitude={this.state.latitude}
              callback={this.callback}
              callbackTwo={this.callbackTwo}
            />
          </div>
          <div className="col-md right">
            {this.state.isHidden && (
              <div className="card cardStyle">
                <h4 className="cardPlaceholder">Restaurant Incoming...</h4>
              </div>
            )}
            {!this.state.isHidden && <DisplayCard data={this.state.data} />}
          </div>
          <div className="col-md"></div>
        </div>
      </div>
    );
  }
}

export default Container;
