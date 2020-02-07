import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/Main';
import { store } from './store/configureStore'
import { Provider } from 'react-redux'
import 'typeface-roboto'

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


