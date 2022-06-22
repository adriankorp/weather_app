import "./index.css";
import WeatherDayBox from "../weatherday/weatherDay";
import Form from "../Form";
import React from "react";

class Home extends React.Component {
  state = {
    day1: undefined,
    day2: undefined,
    day3: undefined,
    day4: undefined,
    day5: undefined,
  };

  async componentDidMount() {
    await this.fetchData("Warszawa")
      .then((data) => {
        this.setState({
          day1: data[0],
          day2: data[1],
          day3: data[2],
          day4: data[3],
          day5: data[4],
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //console.log(this.state)
  }
  async fetchData(city) {
    let weatherData = undefined;
    await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=cbf4ff2774f0db11d63aa0b5cb85f1f6&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        weatherData = data.list.filter((el, index) => index % 8 === 0);
        weatherData.forEach((element, ind, arr) => {
          arr[ind]["dt"] = new Date(element.dt * 1000).toLocaleString("en-US", {
            weekday: "long",
          });
        });
      });

    console.log(weatherData);
    return weatherData;
  }
  getWeatherData = async (data) => {
    data.preventDefault();
    let city = data.target.elements.city.value;
    if (city) {
      await this.fetchData(city)
        .then((data) => {
          this.setState({
            day1: data[0],
            day2: data[1],
            day3: data[2],
            day4: data[3],
            day5: data[4],
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    //console.log(weatherData.list.filter((el,index)=> index % 8 === 0));
  };

  //   let weatherData = undefined;
  //   await fetch(
  //     "http://api.openweathermap.org/data/2.5/forecast?q=Toruń&appid=cbf4ff2774f0db11d63aa0b5cb85f1f6"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => (weatherData = data));

  //   console.log(weatherData.weather[0]);

  render() {
    if (this.state.day1) {
      return (
        <div className="conteiner">
          <Form  getWeatherData={this.getWeatherData}></Form>
          <div className="home-page">
            <WeatherDayBox
              day={this.state.day1.dt}
              temp={this.state.day1.main.temp}
              desc={this.state.day1.weather[0].description}
              icon={this.state.day1.weather[0].icon}
            ></WeatherDayBox>
            <WeatherDayBox
              day={this.state.day2.dt}
              temp={this.state.day2.main.temp}
              desc={this.state.day2.weather[0].description}
              icon={this.state.day2.weather[0].icon}
            ></WeatherDayBox>
            <WeatherDayBox
              day={this.state.day3.dt}
              temp={this.state.day3.main.temp}
              desc={this.state.day3.weather[0].description}
              icon={this.state.day3.weather[0].icon}
            ></WeatherDayBox>
            <WeatherDayBox
              day={this.state.day4.dt}
              temp={this.state.day4.main.temp}
              desc={this.state.day4.weather[0].description}
              icon={this.state.day4.weather[0].icon}
            ></WeatherDayBox>
            <WeatherDayBox
              day={this.state.day5.dt}
              temp={this.state.day5.main.temp}
              desc={this.state.day5.weather[0].description}
              icon={this.state.day5.weather[0].icon}
            ></WeatherDayBox>
          </div>
        </div>
      );
    }
  }
}
//{new Date(this.state.day1.dt).toLocaleString("en-US", {weekday: "long"})}
export default Home;
