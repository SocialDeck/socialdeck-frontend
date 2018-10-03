import React, { Component } from 'react'
import './App.css'

import { Mutation } from 'react-apollo'
import { LOGIN_USER } from './queries'

class LoginForm extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  updateUsername (value) {
    this.setState({ username: value })
  }

  updatePassword (value) {
    this.setState({ password: value })
  }

  sendUserLoginData (e) {
    console.log(e, 'you will send some data via GraphQL Magic!')
  }

  render () {
    return (
      <React.Fragment>
        <Mutation mutation={LOGIN_USER}>
          {(login) => (
            <div className='loginForm'>
              <div className='loginRow'>
                <label htmlFor='username'>Username</label>
                <input
                  id='username'
                  type='text'
                  onChange={event => this.updateUsername(event.target.value)} />
              </div>
              <div className='loginRow'>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  type='password'
                  onChange={event => this.updatePassword(event.target.value)} />
              </div>
              <a className='buttonSignIn' onClick={e => {
                login({ variables: {
                  username: this.state.username,
                  password: this.state.password
                } })
                  .then(data => console.log(data))
              }}>Sign In</a>
              <p>Don't have an account? <a className='switch' onClick={() => this.props.setRegister()}>Register</a> </p>

            </div>
          )
          }
        </Mutation>
      </React.Fragment>
    )
  }
}

export default LoginForm