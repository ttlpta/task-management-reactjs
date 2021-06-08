import React, { Suspense, lazy, Fragment, useEffect } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { PersistGate } from "redux-persist/integration/react";
import { getCurrentUser, authState } from './redux/slices/authSlice';
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
        <PersistGate loading={<Loading />} persistor={reduxStore.persistor} >
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
  const dispatch = useDispatch();
  const auth = useSelector(authState);
  const isLogined = auth.accessToken;
  
  useEffect(() => {
    if(isLogined && !auth?.currentUser) {
      dispatch(getCurrentUser());
    }
  }, [isLogined]);  // eslint-disable-line react-hooks/exhaustive-deps
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
