import { useState, useEffect } from "react";
// import axios from "axios";
import Filter from "./components/Filter";
import Contact from "./components/Contact";
import Notification from "./components/Notification";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    //getting contacts from server
    contactService.getAll().then((respData) => {
      setPersons(respData);
    });
  }, []);
  const handleFilterChange = (event) => {
    setNameFilter(event.target.value);
  };
  const handleOnNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleOnNumChange = (event) => {
    setNewNum(event.target.value);
  };
  let namesOnly = persons.map((person) => person.name.toLowerCase());

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!namesOnly.includes(newName.toLowerCase())) {
      const newObj = {
        name: newName,
        number: newNum,
        id: String(persons.length + 1),
      };
      // create contact in server
      contactService.create(newObj).then((respData) => {
        setPersons(persons.concat(respData));
        setNewName("");
        setNewNum("");
        setErrorMessage(`${newName} is added to the phonebook list`);
        setTimeout(() => setErrorMessage(null), 5000);
      });
    } else if (namesOnly.includes(newName.toLowerCase())) {
      if (
        window.confirm(
          `${newName} already in the phonebook, replace old number with a new one?`
        )
      ) {
        const nameInd = namesOnly.indexOf(newName.toLowerCase());
        const Id = persons[nameInd]["id"];

        const newObj = {
          id: String(Id),
          name: newName,
          number: newNum,
        };
        //update contacts in the server
        contactService.update(Id, newObj).then(() => {
          setPersons(persons.map((p) => (p.id === Id ? newObj : p)));
          setNewName("");
          setNewNum("");
          setErrorMessage(`${newName}'s contact is updated`);
          setTimeout(() => setErrorMessage(null), 5000);
        });
        console.log(`${newName}'s number updated`);
      }
    }
  };

  const filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );
  const handleDelete = (id) => {
    const contactToDel = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${contactToDel.name}?`)) {
      //deletes contact from server and the app
      contactService
        .deleteContact(id)
        .then(() => {
          setPersons((prevPers) => prevPers.filter((p) => p.id !== id));
        })
        .catch((error) => {
          setErrorMessage(
            `${contactToDel.name}'s contact already deleted. Couldn't find it in the server`
          );
          setTimeout(() => setErrorMessage(null), 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={nameFilter} onchange={handleFilterChange} />
      <h2>Add</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={newName} onChange={handleOnNameChange} required />
          <br />
          Phone Number:{" "}
          <input value={newNum} onChange={handleOnNumChange} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredList.map((person) => (
          <Contact
            key={person.id}
            name={person.name}
            number={person.number}
            handleDelete={() => handleDelete(person.id)}
          ></Contact>
        ))}
      </ul>
    </div>
  );
};

export default App;
