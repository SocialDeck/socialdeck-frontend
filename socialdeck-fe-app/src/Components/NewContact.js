import React, { Component } from 'react'
import { Link } from '@reach/router'

class NewContact extends Component {
  render () {
    return (
      <React.Fragment>
        <div className='card'>
          <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> <input type='text' defaultValue='Name' /></div>
          <div className='cardLine'><i className='fas fa-briefcase cardIcon' /><input type='text' defaultValue='Business' /></div>
          <div className='cardLine'><i className='fas fa-phone cardIcon' /> <input type='text' defaultValue='999-999-9999' /></div>
          <div className='cardLine'><i className='fas fa-envelope cardIcon' /> <input type='text' defaultValue='example@example.com' /></div>
          <div className='address'>
            <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
            <div className='addressBlock'>
              <div className='addressLine line1'><input type='text' defaultValue='Address Line 1' /></div>
              <div className='addressLine line2'><input type='text' defaultValue='Address Line 2' /></div>
              <div className='addressLine line3'> <input type='text' defaultValue='City' />, <input type='text' defaultValue='State' /> <input type='text' defaultValue='ZipCode' /></div>
            </div>
          </div>
        </div>
        <button onClick={() => console.log('submit orphan contact info to GraphQL for storage')}>Add Contact</button>
      </React.Fragment>

    )
  }
}
export default NewContact
