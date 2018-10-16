import React, { Component } from 'react'
import { Link, navigate } from '@reach/router'
import { Mutation } from 'react-apollo'
import { LOGIN_USER, RECOVER_ACCOUNT } from '../queries'

class LoginForm extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      recovery: false
    }
  }

  updateUsername (value) {
    this.setState({ username: value })
  }

  updatePassword (value) {
    this.setState({ password: value })
  }

  updateRecoveryEmail (value) {
    this.setState({ recoveryEmail: value })
  }

  sendUserLoginData (e) {
    console.log(e, 'you will send some data via GraphQL Magic!')
  }

  logCache (cache, { data }) {
    console.log(cache, data)
  }

  setRecover () {
    this.setState({
      recovery: !this.state.recovery
    })
  }

  render () {
    return (
      <React.Fragment>
        <Mutation mutation={LOGIN_USER} update={this.logCache}>
          {(login, { loading, error }) => (
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
              <div className='loginRow'>
                {error && <p className='errorMessage' >Invalid Username/Password</p>}
                <a className='buttonSignIn' onClick={async e => {
                  await login({ variables: {
                    username: this.state.username,
                    password: this.state.password
                  } })
                    .then(data => data.data.login)
                    .then(data => {
                      window.localStorage.setItem('token', data.token)
                      window.localStorage.setItem('username', this.state.username)
                      this.props.setUser(data.token, this.state.username)
                      navigate('/contacts')
                    })
                }}>Sign In</a>
                <p>Don't have an account? <Link className='formLink' to='/register'>Register</Link></p>
                <p>Forgot your username or password? <a className='formLink' onClick={() => this.setRecover()}>Recover Account</a></p>
              </div>
              {this.state.recovery && <div className='loginRow'>
                <label htmlFor='recoveryEmail'>Please provide your email associated with account</label>
                <input
                  id='recoveryEmail'
                  type='text'
                  onChange={event => this.updateRecoveryEmail(event.target.value)} />
                <Mutation mutation={RECOVER_ACCOUNT}>
                  {(resetPassword) =>
                    <a className='buttonSignIn' onClick={() => {
                      resetPassword({ variables: {
                        email: this.state.recoveryEmail
                      } })
                        .then(data => console.log(data))
                    }}>Send Recovery Email</a>
                  }
                </Mutation>
              </div>}

            </div>
          )
          }
        </Mutation>
      </React.Fragment>
    )
  }
}

export default LoginForm
