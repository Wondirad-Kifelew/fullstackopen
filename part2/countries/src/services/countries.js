import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  const req = axios.get(baseURL);
  return req.then((response) => response.data);
};

const create = (newObj) => {
  const request = axios.post(baseURL, newObj);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};
const update = (id, newObj) => {
  const request = axios.put(`${baseURL}/${id}`, newObj);
  return request.then((response) => response.data);
};
export default { getAll, create, deleteContact, update };
