import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import FoursquareAPI from './api/venues'

// create foursquare client instance and export it.
export const foursquare = FoursquareAPI({
  client_id: 'V35SIVLDWCINANGJVNHWFG0VFV0NK0HORACQNQHC5KYMYH2Z',
  client_secret: 'WSMIZOVAGLOXE11ANDRHTVXCJ4C30OCI4DGLI03PYPQYAORN',
  v: '20180323',
});

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
