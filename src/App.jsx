import React, { useState } from "react";
import { PacmanLoader } from "react-spinners";

import JokeList from "./components/JokeList";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);
  let [loading, setLoading] = useState(false);
  const fetchJokesHandler = async () => {
    setLoading(true);
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_ten"
    );
    const data = await response.json();
    setJokes(data);
    setLoading(false);
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchJokesHandler}>Fetch Jokes</button>
      </section>
      <section>
        {loading ? <PacmanLoader color="#720f04" /> : <JokeList jokes={jokes} />}
      </section>
    </React.Fragment>
  );
}

export default App;
