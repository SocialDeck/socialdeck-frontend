import React, { Component } from 'react'
import './App.css'
import { Router, Match } from '@reach/router'
import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import Contacts from './Components/Contacts'
import Favorites from './Components/Favorites'
import Card from './Components/Card'
import MyCards from './Components/MyCards'
import ExampleCard from './Components/ExampleCard'
import NewContact from './Components/NewContact'
import Connections from './Components/Connections'
import ShareQR from './Components/ShareQR'
import QRLanding from './Components/QRLanding'
import UpdateUser from './Components/UpdateUser'
import Home from './Components/Home'

import SideBar from './Components/sidebar'

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
        <SideBar logOut={this.logOut} />
        <Router>
          <Home path='/' logOut={this.logOut}>
            <LoginForm path='login' setUser={this.setUser} />
            <RegisterForm path='register' setUser={this.setUser} />

            <Contacts path='contacts' username={this.state.username} token={this.state.token} />
            <Favorites path='favorites' username={this.state.username} token={this.state.token} />
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
            <Match path='/my-cards/:cardToken'>
              {props =>
                props.match ? (
                  <ShareQR cardToken={props.match.cardToken} />
                ) : (
                  <div>Uncool</div>
                )
              }
            </Match>
            <ShareQR path='/my-cards/:cardToken' />
            <Match path='/share/:cardToken'>
              {props =>
                props.match ? (
                  <QRLanding cardToken={props.match.cardToken} />
                ) : (
                  <div>Uncool</div>
                )
              }
            </Match>
            <QRLanding path='/share/:cardToken' />
            <ExampleCard path='/contacts/example-card' />
            <UpdateUser path='/editAccount' />
            <NewContact path='/contacts/new-contact' />
            <Connections path='/contacts/connections' />
          </Home>

        </Router>
      </div>
    )
  }
}

export default App
