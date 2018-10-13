import React, { Component } from 'react'
import { Link } from '@reach/router'
import { slide as Menu } from 'react-burger-menu'

class SideBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange (state) {
    this.setState({ menuOpen: state.isOpen })
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu () {
    this.setState({ menuOpen: false })
  }

  render () {
    const token = window.localStorage.getItem('token')
    return (
      <Menu
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}
      >
        {!token && <Link className='navLinks' to='/login' onClick={() => this.closeMenu()}>Login</Link>}
        {token && <React.Fragment>
          <Link className='navLinks' to='/contacts' onClick={() => this.closeMenu()}>Contacts</Link>
          <br />
          <Link className='navLinks' to='/favorites' onClick={() => this.closeMenu()}>Favorites</Link>
          <br />
          <Link className='navLinks' to='/contacts/subscribers' onClick={() => this.closeMenu()}>Subscribers</Link>
          <br />
          <Link className='navLinks' to='/my-cards' onClick={() => this.closeMenu()}>Profiles</Link>
          <br />
          <Link className='navLinks' to='/contacts/new-contact' onClick={() => this.closeMenu()}>New Contact</Link>
          <br />
          <Link className='navLinks' to='/editAccount' onClick={() => this.closeMenu()}>Edit Account</Link>
          <br />
          <a className='logOutButton' onClick={() => {
            this.props.logOut()
            this.closeMenu()
          }}>Log Out</a>
          <br />
        </React.Fragment>}
        {this.props.children}
      </Menu>

    )
  }
}
export default SideBar
