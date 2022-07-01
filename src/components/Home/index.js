import "./index.css";
import WeatherDayBox from "../weatherday/weatherDay";
import Form from "../Form";
import React from "react";
import Hourly from "../Hourly";

class Home extends React.Component {
  state = {
    day1: undefined,
    day2: undefined,
    day3: undefined,
    day4: undefined,
    day5: undefined,
    hourly: undefined,
    error: false,
    city: "",
  };

  componentDidMount() {
    this.fetchData("Warszawa");

    //console.log(this.state)
  }
  fetchData(city) {
    let weatherData = {};
    let hourly = undefined;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=cbf4ff2774f0db11d63aa0b5cb85f1f6&units=metric`
    )
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          this.setState({ city: city });
          return response.json();
        } else {
          this.setState({ error: true });
        }
      })
      .then((data) => {
        let fivePartList = Math.ceil(data.list.length / 5);
        weatherData["daily"] = data.list.filter((el, index) => index % 8 === 0);
        hourly = [
          data.list.splice(-fivePartList),
          data.list.splice(-fivePartList),
          data.list.splice(-fivePartList),
          data.list.splice(-fivePartList),
          data.list,
        ];
        weatherData["hourly"] = hourly;
        weatherData.daily.forEach((element, ind, arr) => {
          arr[ind]["dt"] = new Date(element.dt * 1000).toLocaleString("en-US", {
            weekday: "long",
          });
        });
        this.setState({
          day1: { daily: weatherData.daily[0], hourly: weatherData.hourly[4] },
          day2: { daily: weatherData.daily[1], hourly: weatherData.hourly[3] },
          day3: { daily: weatherData.daily[2], hourly: weatherData.hourly[2] },
          day4: { daily: weatherData.daily[3], hourly: weatherData.hourly[1] },
          day5: { daily: weatherData.daily[4], hourly: weatherData.hourly[0] },
        });
        this.setState({ error: false });
      })
      .catch((err) => console.log(err));

  }
  getWeatherData = async (data) => {
    data.preventDefault();
    let city = data.target.elements.city.value;
    if (city) {
      this.fetchData(city);
    }
  };

  handleCLick(day) {
    this.setState({ hourly: day });
  }

  render() {
    if (this.state.day1) {
      return (
        <div className="conteiner">
          <h2>{this.state.city}</h2>
          <Form getWeatherData={this.getWeatherData} />
          {this.state.loading && <p>Loading</p>}
          {this.state.error && <p>Can't fetch data</p>}
          <div className="home-page">
            <WeatherDayBox
              hourly={() => this.handleCLick(this.state.day1.hourly)}
              day={this.state.day1}
            />
            <WeatherDayBox
              hourly={() => this.handleCLick(this.state.day2.hourly)}
              day={this.state.day2}
            />
            <WeatherDayBox
              hourly={() => this.handleCLick(this.state.day3.hourly)}
              day={this.state.day3}
            />
            <WeatherDayBox
              hourly={() => this.handleCLick(this.state.day4.hourly)}
              day={this.state.day4}
            />
            <WeatherDayBox
              hourly={() => this.handleCLick(this.state.day5.hourly)}
              day={this.state.day5}
            />
          </div>
          {this.state.hourly ? (
            <Hourly hourly={this.state.hourly}></Hourly>
          ) : (
            <></>
          )}
        </div>
      );
    }
  }
}
//{new Date(this.state.day1.dt).toLocaleString("en-US", {weekday: "long"})}
export default Home;
