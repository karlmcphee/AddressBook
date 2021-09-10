import React from 'react'
import axios from 'axios'
import Header from './Header'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default class PersonList extends React.Component {
    state = {
      persons: [],
      test: "hi"
    }

    deletes = (id, e) => {
      e.preventDefault();
      axios.delete(`http://localhost:9000/delete/${id}`)
      this.setState({persons: this.state.persons.filter(function(person) { 
        return person.name !== id
       })});
    }

    clears = (e) => {
      e.preventDefault();
      axios.delete(`http://localhost:9000/clear`)
      this.setState({persons: []})
    }

    update = (id, e) => {
      e.preventDefault();
      this.context.router.push({ //browserHistory.push should also work here
        pathname: '/UpdateEntry',
        state: {"name": id}
      }); 
    }

    setTable = () => {
      if(this.state.persons.length === 0) {
        return(
          <div><Button href="/AddEntry" variant="primary" >
            Add Entry</Button></div>
        )
      } else {
        return <div><Button onClick={(e)=>this.clears(e)}>Clear AddressBook</Button></div>;
      }
    }
  
    componentDidMount() {
      axios.get(`http://localhost:9000/persons`)
        .then(res => {
          const persons = res.data;
          this.setState({ persons });
        })
    }
  
    render() {
      return (
        <div><Header/><br />
        <div  style={{backgroundColor: 'white'}}><Table striped bordered>
          <thead>
            <tr>
            <th>Name</th>
            <th>Address</th>
            <th></th>
            <th></th>
            </tr>
            </thead>
                { this.state.persons.map(person => <tr><td>{person.name}</td><td>{person.address}</td>
                <td style={{marginBottom: 20}}><Link to={{pathname: '/UpdateEntry', state: { "name": person.name, "address": person.address}}}>Update</Link>
              </td>
                <td><Button onClick={(e) => this.deletes(person.name, e)} variant="link"><div style={{color: 'red'}}>Delete</div></Button></td>
                 </tr>)}
        </Table></div>
        {this.setTable()} 
        </div>
      )
    }
  }