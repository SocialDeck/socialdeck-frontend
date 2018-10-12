import React, { Component } from 'react'
import { Link, navigate } from '@reach/router'
import { Mutation } from 'react-apollo'
import { LOGIN_USER } from '../queries'

class LoginForm extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      remember: false,
      recovery: false
    }
  }

  updateUsername (value) {
    this.setState({ username: value })
  }

  updatePassword (value) {
    this.setState({ password: value })
  }

  updateRemember (value) {
    this.setState({ remember: !this.state.remember })
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
              <div className='loginRow--remember'>
                <input
                  id='remember'
                  type='checkbox'
                  onChange={event => this.updateRemember(event.target.value)} />
                <label htmlFor='remember'>Remember me</label>
              </div>
              <a className='buttonSignIn' onClick={async e => {
                await login({ variables: {
                  username: this.state.username,
                  password: this.state.password,
                  remember: this.state.remember
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
              <div className='loginRow'>
                <label htmlFor='recoveryEmail'>Email associated with account</label>
                <input
                  id='recoveryEmail'
                  type='text'
                  onChange={event => this.updateRecoverEmail(event.target.value)} />
              </div>

            </div>
          )
          }
        </Mutation>
      </React.Fragment>
    )
  }
}

export default LoginForm
