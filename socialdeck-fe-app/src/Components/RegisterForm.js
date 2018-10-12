import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_USER } from '../queries'
import { Link, navigate } from '@reach/router'

class RegisterForm extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
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

  updateName (value) {
    this.setState({ name: value })
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
                <label>Name</label>
                <input
                  className='signin_input'
                  type='text'
                  onChange={event => this.updateName(event.target.value)} />
              </div>

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
                  name: this.state.name,
                  email: this.state.email,
                  username: this.state.username,
                  password: this.state.password
                } })
                  .then(data => data.data.createUser)
                  .then(data => {
                    window.localStorage.setItem('token', data.token)
                    window.localStorage.setItem('username', this.state.username)
                    this.props.setUser(data.token, this.state.username)
                    navigate('/my-cards')
                  })
              }} >Register</a>
              <p>Already have an account? <Link className='formLink' to='/login'>Login</Link> </p>

            </div>
          )
          }
        </Mutation>

      </React.Fragment>

    )
  }
}

export default RegisterForm
