function Filter(props) {
  //   console.log("filter props", props);
  return (
    <>
      <div>
        Filter shown with:{" "}
        <input value={props.value} onChange={props.onchange} />
      </div>
    </>
  );
}

export default Filter;
