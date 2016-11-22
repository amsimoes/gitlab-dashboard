import React from 'react';
import Processes from './Processes';
import fetch from '../../core/fetch';

export default {

    path: '/processes',

    action() {
      return {
        component: <Processes />,
      };
    },
};

