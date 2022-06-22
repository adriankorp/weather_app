import './index.css'

const Form = (props) => (
  <form className="input-data" onSubmit={props.getWeatherData}>
    <input type="text" name="city" placeholder="Type city name..." />
    <button className="button">Get Weather</button>
  </form>
);

export default Form;
