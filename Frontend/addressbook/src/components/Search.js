import React from 'react'
import { Form, Button, Alert, Table } from 'react-bootstrap'
import axios from 'axios'
import Header from './Header'

const Search = () => {
    const [name, setName] = React.useState("");
    const [update, setUpdate] = React.useState(false);
    const [error, setError] = React.useState('');
    const [persons, setPersons] = React.useState([]);
    const handleChangeName  = e => {
        setName(e.target.value);
        console.log(name);
    }

    const searchTable = () => {
        if(persons.length === 0 && update === true) {
            return <Alert variant='warning'>No matching entries found</Alert>;
        } else if(update === false) {
            return <Alert variant='danger' show={error}>Please enter a name to search for</Alert>
        } else {
            return (<div style={{backgroundColor: 'white'}}><br /><br /><Table striped bordered>
        <thead><tr><th>Name</th><th>Address</th></tr></thead>
        { persons.map(person1 => <tr><td>{person1.name}</td><td>{person1.address}</td></tr>)}
            </Table></div>)
    }}
  
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(name === "") {
            setError(true)
        } else {
            setError(false)
            setUpdate(true)
            axios.get(`http://localhost:9000/person/${name}`)
            .then((res) => {
        setPersons(res.data);
      })}}
    return (
            <div>
            <Header />
            <br />
            <Form onSubmit={handleSubmit}><br />
            <h3><Form.Label>Search for an entry</Form.Label></h3>
            <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Control type="text" placeholder="Name" onChange={handleChangeName} value={name} />
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
                </Form>
                {searchTable()}

                </div>
            )
}

export default Search
