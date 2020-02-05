import React, {Component} from "react";
import Graphic from "./Graphic";

class DisplayCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            business: [],
            name: "",
            price: "",
            rating: "",
            category: [],
            website: "",
            image: ""
        }

        this.findBusiness = this.findBusiness.bind(this);
    }

    findBusiness = () => {
        if(this.props.data) {
            let data = this.props.data;
            const num = Math.floor(Math.random() * 50) + 1;
            let business = data[num];
            this.setState({business: business});
        
            this.setState({name: data[num].name});
            this.setState({price: data[num].price});
            this.setState({rating: data[num].rating});
            this.setState({category: data[num].categories});
            this.setState({website: data[num].url});
            this.setState({image: data[num].image_url});
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data) {
            this.findBusiness();
        }
    }

    render() {
        return(
            <div>
                <h1>{this.state.name}</h1>
                <Graphic website={this.state.image} category={this.state.category} rating={this.state.rating} price={this.state.price} image={this.state.image}/>
                <a href={this.state.website} target="blank">yelp link</a>
            </div>
        );
    }
}

export default DisplayCard;