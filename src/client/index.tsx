import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';

import { Match } from './pages/match';
import  NotFound  from './pages/not_found';
import { Home } from './pages/home';

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to={'/'}>Home</Link>
      </nav>
      <main>
        <Switch>
          <Route path={'/match'}>
            <Match />
          </Route>
          <Route exact path={'/'}>
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
