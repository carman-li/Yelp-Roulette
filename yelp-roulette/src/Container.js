import React, { Component } from "react";
import InputField from "./InputField";
import DisplayCard from "./DisplayCard";

const IP_URL =
  "https://api.ipdata.co/?api-key=e34d6e979258f05e6678a6e563a0eb5076f2a7c8fbc26327215ec385";

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
        let latitudeFromApi = data.latitude;
        let longitudeFromApi = data.longitude;
        this.setState({ latitude: latitudeFromApi });
        this.setState({ longitude: longitudeFromApi });
      })
      .catch((error) => {
        console.log(`Looks like there was a problem: \n ${error}`);
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm header">
            <h1>
              Welcome to Yelp Roulette!
              <span role="img" aria-label="taco">
                🌮
              </span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm left">
            <InputField
              isHidden={this.state.isHidden}
              longitude={this.state.longitude}
              latitude={this.state.latitude}
              callback={this.callback}
              callbackTwo={this.callbackTwo}
            />
          </div>
          <div className="col-sm right">
            {this.state.isHidden && (
              <div>
                <h3 className="cardPlaceholder">
                  What's for dinner? Take a spin.
                </h3>
              </div>
            )}
            {!this.state.isHidden && <DisplayCard data={this.state.data} />}
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    );
  }
}

export default Container;
