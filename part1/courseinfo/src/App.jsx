const Header = (props) => {
  // console.log("header props: " + props);
  return (
    <>
      <h1>{props.p.name}</h1>
    </>
  );
};

const Part = (props) => {
  console.log("Part props:" + props);
  return (
    <p>
      {props.name} {props.number}
    </p>
  );
};
const Content = (props) => {
  return (
    <>
      <Part name={props.p.parts[0].name} number={props.p.parts[0].exercises} />
      <Part name={props.p.parts[1].name} number={props.p.parts[1].exercises} />
      <Part name={props.p.parts[2].name} number={props.p.parts[2].exercises} />
    </>
  );
};
const Total = (props) => {
  return (
    <>
      <p>
        Total exercises{" "}
        {props.p.parts[0].exercises +
          props.p.parts[1].exercises +
          props.p.parts[2].exercises}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <>
      <Header p={course} />
      <Content p={course} />
      <Total p={course} />
    </>
  );
};

export default App;
