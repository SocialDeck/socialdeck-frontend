import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link, Redirect } from '@reach/router'
import { GET_MY_CARDS } from './queries'
import CardInfo from './CardInfo'

class MyCards extends Component {
  constructor () {
    super()
    this.state = {
      newCard: false
    }
  }

  startNewCard () {
    this.setState({
      newCard: true
    })
  }

  addNewCard () {
    this.setState({
      newCard: false
    })
  }

  render () {
    const token = window.localStorage.getItem('token')
    return (
      <React.Fragment>
        <Link to='/contacts'>Contacts List</Link>
        {token ? <Query
          query={GET_MY_CARDS} variables={{ token: window.localStorage.getItem('token') }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>

            return data.ownedCards.map((card, idx) => (
              <div key={idx} className='card'>
                <CardInfo info={card} />
              </div>
            ))
          }
          }
        </Query>
          : <Redirect to='/login' noThrow />
        }
        {!this.state.newCard
          ? <button onClick={() => {
            console.log('add my card to GraphQL for storage')
            this.startNewCard()
          }}>Add New Card</button>
          : <div className='card'>
            <div className='cardLine'><i className='fas fa-user-circle cardIcon' /><input type='text' defaultValue='name' /></div>
            <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> <input type='text' defaultValue='business name' /></div>
            <div className='cardLine'><i className='fas fa-phone cardIcon' /> <input type='text' defaultValue='phone number' /></div>
            <div className='cardLine'><i className='fas fa-envelope cardIcon' /> <input type='text' defaultValue='email' /></div>

            <div className='address'>
              <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
              <div className='addressBlock'>
                <div className='addressLine line1'> <input type='text' defaultValue='address line 1' /></div>
                <div className='addressLine line2'> <input type='text' defaultValue='address line 2' /></div>
                <div className='addressLine line3'>
                  <input type='text' defaultValue='city' />,
                  <input type='text' defaultValue='state' />
                  <input type='text' defaultValue='zip code' />
                </div>
              </div>
            </div>

            <button onClick={() => {
              console.log('add new card to GraphQL for distribution')
              this.addNewCard()
            }}>Add</button>
          </div>
        }
      </React.Fragment>

    )
  }
}
export default MyCards
