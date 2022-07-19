import "./index.css";
import "animate.css";
const Hourly = (props) => (
  <div className="conteiner-hourly">
    {props.hourly.map((el, idnex) => {
      return (
        <div className="hourly animate__animated animate__rotateIn">
          <p>
            {el.dt}<br />
            {el.dt_txt.split(" ")[1].slice(0,5)} <br />
            {el.dt_txt.split(" ")[0]}
          </p>
          <div className="image">
            <img
              src={`http://openweathermap.org/img/wn/${el.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
          <p>{parseInt(el.main.temp) + "°C"}</p>
          <p>{el.weather[0].description}</p>
        </div>
      );
    })}
  </div>
);

export default Hourly;
