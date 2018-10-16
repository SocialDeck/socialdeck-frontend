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
mutation createUser($email: String!, $name: String!, $username: String!, $password: String!) {
  createUser(email: $email, name: $name, user: {username: $username, password: $password}) {
    token
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
export const GET_SUBSCRIBERS = gql`
query subscribers($token: ID!)
{
  subscribers(token: $token) {
    id
    user {
      id
      name(token: $token)
    }
    card {
      id
      cardName
    }
    mutual
  }
}
`

export const GET_CONTACTS = gql`
query contacts($token: ID!, $search:String)
{
  contacts(token: $token, search: $search) {
    id
    user {
      id
      username
    }
    author {
      id
      username
    }
    cardToken(token: $token)
    displayName
    name
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
    verified
    mutual(token: $token)
    mobile
  }
}
`

export const GET_FAVORITES = gql`
query favorites($token: ID!)
{
  favorites(token: $token) {
    id
    user {
      id
      username
    }
    author {
      id
      username
    }
    cardToken(token: $token)
    displayName
    name
    address {
      address1
      address2
      city
      state
      postalCode
    }
    number
    email
    verified
    mobile
  }
}
`

export const GET_CARD = gql`
query card($cardToken: ID!, $token:ID)
{
  card(cardToken: $cardToken) {
    id
    user {
      id
      username
    }
    author {
      id
      username
    }
    cardName
    displayName
    name
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
    favorite(token: $token)
    mutual(token: $token)
  }
}
`

export const GET_MY_CARDS = gql`
query ownedCards($token: ID!)
{
  ownedCards(token: $token) {
    id
    user {
      id
      username
    }
    author {
      id
      username
    }
    cardToken(token: $token)
    cardName
    displayName
    name
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
mutation createCard($token:ID!, $owned:Boolean!, $cardName:String!, $displayName:String, $name:String!, $businessName: String,
  $number:String, $email:String, $address1:String, $address2:String, $city: String,
  $state:String, $postalCode:String, $twitter:String, $facebook:String, $linkedIn:String,
  $instagram:String) {
    createCard(token:$token, owned:$owned, cardName:$cardName, displayName:$displayName, name:$name, businessName: $businessName,
               number:$number, email:$email, address: {address1:$address1, address2:$address2, city: $city,
               state:$state, postalCode:$postalCode}, twitter:$twitter, facebook:$facebook, linkedIn:$linkedIn,
               instagram:$instagram) {
      id
      user {
        id
        username
      }
      author {
        id
        username
      }
      cardName
      displayName
      name
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

export const UPDATE_CARD = gql`
mutation updateCard($token:ID!, $id: ID!, $cardName: String, $displayName:String, $name:String, $businessName: String, $email: String,
             $number:String, $address1: String, $address2: String, $city: String, $state: String,
             $postalCode: String, $twitter:String, $facebook:String, $linkedIn:String,
             $instagram:String, $birthDate: DateTime) {
         updateCard(token:$token, id: $id, cardName: $cardName, displayName:$displayName, name:$name, businessName: $businessName, email: $email,
              number:$number, address: {address1: $address1, address2: $address2, city: $city, state: $state,
              postalCode: $postalCode}, twitter:$twitter, facebook:$facebook, linkedIn:$linkedIn,
              instagram:$instagram, birthDate:$birthDate){
    id
    user {
      id
      username
    }
    author {
      id
      username
    }
    cardName
    displayName
    name
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
export const REQUEST_CONNECTION = gql`
mutation requestConnection($token:ID!, $userId:ID!){
  requestConnection(token:$token, userId:$userId)
  {
    message
  }
}
`


export const DELETE_CARD = gql`
mutation destroyCard($token:ID!, $id:ID!){
  destroyCard(token:$token, id:$id)
  {
    message
  }
}
`
export const UNSUBSCRIBE = gql`
mutation unsubscribe($token:ID!, $cardId:ID!){
  unsubscribe(token:$token, cardId:$cardId)
  {
    message
  }
}
`

export const FAVORITE_CARD = gql`
mutation favorite($token:ID!, $cardId:ID!){
  favorite(token:$token, cardId:$cardId) {
    favorite
  }
}
`

export const UNFAVORITE_CARD = gql`
mutation unfavorite($token:ID!, $cardId:ID!){
  unfavorite(token:$token, cardId:$cardId) {
    favorite
  }
}
`

export const ADD_CONNECTION = gql`
mutation createConnection($token:ID!,  $cardToken:ID!){
  createConnection(token:$token,  cardToken:$cardToken) {
    id
    user {
      id
      username
    }
    contact {
      id
      username
    }
    card {
      id
      user {
        id
        username
      }
      author {
        id
        username
      }
      cardName
      displayName
      name
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
}
`

export const BRIDGE_CONNECTION = gql`
mutation bridgeConnection($token:ID!, $userId:ID!, $cardToken:ID!){
  bridgeConnection(token:$token, userId:$userId, cardToken:$cardToken) {
    id
    user {
      id
      username
    }
    contact {
      id
      username
    }
    card {
      id
      user {
        id
        username
      }
      author {
        id
        username
      }
      cardName
      displayName
      name
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
}
`

export const BLOCK_USER = gql`
mutation blockUser($token:ID!,  $userId:ID!){
  blockUser(token:$token,  userId:$userId) {
    card {
      id
    }
  }
}
`

export const DELETE_CONNECTION = gql`
mutation destroyConnection($token: ID!, $id: ID!){
  destroyConnection(token: $token, id: $id){
    message
  }
}
`
export const UPDATE_USER = gql`
mutation updateUser($token: ID!, $username: String, $name: String, $password:String, $email: String){
  updateUser(token: $token, username: $username, name: $name, password: $password, email: $email){
    id
    username
  }
}
`

export const RECOVER_ACCOUNT = gql`
mutation resetPassword ($email: String!){
  resetPassword(email: $email) {
    message
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

export const SHARE_QR = gql`
query shareCard($token: ID!, $id: ID!)
{ shareCard(token:$token, id:$id)
}
`
