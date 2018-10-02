import React, { Component } from 'react'
import './App.css'

import LoginForm from './LoginForm'
import RegsiterForm from './RegisterForm'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <LoginForm />
        <RegsiterForm />
      </div>
    )
  }
}

export default App
