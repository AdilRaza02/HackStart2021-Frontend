import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import HomeLayout from 'src/layouts/theme/HomeLayout';
import {PATH_LANDINGPAGE} from "../paths";

// ----------------------------------------------------------------------

const LandingPageRoutes = {
    path: PATH_LANDINGPAGE.root,
    layout: HomeLayout,
    routes: [
        {
            exact: true,
            path: '/theme',
            component: lazy(() => import('src/views/theme/home/LandingPageView'))
        },
        {
            exact: true,
            path: '/theme/components',
            component: lazy(() => import('src/views/theme/home/ComponentsView'))
        }
    ]
};

export default LandingPageRoutes;
