import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Rooms from './ui/rooms/Rooms';
import store from './state/store';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Single from './ui/rooms/Single';
import Double from './ui/rooms/Double';
import 'bulma/css/bulma.css';
import '../src/ui/style/style.css';


const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Rooms} />
        <Route exact path="/room/single/:id" component={(routerProps) =>
          <Single id={routerProps.match.params.id} status={routerProps.location.status}
            nickPlayer={routerProps.location.nickPlayer} />} />
        <Route exact path="/room/double/:id" component={(routerProps) =>
          <Double id={routerProps.match.params.id} status={routerProps.location.status}
            nickPlayer={routerProps.location.nickPlayer} />} />
      </Switch>
    </Router>
  </Provider>,
  rootEl
);
render();