import React from "react";
import "./weatherDay.css";

class WeatherDayBox extends React.Component {
  render() {
    return (
      <div className="box" onClick={this.props.hourly}>
        <p>{this.props.day}</p>
        <div className="image">
          {" "}
          <img
            src={`http://openweathermap.org/img/wn/${this.props.icon}@2x.png`}
            alt="weather icon"
          />
        </div>
        <p>{parseInt(this.props.temp) + "°C"}</p>
        <p>{this.props.desc}</p>
      </div>
    );
  }
}

export default WeatherDayBox;
