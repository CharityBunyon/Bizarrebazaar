import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import ProductDetail from '../components/pages/ProductDetail/ProductDetail';
import Auth from '../components/pages/Auth/Auth';
import ProductTypes from '../components/pages/ProductTypes/ProductTypes';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import ProductsByCategory from '../components/pages/ProductsByCategory/ProductsByCategory';
import './App.scss';
import SignInForm from '../components/shared/SignInForm/SignInForm';
import SignUpForm from './../components/shared/SignUpForm/SignUpForm';


firebaseConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
// const PrivateRoute = ({ component: Component, authed, ...rest }) => {
//   const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
//   return <Route {...rest} render={(props) => routeChecker(props)} />;
// };


class App extends React.Component {
  state = {
    authed: false,
  }

  render() {
    const { authed } = this.state;
    return (
      <div>
        <Router>
          <MyNavbar authed={authed}/>
          <Switch>
            <PublicRoute path="/home" exact component={Home} authed={authed}/>
            <PublicRoute path="/auth" exact component={Auth} authed={authed}/>
            <PublicRoute path="/productTypes" exact component={ProductTypes} authed={authed}/>
            <PublicRoute path="/productTypes/:productTypeId" exact component={ProductsByCategory} authed={authed}/>
            <PublicRoute path="/productTypes/:productTypeId/productDetail/:productId" exact component={ProductDetail} authed={authed}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
