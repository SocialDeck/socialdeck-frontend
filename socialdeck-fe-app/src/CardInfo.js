import React, { Component } from 'react'
// import { Mutation } from 'react-apollo'

class CardInfo extends Component {
  constructor () {
    super()
    this.state = {
      isEditing: false
    }
  }

  editOn () {
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
    return <React.Fragment> { !this.state.isEditing
      ? <React.Fragment>
        {info.personName && <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> {info.personName}</div>}
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
          console.log('send my edited card to GraphQL for distribution')
          this.editOn()
        }}>Edit Card</button>
      </React.Fragment>
      : <React.Fragment>
        {info.personName && <div className='cardLine'><i className='fas fa-user-circle cardIcon' /><input type='text' defaultValue={info.personName} /></div>}
        {info.businessName && <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> <input type='text' defaultValue={info.businessName} /></div>}
        {info.number && <div className='cardLine'><i className='fas fa-phone cardIcon' /> <input type='text' defaultValue={info.number} /></div>}
        {info.email && <div className='cardLine'><i className='fas fa-envelope cardIcon' /> <input type='text' defaultValue={info.email} /></div>}
        {info.address &&
        <div className='address'>
          <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
          <div className='addressBlock'>
            <div className='addressLine line1'> <input type='text' defaultValue={info.address.address1} /></div>
            <div className='addressLine line2'> <input type='text' defaultValue={info.address.address2} /></div>
            <div className='addressLine line3'>
              <input type='text' defaultValue={info.address.city} />,
              <input type='text' defaultValue={info.address.state} />
              <input type='text' defaultValue={info.address.postalCode} />
            </div>
          </div>
        </div>
        }
        <button onClick={() => {
          console.log('send my edited card to GraphQL for distribution')
          this.editOff()
        }}>Update</button>
      </React.Fragment>
    }
    </React.Fragment>
  }
}
export default CardInfo
