import React from 'react';
import ReactDOM from 'react-dom';
import TimeEstimatesSettingsDrawer from './TimeEstimatesSettingsDrawer';

const addOns = [
    {
        label: 'Testing',
        factor: 1.15
    },
    {
        label: 'Project Management',
        factor: 1.20
    }
];

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
    ReactDOM.render(<TimeEstimatesSettingsDrawer addOns={addOns}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});