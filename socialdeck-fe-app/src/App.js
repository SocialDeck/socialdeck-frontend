import React, { Component } from 'react'
import './App.css'
import { Router, Match } from '@reach/router'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Contacts from './Contacts'
import Card from './Card'
import MyCards from './MyCards'
import ExampleCard from './ExampleCard'
import NewContact from './NewContact'
import Connections from './Connections'
import Home from './Home'

class App extends Component {
  constructor () {
    super()
    this.state = {
      token: null,
      username: null
    }
    const token = window.localStorage.getItem('token')
    const username = window.localStorage.getItem('username')
    if (token && username) {
      this.state.token = token
      this.state.username = username
    }
    this.setUser = this.setUser.bind(this)
  }

  setUser (token, username) {
    this.setState({
      token: token,
      username: username
    })
  }

  render () {
    return (
      <div className='app'>
        <Router>
          <Home path='/'>
            <LoginForm path='login' setUser={this.setUser} />
            <RegisterForm path='register' />

            <Contacts path='contacts' username={this.state.username} token={this.state.token} />
            <Match path='/contacts/:cardId'>
              {props =>
                props.match ? (
                  <Card cardId={props.match.cardId} />
                ) : (
                  <div>Uncool</div>
                )
              }
            </Match>
            <Card path='/contacts/:cardId' />
            <MyCards path='/my-cards' />
            <ExampleCard path='/contacts/example-card' />
            <NewContact path='/contacts/new-contact' />
            <Connections path='/contacts/connections' />
          </Home>

        </Router>
      </div>
    )
  }
}

export default App
