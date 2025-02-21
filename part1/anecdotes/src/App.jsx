import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));
  console.log("the selected index and the vote", selected, vote[selected]);

  const randomAnecdotesHandler = () => {
    setSelected(() => Math.floor(Math.random() * anecdotes.length));
  };

  const voteEventHandler = () => {
    setVote(() => {
      let voteCopy = [...vote];
      voteCopy[selected] += 1;
      return voteCopy;
    });
  };
  let maxVoteIndex = vote.indexOf(Math.max(...vote));

  // console.log("votes and max vote", vote, maxVoteIndex);
  return (
    <div>
      <h1>Anecdote of the day</h1>

      <p>{anecdotes[selected]}</p>
      <p>Vote: {vote[selected]}</p>
      <br />
      <button onClick={randomAnecdotesHandler}>Next anecdote</button>
      <button onClick={voteEventHandler}>Vote</button>
      <br />
      <h1>Anecdotes with most votes</h1>
      <p>{anecdotes[maxVoteIndex]}</p>
      <p>Vote: {vote[maxVoteIndex]}</p>
    </div>
  );
};
export default App;
