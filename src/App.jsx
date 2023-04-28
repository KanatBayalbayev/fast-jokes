import React, { useState } from "react";
import { PacmanLoader } from "react-spinners";

import JokeList from "./components/JokeList";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  const fetchJokesHandler = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_ten"
      );
      if (!response) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setJokes(data);
      setLoading(false);
    } catch (error) {
      if (error.name === "TypeError") {
        setError("A Type Error occurred");
      } else if (error.name === "SyntaxError") {
        setError("A Syntax Error occurred");
      } else if (error.message === "Network response was not ok") {
        setError("Network Error: Could not fetch data");
      } else {
        setError("An unknown error occurred");
      }
      setLoading(false);
      setJokes([]);
    }
  };
  let content = <JokeList jokes={jokes} />;

  if (loading) {
    content = <PacmanLoader color="#720f04" />;
  }
  if (error) {
    content = <h1>{error}</h1>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchJokesHandler}>Fetch Jokes</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
