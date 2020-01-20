import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    errors: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ errors: error.errors });
      } else {
        this.setState({ errors: null });
      }
    }

    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.register(this.state);
  };

  showErrorBlock = field => {
    if(!this.state.errors) {
      return '';
    }
    return this.state.errors.map((error, key) => {
      if(error.param !== field) {
        return '';
      }
        
      return ( <span className="error_msg" key={key} >{error.msg}</span> );
    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={this.onChange} />
            {this.showErrorBlock('email')}
          </div>
          
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={this.onChange} />
            {this.showErrorBlock('password')}
          </div>
          
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={this.onChange} />
            {this.showErrorBlock('name')}
          </div>
          
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register }
)(SignUp);
