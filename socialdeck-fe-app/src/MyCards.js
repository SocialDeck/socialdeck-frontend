import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link, Redirect, navigate } from '@reach/router'
import { GET_MY_CARDS, CREATE_CARD } from './queries'
import CardInfo from './CardInfo'

class MyCards extends Component {
  constructor () {
    super()
    this.state = {
      newCard: false,
      owned: true,
      cardName: '',
      displayName: '',
      name: '',
      number: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      twitter: '',
      facebook: '',
      linkedIn: '',
      instagram: ''
    }
  }

  updateState (e, state) {
    this.setState({
      [state]: e.target.value
    })
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
        <Link className='formLink' to='/contacts'>Contacts List</Link>
        <Link className='formLink' to='/editAccount'>Edit My Account</Link>
        {token ? <Query
          query={GET_MY_CARDS} variables={{ token: token }}
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
          ? <a className='formLink' onClick={() => {
            console.log('add my card to GraphQL for storage')
            this.startNewCard()
          }}>Add New Card</a>
          : <Mutation mutation={CREATE_CARD} update={this.logCache}>
            {(createCard) => (
              <div className='card'>
                <div className='cardLine'>Card Name (Private) <input type='text' onChange={(e) => this.updateState(e, 'cardName')} />  </div>
                <div className='cardLine'>Display Name (Shared) <input type='text' onChange={(e) => this.updateState(e, 'displayName')} />  </div>
                <div className='cardLine'><i className='fas fa-user-circle cardIcon' />Name <input type='text' onChange={(e) => this.updateState(e, 'name')} /></div>
                <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> Business <input type='text' onChange={(e) => this.updateState(e, 'businessName')} /></div>
                <div className='cardLine'><i className='fas fa-phone cardIcon' /> Number <input type='text' onChange={(e) => this.updateState(e, 'number')} /></div>
                <div className='cardLine'><i className='fas fa-envelope cardIcon' /> Email <input type='text' onChange={(e) => this.updateState(e, 'email')} /></div>

                <div className='address'>
                  <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
                  <div className='addressBlock'>
                    <div className='addressLine line1'> Address Line 1 <input type='text' onChange={(e) => this.updateState(e, 'address1')} /></div>
                    <div className='addressLine line2'> Address Line 2 <input type='text' onChange={(e) => this.updateState(e, 'address2')} /></div>
                    <div className='addressLine line3'>
                      City <input type='text' onChange={(e) => this.updateState(e, 'city')} />,
                      State <input type='text' onChange={(e) => this.updateState(e, 'state')} />
                      Zip <input type='text' onChange={(e) => this.updateState(e, 'postalCode')} />
                    </div>
                  </div>
                </div>
                <div className='cardLine'> Twitter <input type='text' onChange={(e) => this.updateState(e, 'twitter')} /></div>
                <div className='cardLine'> Facebook <input type='text' onChange={(e) => this.updateState(e, 'facebook')} /></div>
                <div className='cardLine'> LinkedIn <input type='text' onChange={(e) => this.updateState(e, 'linkedIn')} /></div>
                <div className='cardLine'> Instagram <input type='text' onChange={(e) => this.updateState(e, 'instagram')} /></div>
                <a className='formLink' onClick={e => {
                  createCard({ variables: {
                    token: token,
                    owned: true,
                    cardName: this.state.cardName,
                    displayName: this.state.displayName,
                    name: this.state.name,
                    number: this.state.number,
                    email: this.state.email,
                    address1: this.state.address1,
                    address2: this.state.address2,
                    city: this.state.city,
                    state: this.state.state,
                    postalCode: this.state.postalCode,
                    twitter: this.state.twitter,
                    facebook: this.state.facebook,
                    linkedIn: this.state.linkedIn,
                    instagram: this.state.instagram

                  } })
                    .then(data => {
                      this.addNewCard()
                      navigate('/my-cards')
                    })
                }}>Add</a>
              </div>

            )
            }
          </Mutation>

        }
      </React.Fragment>

    )
  }
}
export default MyCards
