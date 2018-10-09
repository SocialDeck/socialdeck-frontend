import React, { Component } from 'react'
import './App.css'
import { Router, Match } from '@reach/router'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Contacts from './Contacts'
import Card from './Card'
import MyCards from './MyCards'
import ExampleCard from './ExampleCard'
import NewContact from './NewContact'
import Connections from './Connections'
import ShareQR from './ShareQR'
import Home from './Home'

class App extends Component {
  constructor () {
    super()
    this.state = {
      token: null,
      username: null
    }
    const token = window.localStorage.getItem('token')
    const username = window.localStorage.getItem('username')
    if (token && username) {
      this.state.token = token
      this.state.username = username
    }
    this.setUser = this.setUser.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  setUser (token, username) {
    this.setState({
      token: token,
      username: username
    })
  }

  logOut () {
    window.localStorage.clear()
    this.setState({
      token: null,
      username: null
    })
  }

  render () {
    return (
      <div className='app'>
        <Router>
          <Home path='/' logOut={this.logOut}>
            <LoginForm path='login' setUser={this.setUser} />
            <RegisterForm path='register' />

            <Contacts path='contacts' username={this.state.username} token={this.state.token} />
            <Match path='/contacts/:cardToken'>
              {props =>
                props.match ? (
                  <Card cardToken={props.match.cardToken} />
                ) : (
                  <div>Uncool</div>
                )
              }
            </Match>
            <Card path='/contacts/:cardToken' />
            <MyCards path='/my-cards' />
            <Match path='/my-cards/:cardId'>
              {props =>
                props.match ? (
                  <ShareQR cardId={props.match.cardId} />
                ) : (
                  <div>Uncool</div>
                )
              }
            </Match>
            <ShareQR path='/my-cards/:cardId' />
            <ExampleCard path='/contacts/example-card' />
            <NewContact path='/contacts/new-contact' />
            <Connections path='/contacts/connections' />
          </Home>

        </Router>
        {/* <Query
          query={GET_USERS}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>

            return data.users.map((user, idx) => (
              <Link to='example-card' key={idx} className='contactsItem' ><i className='fas fa-address-card' /> {user.username}</Link>
            ))
          }

          }
        </Query> */}
      </div>
    )
  }
}

export default App
