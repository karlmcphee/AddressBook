import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import Header from './Header'

const UpdateEntry = ( props ) =>  {
  const [name, setName] = React.useState(props.location.state ? props.location.state.name : "");
  const [newName, setNewName] = React.useState(props.location.state ? props.location.state.name : "");
  const [address, setAddress] = React.useState(props.location.state ? props.location.state.address : "");
  const [update, setUpdate] = React.useState('');
  const [error, setError] = React.useState('');

  const handleChangeName  = e => {
      setNewName(e.target.value);
  }

  const handleChangeAddress  = e => {
      setAddress(e.target.value);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setUpdate("")
    if(newName === "" || address === "") {
      setError("Please enter a name and address")
  } else {
      setError("")
    const person = {
      "name": newName,
      "address": address
    };
    axios.post(`http://localhost:9000/update/${name}`, person)
    .then((res) => {
      setUpdate("Update successful")})
    .catch(e=>setUpdate("Duplicate names are not allowed"))}}
    return (
    <div>
    <Header />
    <br /><br />
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicAddress"><br />
    <Form.Label>Change {name}'s' name?</Form.Label>
    <Form.Control type="text" onChange={handleChangeName} value={newName} /><br />
    <Form.Label>Change {name}'s address?</Form.Label>
    <br />
    <Form.Control type="text" placeholder="Address" onChange={handleChangeAddress} value={address} />
    <br /><br />
    <Button variant="primary" type="submit">Submit</Button>
  </Form.Group>
        </Form>
        <Alert variant='danger' show={error === "" ? false : true}>{error}</Alert>
        <Alert variant='success' show={update === "" ? false : true}>{update}</Alert>
        <label></label>
        </div>
    )
}

export default UpdateEntry
