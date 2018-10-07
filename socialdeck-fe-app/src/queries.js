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
query contacts($token: String!)
{
  contacts(token: $token) {
    id
    user {
      id
      username
      email
      number
    }
    author {
      id
      username
      email
      number
    }
    name
    displayName
    personName
    businessName
    address {
      address1
      address2
      city
      state
      postalCode
    }
    number
    email
    birthDate
    twitter
    linkedIn
    facebook
    instagram
    verified
  }
}
`
export const GET_CARD = gql`
{
  card(token: "tFCUHc1TXkdZ4hK2FxiYBh75", id:12) {
    id
    user {
      id
      username
      email
      number
    }
    author {
      id
      username
      email
      number
    }
    name
    displayName
    personName
    businessName
    address {
      address1
      address2
      city
      state
      postalCode
    }
    number
    email
    birthDate
    twitter
    linkedIn
    facebook
    instagram
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
