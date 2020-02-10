import React, {Component} from "react";
import StarRating from "./StarRating";

class DisplayCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            business: [],
            name: "",
            price: "",
            rating: 0,
            category: [],
            categoryOne: "",
            categoryTwo: "",
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
            this.setState({categoryOne: data[num].categories[0].title});
            if(data[num].categories[1]) {
                this.setState({categoryTwo: data[num].categories[1].title});
            }
            this.setState({website: data[num].url});
            this.setState({image: data[num].image_url});
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data) {
            this.setState({categoryTwo: ""});
            this.findBusiness();
        }
    }

    render() {
        return(
            <div className="card cardStyle">
                <img className="card-img-top" src={this.state.image} alt="Card"></img>
                <div className="card-body">
                    <h4 className="card-title">{this.state.name}</h4>
                    <StarRating rating={this.state.rating}/>
                    <p className="card-heading">{this.state.price} - {this.state.categoryOne} ~ {this.state.categoryTwo}</p>
                    <a href={this.state.website} className="btn btn-outline-light stretched-link" target="blank">View on Yelp!</a>
                </div>
            </div>
        );
    }
}

export default DisplayCard;