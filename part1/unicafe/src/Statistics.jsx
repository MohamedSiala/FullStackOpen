import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  if (good + bad + neutral === 0) return <div>No feedback given</div>;
  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text="good" value={good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value={neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value={bad} />
        </tr>
        <tr>
          <StatisticLine text="all" value={good + neutral + bad} />
        </tr>
        <tr>
          <StatisticLine
            text="average"
            value={(bad * -1 + good) / (good + neutral + bad)}
          />
        </tr>
        <tr>
          <StatisticLine
            text="positive"
            value={(good / (good + neutral + bad)) * 100}
          />
        </tr>
      </tbody>
    </table>
  );
};

export default Statistics;
