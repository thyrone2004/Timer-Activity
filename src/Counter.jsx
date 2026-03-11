import { useState } from "react";

export const Counter = () => {
  const [countState, setCountState] = useState(0); // 0
  const [name, setName] = useState(""); // strings
  const [classmates, setClassmates] = useState(["Alice", "Bob"]); 


  const incrementHandler = () => {
    setCountState(countState + 1);
  }

  const decrementHandler = () => {
    setCountState(countState - 1);
  }

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  }

  return (
    <>
      <div
        className="counter-container"
        style={{
          backgroundColor: "lightblue",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1>Counter {countState}</h1>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>

      <div
        style={{
          padding: "1rem",
          display: "block",
          alignItems: "center",
          marginBottom: "1rem",
          backgroundColor: name.length === 0 ?
            "red"
            : name.length > 10 ?
              "orange"
              : "lightblue",
        }}
      >
        {name.length === 0 ?
          <h3>Enter your name</h3>
          : <h3>Hello, {name}!</h3>}

        <input
          type="text"
          value={name}
          onChange={nameChangeHandler} />
      </div>
    </>
  );
}