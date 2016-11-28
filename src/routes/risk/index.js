import React from 'react';
import Risk from './Risk';
import fetch from '../../core/fetch';

export default {

  path: '/risk',

  action() {
    return {
      component: <Risk />
    };
  },
};
