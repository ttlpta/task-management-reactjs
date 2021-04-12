import React, { Suspense, lazy, Fragment } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider, useSelector } from "react-redux";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { PersistGate } from "redux-persist/integration/react";
import { Layout, Loading, Snackbar } from "./components";

import reduxStore from "./redux/store";

import Normalize from "./Normalize";
import themeLight from "./themes/defaultTheme";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: themeLight.PRIMARY_COLOR,
    },
    secondary: {
      main: themeLight.SECOND_COLOR,
      contrastText: themeLight.SECOND_CONTRAST_TEXT,
    },
  },
  spacing: themeLight.SPACING,
});

const Login = lazy(() => import("./scenes/Login/Login"));
const Logout = lazy(() => import("./scenes/Logout/Logout"));
const Tasks = lazy(() => import("./scenes/Tasks/List"));
const Categories = lazy(() => import("./scenes/Categories/Categories"));
const Users = lazy(() => import("./scenes/Users/Users"));
const Page500 = lazy(() => import("./scenes/500/Page500"));
const Page404 = lazy(() => import("./scenes/404/Page404"));

export default function App() {
  return (
    <Fragment>
      <Normalize />
      <Provider store={reduxStore.store}>
        <PersistGate loading={null} persistor={reduxStore.persistor}>
          <ThemeProvider theme={themeLight}>
            <MuiThemeProvider theme={theme}>
              <Router>
                <Suspense fallback={Loading()}>
                  <Page500>
                    <Switch>
                      <Route exact path="/login">
                        <Login />
                      </Route>
                      <PrivateRouter exact path="/logout" noLayout>
                        <Logout />
                      </PrivateRouter>
                      <PrivateRouter exact path="/" title="Tasks">
                        <Tasks />
                      </PrivateRouter>
                      <PrivateRouter exact path="/categories" title="Categories">
                        <Categories />
                      </PrivateRouter>
                      <PrivateRouter exact path="/users" title="Users">
                        <Users />
                      </PrivateRouter>
                      <Redirect
                        from="/tasks"
                        to={"/"}
                      />
                      <Route name="Page 404" component={Page404} />
                    </Switch>
                  </Page500>
                </Suspense>
              </Router>
              <Snackbar />
            </MuiThemeProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </Fragment>
  );
}

function PrivateRouter({ children, title, noLayout = false, ...rest }) {
  const isLogined = useSelector((state) => state.auth.accessToken);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogined ? (
          noLayout ? children : <Layout title={title}>{children}</Layout>
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
