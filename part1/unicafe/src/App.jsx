import { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodIncrement = () => setGood(good + 1);
  const handleNeutralIncrement = () => setNeutral(neutral + 1);
  const handleBadIncrement = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" onClick={handleGoodIncrement} />
      <Button text="neutral" onClick={handleNeutralIncrement} />
      <Button text="bad" onClick={handleBadIncrement} />
      <h1>Statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
