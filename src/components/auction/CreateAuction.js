import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAuction } from '../../actions/auctionActions';

class CreateAuction extends Component {
  state = {
    title: '',
    content: ''
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.createAuction(this.state);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create new Auction</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" onChange={this.onChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Description</label>
            <textarea name="description" id="content" className="materialize-textarea" onChange={this.onChange}></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    createAuction: data => dispatch(createAuction(data, ownProps)),
  };
};

export default connect(null, mapDispatch)(CreateAuction);