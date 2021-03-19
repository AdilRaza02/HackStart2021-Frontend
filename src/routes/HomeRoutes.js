import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { PATH_MEDICLY } from './paths';

// ----------------------------------------------------------------------

const HomeRoutes = {
  path: '*',
  routes: [
    {
      component: () => <Redirect to={PATH_MEDICLY.main.photo} />
    }
  ]
};

export default HomeRoutes;
