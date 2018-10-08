import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_USER } from './queries'
import { Link } from '@reach/router'

class RegisterForm extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      confirmation: '',
      email: ''
    }
  }

  updateUsername (value) {
    this.setState({ username: value })
  }

  updatePassword (value) {
    this.setState({ password: value })
  }

  updateConfirmation (value) {
    this.setState({ confirmation: value })
  }

  updateEmail (value) {
    this.setState({
      email: value
    })
  }

  sendRegisterData (e) {
    let email = this.state.email
    let username = this.state.username
    let password = this.state.password
    let confirmation = this.state.confirmation
    if (username !== '' && password !== '') {
      if (password === confirmation) {
        console.log('username:', username, 'password:', password, 'password confirmation:', confirmation, 'email: ', email)
        // data.register(username, password, email)
        //   .then(user => this.props.setCurrentUser(user))
      } else {
        window.alert('Password and Confirm Password must match.')
      }
    } else {
      window.alert('Username and Password required.')
    }
  }

  render () {
    return (
      <React.Fragment>
        <Mutation mutation={CREATE_USER}>
          {(createUser) => (
            <div className='loginForm'>
              <div className='loginRow'>
                <label>Email</label>
                <input
                  className='signin_input'
                  type='text'
                  onChange={event => this.updateEmail(event.target.value)} />
              </div>

              <div className='loginRow'>
                <label>Username</label>
                <input
                  className='signin_input'
                  type='text'
                  onChange={event => this.updateUsername(event.target.value)} />
              </div>

              <div className='loginRow'>
                <label>Password</label>
                <input
                  className='signin_input'
                  type='password'
                  onChange={event => this.updatePassword(event.target.value)} />
              </div>

              <div className='loginRow'>
                <label>Confirm Password</label>
                <input
                  className='signin_input'
                  type='password'
                  onChange={event => this.updateConfirmation(event.target.value)} />

              </div>

              <a className='buttonSignIn' onClick={e => {
                createUser({ variables: {
                  email: this.state.email,
                  username: this.state.username,
                  password: this.state.password
                } })
                  .then(data => console.log(data))
              }} >Register</a>
              <p>Already have an account? <Link to='/login'>Login</Link> </p>

            </div>
          )
          }
        </Mutation>

      </React.Fragment>

    )
  }
}

export default RegisterForm
