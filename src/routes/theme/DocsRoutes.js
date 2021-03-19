import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { PATH_DOCS } from '~/routes/paths';
import DocsLayout from '~/layouts/theme/DocsLayout';

// ----------------------------------------------------------------------

const DocsRoutes = {
  path: PATH_DOCS.root,
  layout: DocsLayout,
  routes: [
    // GETTING STARTED
    {
      exact: true,
      path: PATH_DOCS.introduction,
      component: lazy(() =>
        import('src/views/theme/docs/getting-started/IntroductionView')
      )
    },

    {
      exact: true,
      path: PATH_DOCS.started,
      component: lazy(() =>
        import('src/views/theme/docs/getting-started/QuickStartView')
      )
    },

    // THEME UI
    {
      exact: true,
      path: PATH_DOCS.color,
      component: lazy(() => import('src/views/theme/docs/theme/ColorView'))
    },
    {
      exact: true,
      path: PATH_DOCS.typography,
      component: lazy(() => import('src/views/theme/docs/theme/TypopgrahyView'))
    },
    {
      exact: true,
      path: PATH_DOCS.icon,
      component: lazy(() => import('src/views/theme/docs/theme/IconView'))
    },
    {
      exact: true,
      path: PATH_DOCS.shadows,
      component: lazy(() => import('src/views/theme/docs/theme/ShadowView'))
    },
    {
      exact: true,
      path: PATH_DOCS.components,
      component: lazy(() => import('src/views/theme/docs/theme/ComponentsView'))
    },
    {
      exact: true,
      path: PATH_DOCS.important,
      component: lazy(() => import('src/views/theme/docs/theme/ImportantView'))
    },

    // DEVELOPMENT
    {
      exact: true,
      path: PATH_DOCS.routing,
      component: lazy(() => import('src/views/theme/docs/development/RoutingView'))
    },
    {
      exact: true,
      path: PATH_DOCS.environmentVariables,
      component: lazy(() =>
        import('src/views/theme/docs/development/EnvironmentVariablesView')
      )
    },
    {
      exact: true,
      path: PATH_DOCS.stateManagement,
      component: lazy(() =>
        import('src/views/theme/docs/development/StateManagement')
      )
    },
    {
      exact: true,
      path: PATH_DOCS.apiCalls,
      component: lazy(() => import('src/views/theme/docs/development/APICallsView'))
    },
    {
      exact: true,
      path: PATH_DOCS.analytics,
      component: lazy(() => import('~/views/theme/docs/development/AnalyticsView'))
    },
    {
      exact: true,
      path: PATH_DOCS.authentication,
      component: lazy(() =>
        import('~/views/theme/docs/development/AuthenticationView')
      )
    },
    {
      exact: true,
      path: PATH_DOCS.multiLanguage,
      component: lazy(() =>
        import('~/views/theme/docs/development/MultiLanguageView')
      )
    },
    {
      exact: true,
      path: PATH_DOCS.formHelper,
      component: lazy(() => import('~/views/theme/docs/development/FormHelperView'))
    },

    // SUPPORT & CHANGELOG
    {
      exact: true,
      path: PATH_DOCS.support,
      component: lazy(() => import('~/views/theme/docs/support-log/SupportView'))
    },
    {
      exact: true,
      path: PATH_DOCS.changelog,
      component: lazy(() => import('~/views/theme/docs/support-log/ChangelogView'))
    },
    {
      exact: true,
      path: PATH_DOCS.root,
      component: () => <Redirect to={PATH_DOCS.introduction} />
    },
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default DocsRoutes;
