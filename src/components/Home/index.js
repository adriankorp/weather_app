import "./index.css";
import WeatherDayBox from "../weatherday/weatherDay";

function Home() {
//   let weatherData = undefined;
//   await fetch(
//     "http://api.openweathermap.org/data/2.5/weather?q=Toruń&appid=cbf4ff2774f0db11d63aa0b5cb85f1f6"
//   )
//     .then((response) => response.json())
//     .then((data) => (weatherData = data));

//   console.log(weatherData.weather[0]);
  return (
    <div class="home-page">
      <WeatherDayBox day="Friday"></WeatherDayBox>
      <WeatherDayBox day="Friday"></WeatherDayBox>
      <WeatherDayBox day="Friday"></WeatherDayBox>
      <WeatherDayBox day="Friday"></WeatherDayBox>
      <WeatherDayBox day="Friday"></WeatherDayBox>
    </div>
  );
}

export default Home;
