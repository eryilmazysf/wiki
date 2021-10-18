import Home from "./pages/Home";
import Page from "./pages/Page";
import Edit from "./pages/Edit";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/edit/">
            <Edit />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/">
            <Page />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
