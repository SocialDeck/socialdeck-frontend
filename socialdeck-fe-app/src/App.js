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
import Subscribers from './Components/Subscribers'
import ShareQR from './Components/ShareQR'
import QRLanding from './Components/QRLanding'
import UpdateUser from './Components/UpdateUser'
import PasswordReset from './Components/PasswordReset'
import Home from './Components/Home'
import HomeIndex from './Components/HomeIndex'
import SideBar from './Components/Sidebar'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      token: null,
      username: null,
      searching: false
    }
    const token = window.localStorage.getItem('token')
    const username = window.localStorage.getItem('username')
    if (token && username) {
      this.state.token = token
      this.state.username = username
    }
    this.setUser = this.setUser.bind(this)
    this.logOut = this.logOut.bind(this)
    this.searching = this.searching.bind(this)
  }

  notifyError (message) {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }

  notifySuccess (message) {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }

  searching () {
    this.setState({
      searching: !this.state.searching
    })
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
          <Home path='/' logOut={this.logOut} searchingStatus={this.state.searching} searching={this.searching}>
            <HomeIndex path='/' />
            <HomeIndex path='/index.html' />
            <LoginForm path='login' setUser={this.setUser} notifyError={this.notifyError} />
            <RegisterForm path='register' setUser={this.setUser} notifyError={this.notifyError} />

            <Contacts path='contacts' username={this.state.username} token={this.state.token} searchingStatus={this.state.searching} />
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
                  <div>Token not found</div>
                )
              }
            </Match>
            <ShareQR path='/my-cards/:cardToken' />
            <Match path='/share/:cardToken'>
              {props =>
                props.match ? (
                  <QRLanding cardToken={props.match.cardToken} />
                ) : (
                  <div>Token not found</div>
                )
              }
            </Match>
            <QRLanding path='/share/:cardToken' notifyError={this.notifyError} />
            <ExampleCard path='/contacts/example-card' />
            <UpdateUser path='/editAccount' />
            <NewContact path='/contacts/new-contact' />
            <Subscribers path='/contacts/subscribers' notifySuccess={this.notifySuccess} />
            <Match path='/passwordreset/:token'>
              {props =>
                props.match ? (
                  <PasswordReset token={props.match.token} />
                ) : (
                  <div>Uncool</div>
                )
              }
            </Match>
            <PasswordReset path='/passwordreset/:token' />
          </Home>

        </Router>
        <ToastContainer />
      </div>
    )
  }
}

export default App
