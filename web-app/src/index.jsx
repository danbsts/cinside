import React from 'react';

import ReactDOM from 'react-dom';
import reportWebVitals from 'reportWebVitals';

import 'index.css';

import Root from 'app/Root';

ReactDOM
  .unstable_createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
  );

reportWebVitals();
