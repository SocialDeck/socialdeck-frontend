import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Link } from '@reach/router'
import { UPDATE_CARD, DELETE_CARD } from './queries'

class CardInfo extends Component {
  constructor () {
    super()
    this.state = {
      isEditing: false,
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

  editOn (info) {
    this.setState({
      isEditing: true,
      cardName: info.cardName,
      displayName: info.displayName,
      name: info.name,
      number: info.number,
      address1: info.address1,
      address2: info.address2,
      city: info.city,
      state: info.state,
      postalCode: info.postalCode,
      twitter: info.twitter,
      facebook: info.facebook,
      linkedIn: info.linkedIn,
      instagram: info.instagram
    })
  }

  editOff () {
    this.setState({
      isEditing: false
    })
  }
  render () {
    const { info } = this.props
    const token = window.localStorage.getItem('token')
    return <React.Fragment> { !this.state.isEditing
      ? <React.Fragment>
        {info.displayName && <div className='cardLine'>{info.cardName}</div>}
        {info.displayName && <div className='cardLine'>{info.displayName}</div>}
        {info.name && <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> {info.name}</div>}
        {info.businessName && <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> {info.businessName}</div>}
        {info.number && <div className='cardLine'><i className='fas fa-phone cardIcon' /> {info.number}</div>}
        {info.email && <div className='cardLine'><i className='fas fa-envelope cardIcon' /> {info.email}</div>}
        {info.address &&
        <div className='address'>
          <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
          <div className='addressBlock'>
            <div className='addressLine line1'> {info.address.address1}</div>
            <div className='addressLine line2'> {info.address.address2}</div>
            <div className='addressLine line3'> {info.address.city}, {info.address.state} {info.address.postalCode}</div>
          </div>
        </div>
        }
        <button onClick={() => {
          this.editOn(info)
        }}>Edit Card</button>
        <Mutation mutation={DELETE_CARD}>
          {(deleteCard) =>
            <button onClick={() => {
              deleteCard({ variables: {
                token: token,
                id: info.id
              } })
            }}>Delete Card</button>
          }
        </Mutation>
        <Link to={info.id} >Share</Link>

      </React.Fragment>
      : <Mutation mutation={UPDATE_CARD} update={this.logCache}>
        {(updateCard) => (
          <React.Fragment>
            <div className='cardLine'>Card Name (Private) <input type='text' onChange={(e) => this.updateState(e, 'cardName')} defaultValue={info.cardName} />  </div>
            <div className='cardLine'>Display Name (Shared) <input type='text' onChange={(e) => this.updateState(e, 'displayName')} defaultValue={info.displayName} />  </div>
            <div className='cardLine'><i className='fas fa-user-circle cardIcon' />Name <input type='text' onChange={(e) => this.updateState(e, 'name')} defaultValue={info.name} /></div>
            <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> Business <input type='text' onChange={(e) => this.updateState(e, 'businessName')} defaultValue={info.businessName} /></div>
            <div className='cardLine'><i className='fas fa-phone cardIcon' /> Number <input type='text' onChange={(e) => this.updateState(e, 'number')} defaultValue={info.number} /></div>
            <div className='cardLine'><i className='fas fa-envelope cardIcon' /> Email <input type='text' onChange={(e) => this.updateState(e, 'email')} defaultValue={info.email} /></div>

            <div className='address'>
              <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
              <div className='addressBlock'>
                <div className='addressLine line1'> Address Line 1 <input type='text' onChange={(e) => this.updateState(e, 'address1')} defaultValue={info.address1} /></div>
                <div className='addressLine line2'> Address Line 2 <input type='text' onChange={(e) => this.updateState(e, 'address2')} defaultValue={info.address2} /></div>
                <div className='addressLine line3'>
                City <input type='text' onChange={(e) => this.updateState(e, 'city')} defaultValue={info.city} />,
                State <input type='text' onChange={(e) => this.updateState(e, 'state')} defaultValue={info.state} />
                Zip <input type='text' onChange={(e) => this.updateState(e, 'postalCode')} defaultValue={info.postalCode} />
                </div>
              </div>
            </div>
            <div className='cardLine'> Twitter <input type='text' onChange={(e) => this.updateState(e, 'twitter')} defaultValue={info.twitter} /></div>
            <div className='cardLine'> Facebook <input type='text' onChange={(e) => this.updateState(e, 'facebook')} defaultValue={info.facebook} /></div>
            <div className='cardLine'> LinkedIn <input type='text' onChange={(e) => this.updateState(e, 'linkedIn')} defaultValue={info.linkedIn} /></div>
            <div className='cardLine'> Instagram <input type='text' onChange={(e) => this.updateState(e, 'instagram')} defaultValue={info.instagram} /></div>
            <button onClick={e => {
              updateCard({ variables: {
                token: token,
                id: info.id,
                cardName: this.state.cardName,
                displayName: this.state.displayName,
                name: this.state.name,
                number: this.state.number,
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
                  this.editOff()
                })
            }}>Update</button>
          </React.Fragment>

        )
        }
      </Mutation>
    }
    </React.Fragment>
  }
}
export default CardInfo
