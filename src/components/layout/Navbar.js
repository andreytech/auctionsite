import React, { Component, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  onSignOut = e => {
    e.preventDefault();

    this.props.logout();
  }

  getUserInitials = () => {
    if(!this.props.auth.user) {
      return '';
    }
    return this.props.auth.user.name.split(" ").map((n)=>n[0]).join("").toUpperCase();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userInitials = this.getUserInitials();

    const authLinks = (
      <Fragment>
        <ul className="right">
          <li><NavLink to="/create">New Auction</NavLink></li>
          <li><Link to="/" onClick={this.onSignOut}>Sign Out</Link></li>
          <li><NavLink to="/" className="btn btn-floating pink lighten-1">{userInitials}</NavLink></li>
        </ul>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <ul className="right">
          <li><NavLink to="/signup">Signup</NavLink></li>
          <li><NavLink to="/signin">Login</NavLink></li>
        </ul>
      </Fragment>
    );

    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to='/' className="brand-logo">New Ebay</Link>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  };
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
