import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import Header from './Header'

const AddEntry = () =>  {

  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [update, setUpdate] = React.useState('');
  const [error, setError] = React.useState("");

  const handleChangeName  = e => {
      setName(e.target.value);
      console.log(name);
  }

  const handleChangeAddress  = e => {
      setAddress(e.target.value);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setUpdate("")
    if(name === "" || address === "") {
        setError("Please fill in both a name and an address")
    } else {
        setError("")
    const person = {
      "name": name,
      "address": address
    };
    axios.post(`http://localhost:9000/person/save`, person)
    .then((res) => {
      console.log(res.data);
      setUpdate('Entry inserted!')
    }).catch(e => {
        setError('Please insert a unique name');
    })}}
    return (
        <div>
    <Header /><br /><br />
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicAddress">
    <Form.Label>Enter a name</Form.Label>
    <Form.Control type="text" placeholder="Name" onChange={handleChangeName} value={name} />
    <br />
    <Form.Label>Enter an address</Form.Label>
    <Form.Control type="text" placeholder="Address" onChange={handleChangeAddress} value={address} />
    <br />
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form.Group>
        </Form>
        <Alert variant='danger' show={error === "" ? false : true}>{error}</Alert>
        <Alert variant='success' show={update === "" ? false : true}>{update}</Alert>
        </div>
    )
}

export default AddEntry