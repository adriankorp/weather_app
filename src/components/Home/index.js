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
  };

  async componentDidMount() {
    await this.fetchData("Warszawa")
      .then((data) => {
        this.setState({
          day1: { daily: data.daily[0], hourly: data.hourly[4] },
          day2: { daily: data.daily[1], hourly: data.hourly[3] },
          day3: { daily: data.daily[2], hourly: data.hourly[2] },
          day4: { daily: data.daily[3], hourly: data.hourly[1] },
          day5: { daily: data.daily[4], hourly: data.hourly[0] },
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //console.log(this.state)
  }
  async fetchData(city) {
    let weatherData = {};
    let hourly = undefined;
    await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=cbf4ff2774f0db11d63aa0b5cb85f1f6&units=metric`
    )
      .then((response) => response.json())
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
      });

    //console.log(weatherData);
    return weatherData;
  }
  getWeatherData = async (data) => {
    data.preventDefault();
    let city = data.target.elements.city.value;
    if (city) {
      await this.fetchData(city)
        .then((data) => {
          this.setState({
            day1: { daily: data.daily[0], hourly: data.hourly[4] },
            day2: { daily: data.daily[1], hourly: data.hourly[3] },
            day3: { daily: data.daily[2], hourly: data.hourly[2] },
            day4: { daily: data.daily[3], hourly: data.hourly[1] },
            day5: { daily: data.daily[4], hourly: data.hourly[0] },
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  handleCLick(day) {
    this.setState({ hourly: day });
  }

  render() {
    if (this.state.day1) {
      return (
        <div className="conteiner">
          <Form getWeatherData={this.getWeatherData}></Form>
          <div className="home-page">
            <WeatherDayBox
              hourly={() => this.handleCLick(this.state.day1.hourly)}
              day={this.state.day1.daily.dt}
              temp={this.state.day1.daily.main.temp}
              desc={this.state.day1.daily.weather[0].description}
              icon={this.state.day1.daily.weather[0].icon}
            ></WeatherDayBox>
            <WeatherDayBox
              hourly={() => this.handleCLick(this.state.day2.hourly)}
              day={this.state.day2.daily.dt}
              temp={this.state.day2.daily.main.temp}
              desc={this.state.day2.daily.weather[0].description}
              icon={this.state.day2.daily.weather[0].icon}
            ></WeatherDayBox>
            <WeatherDayBox
              hourly={() => this.handleCLick(this.state.day3.hourly)}
              day={this.state.day3.daily.dt}
              temp={this.state.day3.daily.main.temp}
              desc={this.state.day3.daily.weather[0].description}
              icon={this.state.day3.daily.weather[0].icon}
            ></WeatherDayBox>
            <WeatherDayBox
              hourly={() => this.handleCLick(this.state.day4.hourly)}
              day={this.state.day4.daily.dt}
              temp={this.state.day4.daily.main.temp}
              desc={this.state.day4.daily.weather[0].description}
              icon={this.state.day4.daily.weather[0].icon}
            ></WeatherDayBox>
            <WeatherDayBox
              hourly={() => this.handleCLick(this.state.day5.hourly)}
              day={this.state.day5.daily.dt}
              temp={this.state.day5.daily.main.temp}
              desc={this.state.day5.daily.weather[0].description}
              icon={this.state.day5.daily.weather[0].icon}
            ></WeatherDayBox>
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
