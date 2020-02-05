import React, {Component} from "react";

class Graphic extends Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div><img src={this.props.website} alt="Restaurant Image"></img></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Graphic;