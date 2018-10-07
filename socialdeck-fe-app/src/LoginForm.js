import React, { Component } from 'react'
import './App.css'
import { Link } from '@reach/router'
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

  logCache (cache, { data }) {
    console.log(cache, data)
  }

  render () {
    return (
      <React.Fragment>
        <Mutation mutation={LOGIN_USER} update={this.logCache}>
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
                  .then(data => console.log(data.data.login.token))
              }}>Sign In</a>
              <p>Don't have an account? <Link to='register'>Register</Link></p>

            </div>
          )
          }
        </Mutation>
      </React.Fragment>
    )
  }
}

export default LoginForm
