import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AccountsPage from "./AccountsPage";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        {/* Navigation links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Blockexplorer</Link>{" "}
            </li>
            <li>
              <Link to="/accounts">Check Balance</Link>{" "}
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/accounts">
            <AccountsPage />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
