import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Link } from '@reach/router'
import { UPDATE_CARD, DELETE_CARD, FAVORITE_CARD, UNFAVORITE_CARD } from '../queries'

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
    const username = window.localStorage.getItem('username')
    return <React.Fragment> { !this.state.isEditing
      ? <React.Fragment>
        <div className='cardHeader'>
          {info.displayName && info.displayName}
          {(!info.user || (info.user && username !== info.user.username)) && (('favorite' in this.state ? this.state.favorite : info.favorite) ? <Mutation mutation={UNFAVORITE_CARD}>
            {(favorite) =>
              <a className='formLink' onClick={() => {
                favorite({
                  variables: {
                    token: token,
                    cardId: info.id
                  }
                }).then(this.setState({
                  favorite: !this.state.favorite
                }))
              }}><i className='fas fa-star' /></a>
            }
          </Mutation> : <Mutation mutation={FAVORITE_CARD}>
            {(favorite) =>
              <a className='formLink' onClick={() => {
                favorite({
                  variables: {
                    token: token,
                    cardId: info.id
                  }
                }).then(this.setState({
                  favorite: !this.state.favorite
                }))
              }}><i className='far fa-star' /></a>
            }
          </Mutation>)}</div>
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
        {info.birthDate && <div className='cardLine'><i className='fas fa-birthday-cake cardIcon' /> {info.birthDate}</div>}
        {info.twitter && <div className='cardLine'><i className='fab fa-twitter cardIcon' /> {info.twitter}</div>}
        {info.linkedIn && <div className='cardLine'><i className='fab fa-linkedin cardIcon' /> {info.linkedIn}</div>}
        {info.facebook && <div className='cardLine'><i className='fab fa-facebook-f cardIcon' /> {info.facebook}</div>}
        {info.instagram && <div className='cardLine'><i className='fab fa-instagram cardIcon' /> {info.instagram}</div>}

        {((info.author && username === info.author.username) || (info.user && username === info.user.username)) && <div className='cardOptions'>
          {(info.author && username === info.author.username) && <Mutation mutation={DELETE_CARD}>
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
          </Mutation>}
          {(info.author && username === info.author.username) && <a className='cardOption' onClick={() => {
            this.editOn(info)
          }}><i className='fas fa-edit cardOptionIcon' /> Edit</a>}
          {(info.user && username === info.user.username) && <Link className='cardOption' to={info.cardToken} ><i className='fas fa-share-alt cardOptionIcon' /> Share</Link>}

        </div>}

      </React.Fragment>
      : <Mutation mutation={UPDATE_CARD} update={this.logCache}>
        {(updateCard) => (
          <React.Fragment>

            <div className='cardHeader'><div className='cardLine'><input type='text' defaultValue={info.cardName} onChange={(e) => this.updateState(e, 'cardName')} /><input type='text' defaultValue={info.displayName} onChange={(e) => this.updateState(e, 'displayName')} /></div><a className='formLink' onClick={() => this.editOff()}><i className='fas fa-times' /></a></div>
            <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> <input type='text' placeholder='Name' defaultValue={info.name} onChange={(e) => this.updateState(e, 'name')} /></div>
            <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> <input type='text' placeholder='Business Name' defaultValue={info.businessName} onChange={(e) => this.updateState(e, 'businessName')} /></div>
            <div className='cardLine'><i className='fas fa-phone cardIcon' /> <input type='text' placeholder='Phone Number' defaultValue={info.number} onChange={(e) => this.updateState(e, 'number')} /></div>
            <div className='cardLine'><i className='fas fa-envelope cardIcon' /> <input placeholder='Email' type='text' defaultValue={info.email} onChange={(e) => this.updateState(e, 'email')} /></div>
            <div className='address'>
              <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /> </div>
              <div className='addressBlock'>
                <div className='addressLine line1'> <input type='text' placeholder='Address Line 1' defaultValue={info.address && info.address.address1} onChange={(e) => this.updateState(e, 'address1')} /></div>
                <div className='addressLine line2'> <input type='text' placeholder='Address Line 2'defaultValue={info.address && info.address.address2} onChange={(e) => this.updateState(e, 'address2')} /></div>
                <div className='addressLine line3'> <input type='text' className='city' placeholder='City' defaultValue={info.address && info.address.city} onChange={(e) => this.updateState(e, 'city')} />, <input type='text' className='state' placeholder='State' defaultValue={info.address && info.address.state} onChange={(e) => this.updateState(e, 'state')} /> <input type='text' placeholder='ZIP Code' defaultValue={info.address && info.address.postalCode} onChange={(e) => this.updateState(e, 'postalCode')} /></div>
              </div>
            </div>
            <div className='cardLine'><i className='fas fa-birthday-cake cardIcon' /> <input type='date' defaultValue={info.birthDate} onChange={(e) => this.updateState(e, 'birthDate')} /></div>
            <div className='cardLine'><i className='fab fa-facebook cardIcon' /> <input type='text' placeholder='Facebook' defaultValue={info.facebook} onChange={(e) => this.updateState(e, 'facebook')} /></div>
            <div className='cardLine'><i className='fab fa-twitter cardIcon' /> <input type='text' placeholder='Twitter' defaultValue={info.twitter} onChange={(e) => this.updateState(e, 'twitter')} /></div>
            <div className='cardLine'><i className='fab fa-linkedin cardIcon' /> <input type='text' placeholder='LinkedIn' defaultValue={info.linkedIn} onChange={(e) => this.updateState(e, 'linkedIn')} /></div>
            <div className='cardLine'><i className='fab fa-instagram cardIcon' /> <input type='text' placeholder='Instagram' defaultValue={info.instagram} onChange={(e) => this.updateState(e, 'instagram')} /></div>

            <a className='buttonSignIn' onClick={e => {
              updateCard({ variables: {
                token: token,
                id: info.id,
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
                birthDate: this.state.birthDate,
                facebook: this.state.facebook,
                twitter: this.state.twitter,
                linkedIn: this.state.linkedIn,
                instagram: this.state.instagram
              } })
                .then(data => {
                  this.editOff()
                })
            }}>Update</a>
          </React.Fragment>

        )
        }
      </Mutation>
    }
    </React.Fragment>
  }
}
export default CardInfo
