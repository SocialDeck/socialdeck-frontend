import React, { Component } from 'react'
import './App.css'

import ApolloClient from 'apollo-boost'

import { ApolloProvider } from 'react-apollo'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Contacts from './Contacts'
import Card from './Card'
const client = new ApolloClient({
  uri: 'https://socialdeck.herokuapp.com/graphql'
})

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <div className='app'>
          <LoginForm />
          <RegisterForm />
          <Card />
          <div className='contactsLinks'><Contacts /></div>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
