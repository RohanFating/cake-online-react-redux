import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/app.store.js';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './components/cake-info/cake-info.component.css';
import './components/add-cake/add-cake.component.css';
import './components/cake-details/cake-detail.component.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
