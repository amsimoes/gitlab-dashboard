/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

// The top-level (parent) route
import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import notFound from './notFound';
import project from './project';
import artifacts from './artifacts';
import work from './work';
import processes from './processes';
import people from './people';
import rup from './rup';
import risk from './risk';
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./project').default,
    require('./artifacts').default,
    require('./work').default,
    require('./processes').default,
    require('./people').default,
    require('./rup').default,
    require('./risk').default,
    require('./notFound').default,
  ],

  async action({ next }) {
    let route;

    // Execute each child route until one of them return the result
    // TODO: move this logic to the `next` function
    do {
      route = await next();
    } while (!route);

    // Provide default values for title, description etc.
    route.title = `Team Zig Git Dashboard`;
    route.description = route.description || '';

    return route;
  },

};
