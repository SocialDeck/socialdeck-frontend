import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_CARD } from '../queries'
import { navigate } from '@reach/router'

class NewContact extends Component {
  constructor() {
    super()
    this.state = {
      newCard: false,
      owned: true
    }
  }

  updateState(e, state) {
    this.setState({
      [state]: e.target.value
    })
  }

  startNewCard() {
    this.setState({
      newCard: true
    })
  }

  addNewCard() {
    this.setState({
      newCard: false
    })
  }
  render() {
    const token = window.localStorage.getItem('token')
    return (
      <React.Fragment>
        <Mutation mutation={CREATE_CARD} update={this.logCache}>
          {(createCard) => (
            <div className='loginForm'>
              <div className='cardLine'><input type='text' placeholder='Card Type' onChange={(e) => this.updateState(e, 'cardName')} /></div>
              <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> <input type='text' placeholder='Name' onChange={(e) => this.updateState(e, 'name')} /></div>
              <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> <input type='text' placeholder='Business' onChange={(e) => this.updateState(e, 'businessName')}/></div>
              <div className='cardLine'><i className='fas fa-phone cardIcon' /> <input type='text' placeholder='999-999-9999' onChange={(e) => this.updateState(e, 'number')}/></div>
              <div className='cardLine'><i className='fas fa-envelope cardIcon' /> <input type='text' placeholder='example@example.com' onChange={(e) => this.updateState(e, 'email')} /></div>
              <div className='address'>
                <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /> </div>
                <div className='addressBlock'>
                  <div className='addressLine line1'> <input type='text' placeholder='Address Line 1' onChange={(e) => this.updateState(e, 'address1')}/></div>
                  <div className='addressLine line2'> <input type='text' placeholder='Address Line 2' onChange={(e) => this.updateState(e, 'address2')}/></div>
                  <div className='addressLine line3'> <input type='text' className='city' placeholder='City' onChange={(e) => this.updateState(e, 'city')} />, <input type='text' className='state' placeholder='State' onChange={(e) => this.updateState(e, 'state')} /> <input type='text' placeholder='ZipCode' onChange={(e) => this.updateState(e, 'postalCode')}/></div>
                </div>
              </div>
              <div className='cardLine'><i className='fas fa-birthday-cake cardIcon' /> <input type='date' placeholder='Birthday' onChange={(e) => this.updateState(e, 'birthDate')} /></div>
              <div className='cardLine'><i className='fab fa-facebook cardIcon' /> <input type='text' placeholder='Name' onChange={(e) => this.updateState(e, 'facebook')} /></div>
              <div className='cardLine'><i className='fab fa-twitter cardIcon' /> <input type='text' placeholder='Business' onChange={(e) => this.updateState(e, 'twitter')} /></div>
              <div className='cardLine'><i className='fab fa-linkedin cardIcon' /> <input type='text' placeholder='999-999-9999' onChange={(e) => this.updateState(e, 'linkedIn')} /></div>
              <div className='cardLine'><i className='fab fa-instagram cardIcon' /> <input type='text' placeholder='example@example.com' onChange={(e) => this.updateState(e, 'instagram')} /></div>


              <a className='buttonSignIn' onClick={e => {
                createCard({
                  variables: {
                    token: token,
                    owned: false,
                    cardName: this.state.cardName,
                    name: this.state.name,
                    number: this.state.number,
                    email: this.state.email,
                    address1: this.state.address1,
                    address2: this.state.address2,
                    city: this.state.city,
                    state: this.state.state,
                    postalCode: this.state.postalCode,
                    birthDate: this.state.birthDate,
                    facebook: this.state.facebook,
                    twitter: this.state.twitter,
                    linkedIn: this.state.linkedIn,
                    instagram: this.state.instagram                    
                  }
                })
                  .then(data => {
                    this.addNewCard()
                    navigate('/contacts')
                  })
              }}>Add</a>
            </div>

          )
          }
        </Mutation>
      </React.Fragment>

    )
  }
}
export default NewContact
