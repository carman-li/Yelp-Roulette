import React, {Component} from "react";

class Star extends Component {
    render() {
        return(
            <div className="container star">
                <span className={`fa fa-star ` + this.props.className}></span>
            </div>
        );
    }
}

export default Star;