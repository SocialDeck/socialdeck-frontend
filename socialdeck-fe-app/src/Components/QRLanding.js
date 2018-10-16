import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { GET_CARD, LOGIN_USER, CREATE_USER, ADD_CONNECTION } from '../queries'
import { navigate } from '@reach/router'

class QRLanding extends Component {
  constructor () {
    super()
    this.state = {
      token: null,
      register: false,
      username: '',
      password: '',
      confirmation: '',
      email: '',
      name: ''
    }
  }

  setToken (token) {
    this.setState({
      token: token
    })
  }

  setRegister () {
    this.setState({
      register: true
    })
  }

  setLogin () {
    this.setState({
      register: false
    })
  }

  updateName (value) {
    this.setState({ name: value })
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

  render () {
    const token = window.localStorage.getItem('token')
    const username = window.localStorage.getItem('username')
    const register = this.state.register
    return <React.Fragment>
      <Query
        query={GET_CARD} variables={{ cardToken: this.props.cardToken, token: token }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>
          const info = data.card
          return <React.Fragment>
            <div className='loginForm'>
              {info.name && <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> {info.name}</div>}
              {info.businessName && <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> {info.businessName}</div>}
              {info.number && <div className='cardLine'><i className='fas fa-phone cardIcon' /> {info.number}</div>}
              {info.email && <div className='cardLine'><i className='fas fa-envelope cardIcon' /> {info.email}</div>}
              {info.address &&
                <div className='address'>
                  <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
                  <div className='addressBlock'>
                    <div className='addressLine line1'> {info.address.address1}</div>
                    <div className='addressLine line2'> {info.address.address2}</div>
                    <div className='addressLine line3'> {info.address.city}, {info.address.state} {info.address.postalCode}</div>
                  </div>
                </div>
              }
              {info.birthDate && <div className='cardLine'><i className='fas fa-birthday-cake cardIcon' /> {info.birthDate}</div>}
              {info.twitter && <div className='cardLine'><i className='fab fa-twitter cardIcon' /> {info.twitter}</div>}
              {info.linkedIn && <div className='cardLine'><i className='fab fa-linkedin cardIcon' /> {info.linkedIn}</div>}
              {info.facebook && <div className='cardLine'><i className='fab fa-facebook cardIcon' /> {info.facebook}</div>}
              {info.instagram && <div className='cardLine'><i className='fab fa-instagram cardIcon' /> {info.instagram}</div>}
               { (token && info.user.username !== username) && <Mutation mutation={ADD_CONNECTION}>
                {(createConnection) =>
                  <a className='buttonSignIn' onClick={() => {
                    createConnection({
                      variables: {
                        token: token,
                        cardToken: this.props.cardToken
                      }
                    })
                      .then(navigate('/contacts/' + this.props.cardToken))
                  }}>Connect</a>
                }
              </Mutation>}
            </div>
          </React.Fragment>
        }}
      </Query>
      {!token && <React.Fragment>
          {!register && <Mutation mutation={LOGIN_USER} update={this.logCache}>
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
                      this.setToken(data.token)
                    })
                }}>Sign In</a>
                <p>Don't have an account? <a className='formLink' onClick={() => this.setRegister()}>Register</a></p>

              </div>
            )
            }
          </Mutation>}
          {register &&
          <Mutation mutation={CREATE_USER}>
            {(createUser, { loading, error }) => (
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
                {error && <p className='errorMessage' >Please complete all fields before submission</p>}
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
                      this.setToken(data.token)
                    })
                }} >Register</a>
                <p>Already have an account? <a className='formLink' onClick={() => this.setLogin()}>Login</a></p>

              </div>
            )
            }
          </Mutation>
          }
        </React.Fragment>
      }
    </React.Fragment>
  }
}

export default QRLanding
