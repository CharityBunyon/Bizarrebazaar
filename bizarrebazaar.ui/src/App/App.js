import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Shop from '../components/pages/Shop/Shop';
import UserProfile from '../components/pages/UserProfile/UserProfile';
import ProductDetail from '../components/pages/ProductDetail/ProductDetail';
import ProductTypes from '../components/pages/ProductTypes/ProductTypes';
import SellerStore from '../components/pages/SellerStore/SellerStore';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import ProductsByCategory from '../components/pages/ProductsByCategory/ProductsByCategory';
import userData from '../helpers/data/userData';
import './App.scss';

firebaseConnection();

// const PublicRoute = ({ component: Component, authed, ...rest }) => {
//   const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
//   return <Route {...rest} render={(props) => routeChecker(props)} />;
// };
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    internalUser: {},
    firebaseUser: {},
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((firebaseUser) => {
      // fetch call
      userData.GetUserByEmail(firebaseUser.email)
        .then((response) => {
          const internalUser = response.data;
          if (firebaseUser) {
            // call out to api/user by firebase email, ? internalUserId: currentUserObj.id
            // pass this into the id space on my link
            this.setState({ authed: true, firebaseUser, internalUser });
          } else {
            this.setState({ authed: false });
          }
        });
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, firebaseUser, internalUser } = this.state;
    return (
      <div>
        <Router>
          <MyNavbar authed={authed} internalUserId={internalUser?.id} />
          <Switch>
            <Route path="/home" exact component={Home} authed={authed}/>
            <Route
            path='/auth'
            render={() => (authed ? (
                <Redirect to='/home' />
            ) : (
                <Auth />
            ))
            }
          />
            <Route path="/productTypes" exact component={ProductTypes} authed={authed}/>
            <Route path="/productTypes/:productTypeId" exact component={ProductsByCategory} authed={authed}/>
            <Route path="/SellerStore/:userId" exact component={SellerStore} authed={authed}/>
            <PrivateRoute path="/userProfile/:id" exact component={UserProfile} authed={authed} userObj={internalUser} />
            <Route path="/product/:productId" exact component={ProductDetail} authed={authed}/>
            <Route path="/shop" exact component={Shop} authed={authed}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
