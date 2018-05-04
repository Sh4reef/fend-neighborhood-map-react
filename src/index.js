import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// create foursquare client instance and export it.
export const foursquare = require('react-foursquare')({
  clientID: 'EQHSJRH1EAUERANR5BGSHXPDOFAXWCE0YDDVF0T2UOWR00Q3',
  clientSecret: 'OSRMJEFTWUNJN4GPQYKZBWLIUKPIT4TEMI1ZPFO1LCJLHPLL'
});

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
