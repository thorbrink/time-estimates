import React from 'react';
import ReactDOM from 'react-dom';
import TimeEstimates from './TimeEstimates';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TimeEstimates/>, div);
    ReactDOM.unmountComponentAtNode(div);
});