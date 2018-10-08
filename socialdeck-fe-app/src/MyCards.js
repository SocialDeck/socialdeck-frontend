import React, { Component } from 'react'
import { Link } from '@reach/router'

class MyCards extends Component {
  render () {
    return (
      <React.Fragment>
        <Link to='/contacts'>Contacts List</Link>
        <div>SHOW USER'S CARDS HERE</div>
        <div className='card'>
          <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> Name</div>
          <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> Business</div>
          <div className='cardLine'><i className='fas fa-phone cardIcon' /> 999-999-9999</div>
          <div className='cardLine'><i className='fas fa-envelope cardIcon' /> example@example.com</div>
          <div className='address'>
            <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
            <div className='addressBlock'>
              <div className='addressLine line1'> Address Line 1</div>
              <div className='addressLine line2'> Address Line 2</div>
              <div className='addressLine line3'> City, State ZipCode</div>
            </div>
          </div>
        </div>
        <div>CREATE NEW CARD</div>
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
        <button onClick={() => console.log('add my card to GraphQL for storage')}>Add New Card</button>
      </React.Fragment>

    )
  }
}
export default MyCards
