import "./index.css";

const Hourly = (props) => (
  <div className="conteiner-hourly">
    {props.hourly.map((el, idnex) => {
      return (
        <div className="hourly">
          <p>
            {el.dt_txt.split(" ")[1]} <br />
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
