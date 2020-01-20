import React, { Component } from 'react';
import AuctionsList from '../auction/AuctionsList';
import Notifications from '../dashboard/Notifications';
import { connect } from 'react-redux';
import { getAuctions } from '../../actions/auctionActions';
import PropTypes from 'prop-types';

class Dashboard extends Component {
  static propTypes = {
    getAuctions: PropTypes.func.isRequired,
    auction: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getAuctions();
  }

  // onDeleteClick = id => {
  //   this.props.deleteItem(id);
  // };

  render() {
    const { auctions } = this.props.auction;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <AuctionsList auctions={auctions} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auction: state.auction,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getAuctions }
)(Dashboard);
