import React from 'react';
import People from './People';
import fetch from '../../core/fetch';

export default {

  path: '/people',

  action() {
    return {
      component: <People />,
    };
  },
};
