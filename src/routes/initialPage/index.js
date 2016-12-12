import React from 'react';
import InitialPage from './InitialPage';
import fetch from '../../core/fetch';

export default {

  path: '/initialPage',

  action() {
    return {
      component: <InitialPage />,
    };
  },
};
