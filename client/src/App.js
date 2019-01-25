import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchedBooks from "./pages/SearchedBooks";
import SavedBooks from "./pages/SavedBooks";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={SearchedBooks} />
          <Route exact path="/search" component={SearchedBooks} />
          <Route exact path="/saved" component={SavedBooks} />
          {/*<Route component={NoMatch} />*/}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
