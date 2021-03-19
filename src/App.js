import React from 'react';
import ThemeConfig from './theme';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import routes, { renderRoutes } from '~/routes';
import ScrollToTop from '~/components/theme/ScrollToTop';
import GoogleAnalytics from '~/components/theme/GoogleAnalytics';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import NotistackProvider from '~/components/theme/NotistackProvider';
import FirebaseProvider from '~/components/theme/Auth/FirebaseProvider';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import axios from 'axios';
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const history = createBrowserHistory();

function App() {

  return (
    <ThemeConfig>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <NotistackProvider>
          <Router history={history}>
            <FirebaseProvider>
              <ScrollToTop />
              <GoogleAnalytics />
              {renderRoutes(routes)}
            </FirebaseProvider>
          </Router>
        </NotistackProvider>
      </LocalizationProvider>
    </ThemeConfig>
  );
}

export default App;
