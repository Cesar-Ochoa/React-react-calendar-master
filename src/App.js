import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './Components/Calendar';

import WeatherInfo from './Components/Weather/WeatherInfo';
import WeatherForm from './Components/Weather/WeatherForm';

import Todo from './Components/Item/todo';

const style = {
  position: "relative",
  margin: "50px auto"
}

class App extends Component {

  state = {
    temperature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: ''
  }  

  getWeather = async (e) => {
    e.preventDefault();
    const { city, country } = e.target.elements;
    const cityValue = city.value;
    const countryValue = country.value;

    if (cityValue && countryValue) {
      const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=98b09cb663ee9c9ccf8f113d78155ea6&units=metric`;
      const response = await fetch(API_URL);
      const data = await response.json();

      this.setState({
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        city: data.name,
        country: data.sys.country,
        err: null
        //day
      });
    }
     //() => console.log(this.state));
     else {
       this.setState({error: 'Please enter a city and a country'})
     }
  }

  onDayClick = (e, day) => {
    //alert(day);
    
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the day, open the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
    //return day;
  }

  // app-component

  constructor(props){
    super(props);
    this.state = {
      data : [
        {
          itemName  : "Event",
          description   : "Description"
        }
      ]
    }
  }
 
  _remove(position){
    let { data } = this.state;
 
    let newData = [
      ...data.slice(0, position),
      ...data.slice(position + 1),
    ]
 
    this.setState({ data : newData });
 
  }

  _add(){
    let { data } = this.state;
    let newData = [
      ...data,
      {
        image : "papas.png",
        name  : "Papas a la francesa",
        portion : "140g",
        price   : Math.floor(Math.random() * 20) 
      }
    ]
    this.setState({ data : newData });
  }

  render() {
    return (
      <div className="App">
        
        <Calendar id="myBtn" style={style} width="302px" 
          onDayClick={(e, day)=> this.onDayClick(e, day)}/>  
          <div className="container p-4">
            <div className="row">
              <div className="col-md-3 mx-auto" >
                <WeatherForm getWeather={this.getWeather}/>
                <WeatherInfo {...this.state}/>
              </div>
            </div>
          </div> 
        <img src={logo} className="App-logo" alt="logo" />

          <div id="myModal" className="modal">
            
            <div className="modal-content">
              <span className="close" >&times;</span>

                <Todo />
                
            </div>

          </div>
      </div>
    );
  }
}


export default App;