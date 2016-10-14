import React from 'react';
import Work from './Work';
import fetch from '../../core/fetch';

export default {

  path: '/work',

  action() {
    return {
      component: <Work />,
    };
  },
};
