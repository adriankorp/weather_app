import "./App.css";
import "animate.css";
import Home from "./components/Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas, faSun } from "@fortawesome/free-solid-svg-icons";
function App() {
  return (
    <>
      <header>
        <div className="sun">
          <FontAwesomeIcon icon={faSun} />
        </div>
        <div className="shadow">
          <FontAwesomeIcon icon={faGlobeAmericas} />
        </div>
        <h1 className="animate__animated animate__bounce">Wether App</h1>
      </header>
      <Home />
    </>
  );
}

export default App;
