import React, {Component} from "react";
import Star from "./Star";
import "./index.css"

class StarRating extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stars: [],
            full: "full",
            empty: "empty",
            half: "half"
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rating !== this.props.rating) {
            let rating = this.props.rating;
            let array = [];
            var isHalf = false;

            if (rating % 1 !== 0) {
                isHalf = true;
            }

            if (!isHalf) {
                for (var i = 0; i < rating; ++i) {
                    array.push(<Star className={this.state.full} key={rating + i}/>);
                }

                rating = 5 - rating;
                for (var k = 0; k < rating; ++k) {
                    array.push(<Star className={this.state.empty} key={rating + k}/>);
                }
            }
            else if (isHalf) {
                rating = rating - 0.5;
                for (var j = 0; j < rating; ++j)  {
                    array.push(<Star className={this.state.full} key={rating + j}/>);
                }

                rating = 5 - (rating + 0.5);
                console.log("new" + rating);
                for (var q = 1; q <= rating; ++q) {
                    array.push(<Star className={this.state.empty} key={rating + q}/>);
                }

                array.push(<Star className={this.state.half} key="halfstar"/>)
            }

            this.setState({stars: array});
        }
    }

    render() {

        return(
            <div className="container star">
                {this.state.stars}
            </div>  
        );
    }
}

export default StarRating;