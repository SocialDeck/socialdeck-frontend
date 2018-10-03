import React from 'react'
import './App.css'

import ApolloClient from 'apollo-boost'

import { ApolloProvider, Query } from 'react-apollo'
import { GET_SCHEMA } from './queries'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const Schema = () => (
  <Query
    query={GET_SCHEMA}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>

      return data.__schema.types.map((type, idx) => (
        <li key={idx} >{type.name}</li>
      ))
    }}
  </Query>
)

const client = new ApolloClient({
  uri: 'https://socialdeck.herokuapp.com/graphql'
})

const App = () => (
  <ApolloProvider client={client}>
    <div className='app'>
      <LoginForm />
      <RegisterForm />
      <ul><Schema /></ul>
    </div>
  </ApolloProvider>
)

export default App
