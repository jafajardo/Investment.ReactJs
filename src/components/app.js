import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';

import Home from './home';
import Investment from './Investment';

const App = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Investment" component={Investment} />
    </Switch>
  </Router>
)

export default App;