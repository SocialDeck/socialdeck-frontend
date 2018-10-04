import React, { Component } from 'react'
import './App.css'
import { Router } from '@reach/router'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Contacts from './Contacts'
import Card from './Card'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <Router>
          <LoginForm path='/' />
          <RegisterForm path='register' />
          <Contacts path='contacts' />
          <Card path=':cardId' />
        </Router>
      </div>
    )
  }
}

export default App
