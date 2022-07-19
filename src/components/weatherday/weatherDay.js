import React from "react";
import "./weatherDay.css";
import "animate.css";


class WeatherDayBox extends React.Component {
  render() {
    return (
      <div className="box animate__animated animate__zoomIn" onClick={this.props.hourly}>
        <p>{this.props.day.daily.dt}</p>
        <div className="image">
          <img
            src={`http://openweathermap.org/img/wn/${this.props.day.daily.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
        <p>{parseInt(this.props.day.daily.main.temp) + "°C"}</p>
        <p>{this.props.day.daily.weather[0].description}</p>
      </div>
    );
  }
}

export default WeatherDayBox;
