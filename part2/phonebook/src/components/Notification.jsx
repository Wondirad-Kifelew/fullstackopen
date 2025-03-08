function Notification({ message }) {
  if (message === null) {
    return null;
  }
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  };
  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  };
  return (
    <div
      style={
        message.includes("updated") || message.includes("added")
          ? successStyle
          : errorStyle
      }
      className="errorMessage"
    >
      {message}
    </div>
  );
}

export default Notification;
