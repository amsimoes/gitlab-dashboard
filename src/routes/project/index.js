import React from 'react';
import Project from './Project';
import fetch from '../../core/fetch';

export default {

  path: '/project',

  action() {
    return {
      component: <Project />,
    };
  },
};
