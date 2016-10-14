import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';

export default {

  path: '/',

  action() {
    return {
      component: <Home />,
    };
  },
};
