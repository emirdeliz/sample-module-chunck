import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Map } from 'sample-submodule-chunck';

import Style from './index.style.scss';
Style.use();

const app = document.getElementById('app');
ReactDOM.render(
  <div className="main">
    <div className="container">
      <Chart />
    </div>
    <div className="container">
      <Map />
    </div>
  </div>, app,
);
