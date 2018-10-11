import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { GET_CARD, LOGIN_USER, CREATE_USER, ADD_CONNECTION } from './queries'

class QRLanding extends Component {
  constructor () {
    super()
    this.state = {
      token: null,
      register: false,
      username: '',
      password: '',
      confirmation: '',
      email: ''
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
    const register = this.state.register
    return <React.Fragment>
      <Query
        query={GET_CARD} variables={{ cardToken: this.props.cardToken }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>
          return <React.Fragment>
            <div className='card'>
              {data.card.name && <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> {data.card.name}</div>}
              {data.card.businessName && <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> {data.card.businessName}</div>}
              {data.card.number && <div className='cardLine'><i className='fas fa-phone cardIcon' /> {data.card.number}</div>}
              {data.card.email && <div className='cardLine'><i className='fas fa-envelope cardIcon' /> {data.card.email}</div>}
              {data.card.address &&
              <div className='address'>
                <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
                <div className='addressBlock'>
                  <div className='addressLine line1'> {data.card.address.address1}</div>
                  <div className='addressLine line2'> {data.card.address.address2}</div>
                  <div className='addressLine line3'> {data.card.address.city}, {data.card.address.state} {data.card.address.postalCode}</div>
                </div>
              </div>
              }
            </div>
          </React.Fragment>
        }}
      </Query>
      {token ? <React.Fragment>
        <div>Welcome to Social Deck!</div>
        <Mutation mutation={ADD_CONNECTION}>
          {(createConnection) =>
            <button onClick={() => {
              createConnection({ variables: {
                token: token,
                cardToken: this.props.cardToken
              } })
                .then(data => console.log(data))
            }}>Connect</button>
          }
        </Mutation>
      </React.Fragment>
        : <React.Fragment>
          {!register && <Mutation mutation={LOGIN_USER} update={this.logCache}>
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
                <p>Don't have an account? <a onClick={() => this.setRegister()}>Register</a></p>

              </div>
            )
            }
          </Mutation>}
          {register &&
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
                <p>Already have an account? <a onClick={() => this.setLogin()}>Login</a></p>

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
