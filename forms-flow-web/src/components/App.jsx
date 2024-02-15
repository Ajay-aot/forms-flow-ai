import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import "../assets/styles/layouts.scss";
import "../assets/styles/user-styles.css";
import BaseRouting from "./BaseRouting";
import { Helmet } from "react-helmet";
import { KEYCLOAK_URL } from "../constants/constants";
import { BrowserRouter as Router } from "react-router-dom";

const App = React.memo((props) => {
  const { store, history, publish, subscribe, getKcInstance } = props;
  return (
    <Router>
      <div className="main-container">
        <Helmet>
          {KEYCLOAK_URL ? <link rel="preconnect" href={KEYCLOAK_URL} /> : null}
        </Helmet>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <BaseRouting
              store={store}
              publish={publish}
              subscribe={subscribe}
              getKcInstance={getKcInstance}
            />
          </ConnectedRouter>
        </Provider>
      </div>
      </Router>
  );
});

App.propTypes = {
  history: PropTypes.any.isRequired,
  store: PropTypes.any.isRequired,
};

export default App;
