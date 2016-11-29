import React from 'react';
import Rup from './Rup';
import fetch from '../../core/fetch';

export default {

  path: '/rup',

  action() {
    return {
      component: <Rup />
    };
  },
};
