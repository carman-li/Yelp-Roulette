import React, {Component} from "react";
import Sidetext from "./SideText";
import Graphic from "./Graphic";
import SideText from "./SideText";

class DisplayCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            business: [],
            name: "",
            price: "",
            rating: "",
            category: "",
            openNow: "",
            hours: "",
            website: "",
            image: ""
        }

        this.findBusiness = this.findBusiness.bind(this);
        this.setStates = this.setStates.bind(this);
    }

    findBusiness = () => {
        let total = this.props.total;
        let data = this.props.data;
        let num = Math.floor(Math.random() * total) + 1;
        this.setState({business: data[num]});
    }

    setStates = () => {
        let data = this.props.data;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data) {
            this.findBusiness();
            console.log(this.state.business);
        }

        if(prevState.business !== this.state.business) {
            this.setStates();
        }
    }
    render() {
        return(
            <div className="container-fluid">
                {/* <div className="row">
                    <div className="col">
                        <h1>hello</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Graphic />
                    </div>
                    <div className = "col-md">
                        <SideText />
                    </div>
                </div> */}

            </div>
        );
    }
}

export default DisplayCard;