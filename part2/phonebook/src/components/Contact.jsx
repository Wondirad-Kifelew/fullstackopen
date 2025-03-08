function Contact(props) {
  //   console.log("Contact props", props);
  return (
    <>
      <li>
        {props.name} {props.number}{" "}
        <button onClick={props.handleDelete}> Delete</button>
      </li>
    </>
  );
}

export default Contact;
