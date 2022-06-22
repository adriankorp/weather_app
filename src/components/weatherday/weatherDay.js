import React from "react";
import "./weatherDay.css";

class WeatherDayBox extends React.Component {
  render() {
    return (
      <div className="box">
        <p>{this.props.day}</p>
        <div>Icon of weather</div>
        <p>Temp</p>
        <p>Wether desc</p>
      </div>
    );
  }
}

export default WeatherDayBox;
