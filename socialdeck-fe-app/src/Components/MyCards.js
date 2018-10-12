import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Redirect, navigate } from '@reach/router'
import { GET_MY_CARDS, CREATE_CARD } from '../queries'
import CardInfo from './CardInfo'

class MyCards extends Component {
  constructor () {
    super()
    this.state = {
      newCard: false,
      owned: true
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
          ? <div className='card'>
            <a className='formLink' onClick={() => {
              console.log('add my card to GraphQL for storage')
              this.startNewCard()
            }}>Add New Card</a></div>

          : <Mutation mutation={CREATE_CARD} update={this.logCache}>
            {(createCard) => (
              <div className='card'>
                <div className='loginRow'>
                  <label htmlFor='cardName'>Card Name (Private)</label>
                  <input
                    id='cardName'
                    type='text'
                    onChange={(e) => this.updateState(e, 'cardName')} />
                </div>
                <div className='loginRow'>
                  <label htmlFor='displayName'>Display Name (Shared)</label>
                  <input
                    id='displayName'
                    type='text'
                    onChange={(e) => this.updateState(e, 'displayName')} />
                </div>
                <div className='loginRow'>
                  <label htmlFor='name'>Name</label>
                  <input
                    id='name'
                    type='text'
                    onChange={(e) => this.updateState(e, 'name')} />
                </div>
                <div className='loginRow'>
                  <label htmlFor='businessName'>Business</label>
                  <input
                    id='businessName'
                    type='text'
                    onChange={(e) => this.updateState(e, 'businessName')} />
                </div>
                <div className='loginRow'>
                  <label htmlFor='number'>Number</label>
                  <input
                    id='number'
                    type='text'
                    onChange={(e) => this.updateState(e, 'number')} />
                </div>
                <div className='loginRow'>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    type='text'
                    onChange={(e) => this.updateState(e, 'email')} />
                </div>
                <div className='loginRow'>
                  <label htmlFor='address1'>Address Line 1 </label>
                  <input
                    id='address1'
                    type='text'
                    onChange={(e) => this.updateState(e, 'address1')} />
                </div>
                <div className='loginRow'>
                  <label htmlFor='address2'>Address Line 2 </label>
                  <input
                    id='address2'
                    type='text'
                    onChange={(e) => this.updateState(e, 'address2')} />
                </div>
                <div className='loginRow'>
                  <label htmlFor='city'>City</label>
                  <input
                    id='city'
                    type='text'
                    onChange={(e) => this.updateState(e, 'city')} />
                </div>
                <div className='loginRow'>
                  <label htmlFor='state'>State</label>
                  <input
                    id='state'
                    type='text'
                    onChange={(e) => this.updateState(e, 'state')} />
                </div>
                <div className='loginRow'>
                  <label htmlFor='postalCode'>Zip Code</label>
                  <input
                    id='postalCode'
                    type='postalCode'
                    onChange={(e) => this.updateState(e, 'postalCode')} />

                </div>
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
                    postalCode: this.state.postalCode
                  } })
                    .then(data => {
                      this.addNewCard()
                      navigate('/my-cards')
                    })
                }}>Add</a>
                <a className='formLink' onClick={() => this.addNewCard()}>Cancel</a>
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
