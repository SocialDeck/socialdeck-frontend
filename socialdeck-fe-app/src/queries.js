import gql from 'graphql-tag'

export const GET_SCHEMA = gql`
{
  __schema {
    types {
      name
    }
  }
}
`

export const CREATE_USER = gql`
mutation createUser($email: String!, $username: String!, $password: String!) {
  createUser(email: $email, user: {username: $username, password: $password}) {
    id
    username
  }
}
`

export const LOGIN_USER = gql`
mutation login($username: String!, $password: String!) {
  login(user: {username: $username, password: $password}) {
    token
  }
}
`

export const GET_CONTACTS = gql`
{
  contacts {
    name
    displayName
    number
    email
    address {
      address1
      address2
      city
      state
      postalCode
    }
    personName
    verified
  }
}
`

export const GET_USERS = gql`
{
  users{
    username
  }
}
`
