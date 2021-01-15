import React, {Component} from 'react';
import CityCard from './CityCard';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            data : [],
            code : ''
        }
        this.getValue = this.getValue.bind(this);
        this.getCities = this.getCities.bind(this);
    }
    getValue(event){
        this.setState({
            code : event.target.value
        })
    }
    getCities(){
        this.setState({
            error: null
        })
        fetch(`http://ctp-zip-api.herokuapp.com/zip/${this.state.code}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                  } else if(response.status === 404) {
                    return Promise.reject('error 404')
                  } else {
                    return Promise.reject('some other error: ' + response.status)
                  }
            })
            .then(
                (resault) => {
                    this.setState({
                        isLoaded : true,
                        data : resault
                    })
                })
            .catch((error) =>{
                this.setState({
                    error: error
                })
            });
    }
    render(){
        let cards = []
        let city, state, estimatedpp, totalwages, lat, long;
        console.log(this.state.error);
        if(this.state.error != null){
            return <div>
                <div className = "banner">
                        <p>Zip Code Search</p>
                    </div>
                    <div className = "search-bar">
                        <input type="text" onChange={this.getValue}></input>
                        <button onClick={this.getCities}>Search</button>
                    </div>
                    <div className = "error">
                        <p>no cities found for the given zip code !!</p>
                    </div>
            </div>
        }else{
            for(let i = 0; i < this.state.data.length; i++){
                //extract the desired propreties
                for(let p in this.state.data[i]){
                    switch(p){
                        case "City":
                            city = this.state.data[i][p];
                            break;
                        case "State":
                            state = this.state.data[i][p];
                            break;
                        case "EstimatedPopulation":
                            estimatedpp = this.state.data[i][p];
                            break;
                        case "TotalWages":
                            totalwages = this.state.data[i][p];
                            break;
                        case "Lat":
                            lat = this.state.data[i][p];
                            break;
                        case "Long":
                            long = this.state.data[i][p];
                            break;
                        default:
                            break;
                    }
                }
                //create a city card component and push it to cards
                cards.push(<CityCard city = {city}
                                    lat = {lat}
                                    long = {long}
                                    totalWages = {totalwages}
                                    estimatedPopulation = {estimatedpp}
                                    state = {state} key={i.toString()}/>)
            }
            return <div>
                    <div className = "banner">
                        <p>Zip Code Search</p>
                    </div>
                    <div className = "search-bar">
                        <input type="text" onChange={this.getValue}></input>
                        <button onClick={this.getCities}>Search</button>
                    </div>
                    <div className = "cards">
                        {cards}
                    </div>
                    
            </div>
        }
    }
}
export default SearchBar;