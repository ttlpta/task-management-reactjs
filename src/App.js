import React, { Suspense, lazy, Fragment } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider, useSelector } from "react-redux";
import { Loading } from "./components";

import store from "./redux/store";

import Normalize from "./Normalize";
import themeLight from "./themes/defaultTheme";

const Login = lazy(() => import("./scenes/Login/Login"));
const List = lazy(() => import("./scenes/List/List"));
const Page500 = lazy(() => import("./scenes/500/Page500"));
const Page404 = lazy(() => import("./scenes/404/Page404"));

export default function App() {
  return (
    <Fragment>
      <Normalize />
      <Provider store={store}>
        <ThemeProvider theme={themeLight}>
          <Router>
            <Suspense fallback={Loading()}>
              <Page500>
                <Switch>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <PrivateRouter path="/">
                    <List />
                  </PrivateRouter>
                  <Route name="Page 404" component={Page404} />
                </Switch>
              </Page500>
            </Suspense>
          </Router>
        </ThemeProvider>
      </Provider>
    </Fragment>
  );
}

function PrivateRouter({ children, ...rest }) {
  const isLogined = useSelector((state) => state.auth.isLogined);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogined ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
