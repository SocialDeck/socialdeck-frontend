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
query card($token: String!, $id: ID!)
{
  card(token: $token, id: $id) {
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

export const GET_MY_CARDS = gql`
query ownedCards($token: String!)
{
  ownedCards(token: $token) {
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

export const CREATE_CARD = gql`
mutation createCard($token:String!, $owned:Boolean!, $cardName:String!, $displayName:String, $name:String!,
  $number:String, $email:String, $address1:String!, $address2:String, $city: String!,
  $state:String!, $postalCode:String!, $twitter:String, $facebook:String, $linkedIn:String,
  $instagram:String) {
    createCard(token:$token, owned:$owned, cardName:$cardName, displayName:$displayName, name:$name,
               number:$number, email:$email, address: {address1:$address1, address2:$address2, city: $city,
               state:$state, postalCode:$postalCode}, twitter:$twitter, facebook:$facebook, linkedIn:$linkedIn,
               instagram:$intagram) {
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
