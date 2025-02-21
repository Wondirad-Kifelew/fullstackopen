import { useState } from "react";
const Button = ({ click, text }) => {
  return <button onClick={click}>{text}</button>;
};
const Statistics = ({ good, neutral, bad }) => {
  return good == 0 && neutral == 0 && bad == 0 ? (
    <p>No feedback given</p>
  ) : (
    <table>
      <tr>
        <td>Total: </td>
        <td>{good + neutral + bad}</td>
      </tr>
      <tr>
        <td>Average: </td>
        <td>{(good - bad) / (good + neutral + bad)}</td>
      </tr>
      <tr>
        <td>Positive: </td>
        <td>{(good / (good + neutral + bad)) * 100}%</td>
      </tr>
    </table>
  );
};
const StatisticLine = ({ text }) => {
  return <p>{text}</p>;
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  // const [track, setTrack] = useState([]);

  const handleGood = () => {
    // setTrack(track.concat("G"));
    setGood(good + 1);
  };
  const handleNeutral = () => {
    // setTrack(track.concat("N"));

    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    // setTrack(track.concat("B"));

    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>

      <Button click={handleGood} text="Good" />
      <Button click={handleNeutral} text="Neutral" />
      <Button click={handleBad} text="Bad" />
      <h1>Statistics</h1>
      <table>
        <tr>
          <td>
            <StatisticLine text="Good: " />
          </td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="Neutral: " />
          </td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="Bad: " />
          </td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="Good: " />
          </td>
          <td>{good}</td>
        </tr>
      </table>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
