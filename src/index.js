import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './globalStyles.scss';

render(<App apiUrl={process.env.API_URL} />, document.getElementById('root'));
