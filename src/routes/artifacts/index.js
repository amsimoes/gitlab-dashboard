import React from 'react';
import Artifacts from './Artifacts';
import fetch from '../../core/fetch';

export default {

  path: '/artifacts',

  action() {
    return {
      component: <Artifacts />,
    };
  },
};
