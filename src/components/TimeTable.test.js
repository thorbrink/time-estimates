import React from 'react';
import ReactDOM from 'react-dom';
import TimeTable from './TimeTable';

const tasks = [
    {
        name: 'Task 1',
        description: 'Description 1',
        bestCase: 1,
        probableCase: 2,
        worstCase: 3,
    },
    {
        name: 'Task 2',
        description: 'Description 2',
        bestCase: 2,
        probableCase: 3,
        worstCase: 4,
    },
    {
        name: 'Task 3',
        description: 'Description 3',
        bestCase: 3,
        probableCase: 4,
        worstCase: 5
    }
];

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
    ReactDOM.render(<TimeTable
        tasks={tasks}
        addOns={addOns}
    />, div);
    ReactDOM.unmountComponentAtNode(div);
});