import {PATH_MEDICLY} from '../paths';
import {lazy} from 'react';
import {Redirect} from 'react-router-dom';
import MediclyMainLayout from '~/layouts/medicly/main';
import React from "react";

// ----------------------------------------------------------------------

const MediclyRoutes = {
    path: PATH_MEDICLY.root,
    layout: MediclyMainLayout,
    routes: [
        {
            exact: true,
            path: PATH_MEDICLY.main.photo,
            component: lazy(() => import('~/views/medicly/photo'))
        },


        {
            exact: true,
            path: PATH_MEDICLY.main.deficiencies,
            component: lazy(() => import('~/views/medicly/deficiencies'))
        },

        {
            exact: true,
            path: PATH_MEDICLY.main.deficiencyDetails,
            component: lazy(() => import('~/views/medicly/deficiencyDetails'))
        },

        {
            exact: true,
            path: PATH_MEDICLY.main.articlesResult,
            component: lazy(() => import('~/views/medicly/articlesResult'))
        },

        // ----------------------------------------------------------------------
        {
            component: () => <Redirect to="/404" />
        }
]
}
export default MediclyRoutes;
