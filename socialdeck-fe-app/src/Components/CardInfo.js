import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Link } from '@reach/router'
import { UPDATE_CARD, DELETE_CARD } from '../queries'

class CardInfo extends Component {
  constructor () {
    super()
    this.state = {
      isEditing: false
    }
  }

  updateState (e, state) {
    this.setState({
      [state]: e.target.value
    })
  }

  editOn (info) {
    this.setState({
      isEditing: true
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

        <div className='cardOptions'>
          <Mutation mutation={DELETE_CARD}>
            {(deleteCard) =>
              <a className='cardOption cardDelete' onClick={() => {
                deleteCard({
                  variables: {
                    token: token,
                    id: info.id
                  }
                })
              }}><i className='fas fa-trash-alt cardOptionIcon cardDelete' /> Delete</a>
            }
          </Mutation>
          <a className='cardOption' onClick={() => {
            this.editOn(info)
          }}><i className='fas fa-edit cardOptionIcon' /> Edit</a>
          <Link className='cardOption' to={info.cardToken} ><i className='fas fa-share-alt cardOptionIcon' /> Share</Link>

        </div>

      </React.Fragment>
      : <Mutation mutation={UPDATE_CARD} update={this.logCache}>
        {(updateCard) => (
          <React.Fragment>
            <div className='loginRow'>
              <label htmlFor='cardName'>Card Name (Private)</label>
              <input
                id='cardName'
                type='text'
                onChange={(e) => this.updateState(e, 'cardName')}
                defaultValue={info.cardName} />
            </div>
            <div className='loginRow'>
              <label htmlFor='displayName'>Display Name (Shared)</label>
              <input
                id='displayName'
                type='text'
                onChange={(e) => this.updateState(e, 'displayName')}
                defaultValue={info.displayName} />
            </div>
            <div className='loginRow'>
              <label htmlFor='name'>Name</label>
              <input
                id='name'
                type='text'
                onChange={(e) => this.updateState(e, 'name')}
                defaultValue={info.name} />
            </div>
            <div className='loginRow'>
              <label htmlFor='businessName'>Business</label>
              <input
                id='businessName'
                type='text'
                onChange={(e) => this.updateState(e, 'businessName')}
                defaultValue={info.businessName} />
            </div>
            <div className='loginRow'>
              <label htmlFor='number'>Number</label>
              <input
                id='number'
                type='text'
                onChange={(e) => this.updateState(e, 'number')}
                defaultValue={info.number} />
            </div>
            <div className='loginRow'>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                type='text'
                onChange={(e) => this.updateState(e, 'email')}
                defaultValue={info.email} />
            </div>
            <div className='loginRow'>
              <label htmlFor='address1'>Address Line 1 </label>
              <input
                id='address1'
                type='text'
                onChange={(e) => this.updateState(e, 'address1')}
                defaultValue={info.address && info.address.address1} />
            </div>
            <div className='loginRow'>
              <label htmlFor='address2'>Address Line 2 </label>
              <input
                id='address2'
                type='text'
                onChange={(e) => this.updateState(e, 'address2')}
                defaultValue={info.address && info.address.address2} />
            </div>
            <div className='loginRow'>
              <label htmlFor='city'>City</label>
              <input
                id='city'
                type='text'
                onChange={(e) => this.updateState(e, 'city')}
                defaultValue={info.address && info.address.city} />
            </div>
            <div className='loginRow'>
              <label htmlFor='state'>State</label>
              <input
                id='state'
                type='text'
                onChange={(e) => this.updateState(e, 'state')}
                defaultValue={info.address && info.address.state} />
            </div>
            <div className='loginRow'>
              <label htmlFor='postalCode'>Zip Code</label>
              <input
                id='postalCode'
                type='postalCode'
                onChange={(e) => this.updateState(e, 'postalCode')}
                defaultValue={info.address && info.address.postalCode} />

            </div>
            <a className='formLink' onClick={e => {
              updateCard({ variables: {
                token: token,
                id: info.id,
                cardName: this.state.cardName,
                businessName: this.state.businessName,
                displayName: this.state.displayName,
                name: this.state.name,
                number: this.state.number,
                address1: this.state.address1,
                address2: this.state.address2,
                city: this.state.city,
                state: this.state.state,
                postalCode: this.state.postalCode
              } })
                .then(data => {
                  this.editOff()
                })
            }}>Update</a>
            <a className='formLink' onClick={() => this.editOff()}>Cancel</a>
          </React.Fragment>

        )
        }
      </Mutation>
    }
    </React.Fragment>
  }
}
export default CardInfo
