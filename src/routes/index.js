import NProgress from 'nprogress';
import MediclyRoutes from './medicly/MediclyRoutes';
import AppRoutes from './theme/AppRoutes';
import { PATH_PAGE } from './paths';
import HomeRoutes from './HomeRoutes';
import LandingPageRoutes from './theme/LandingPageRoutes';
import DocsRoutes from './theme/DocsRoutes';
import LoadingScreen from '~/components/theme/LoadingScreen';
import GuestProtect from '~/components/theme/Auth/GuestProtect';
import { Switch, Route, Redirect } from 'react-router-dom';
import React, { Suspense, Fragment, lazy, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const nprogressStyle = makeStyles(theme => ({
  '@global': {
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        top: 0,
        left: 0,
        height: 2,
        width: '100%',
        position: 'fixed',
        zIndex: theme.zIndex.snackbar,
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 0 2px ${theme.palette.primary.main}`
      },
      '& .peg': {
        right: 0,
        opacity: 1,
        width: 100,
        height: '100%',
        display: 'block',
        position: 'absolute',
        transform: 'rotate(3deg) translate(0px, -4px)',
        boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`
      }
    }
  }
}));

function RouteProgress(props) {
  nprogressStyle();

  NProgress.configure({
    speed: 500,
    showSpinner: false
  });

  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, []);

  return <Route {...props} />;
}

export function renderRoutes(routes = []) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Layout = route.layout || Fragment;
          const Component = route.component;
          const Guard = route.guard || Fragment;
          return (
            <RouteProgress
              key={i}
              path={route.path}
              exact={route.exact}
              render={props => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}

const routes = [

   //Medicly App
   MediclyRoutes,

  // Others Routes
  {
    exact: true,
    guard: GuestProtect,
    path: PATH_PAGE.auth.login,
    component: lazy(() => import('~/views/theme/auth/LoginView'))
  },
  {
    exact: true,
    path: PATH_PAGE.auth.loginUnprotected,
    component: lazy(() => import('~/views/theme/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestProtect,
    path: PATH_PAGE.auth.register,
    component: lazy(() => import('~/views/theme/auth/RegisterView'))
  },
  {
    exact: true,
    path: PATH_PAGE.auth.registerUnprotected,
    component: lazy(() => import('~/views/theme/auth/RegisterView'))
  },
  {
    exact: true,
    path: PATH_PAGE.auth.resetPassword,
    component: lazy(() => import('~/views/theme/auth/ResetPasswordView'))
  },
  {
    exact: true,
    path: PATH_PAGE.auth.verify,
    component: lazy(() => import('~/views/theme/auth/VerifyCodeView'))
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('~/views/theme/errors/Page404View'))
  },
  {
    exact: true,
    path: '/500',
    component: lazy(() => import('~/views/theme/errors/Page500View'))
  },
  {
    exact: true,
    path: PATH_PAGE.comingSoon,
    component: lazy(() => import('~/views/theme/pages/ComingSoonView'))
  },
  {
    exact: true,
    path: PATH_PAGE.maintenance,
    component: lazy(() => import('~/views/theme/pages/MaintenanceView'))
  },
  {
    exact: true,
    path: PATH_PAGE.pricing,
    component: lazy(() => import('src/views/theme/pages/PricingView'))
  },
  {
    exact: true,
    path: PATH_PAGE.payment,
    component: lazy(() => import('src/views/theme/pages/PaymentView'))
  },


  AppRoutes,

  // Docs Routes
  DocsRoutes,

  LandingPageRoutes,

  // Home Routes
  HomeRoutes,



];

export default routes;
