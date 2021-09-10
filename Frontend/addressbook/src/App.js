import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/Main'
import ViewBook from './components/ViewBook'
import AddEntry from './components/AddEntry'
import UpdateEntry from './components/UpdateEntry'
import Search from './components/Search'

class App extends React.Component {
  render() {
  return (
    <div className="ui container">
    <BrowserRouter>
      <div>
        <Route path="/" exact component={Main} />
        <Route path="/ViewBook" exact component={ViewBook} />
        <Route path="/AddEntry" exact component={AddEntry} />
        <Route path="/UpdateEntry" exact component={UpdateEntry} />
        <Route path="/Search" exact component={Search} />
      </div>
    </BrowserRouter></div>
  )}
}

export default App

