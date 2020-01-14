import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
// import AuctionDetails from './components/auction/AuctionDetails';
// import SignIn from './components/auth/SignIn';
// import SignUp from './components/auth/SignUp';
// import CreateAuction from './components/auction/CreateAuction';

import { Provider } from 'react-redux';
import store from './store';
// import { loadUser } from './actions/authActions';


class App extends Component {
  componentDidMount() {
    // store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              {/* <Route path="/auction/:id" component={AuctionDetails} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/create" component={CreateAuction} /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
