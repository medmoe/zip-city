import React, {Component} from 'react';

class CityCard extends Component {
    render(){
        return <div className="city-card">
            <div className="card-header">
                <p>{this.props.city}, {this.props.state}</p>
            </div>
            <div className="card-body">
                <p><span>State:</span> {this.props.state}</p>
                <p><span>Location:</span> ({this.props.lat}, {this.props.long})</p>
                <p><span>Estimated population:</span> {this.props.estimatedPopulation}</p>
                <p><span>Total wages:</span> {this.props.totalWages}</p>
            </div>
        </div>
    }
}

export default CityCard;