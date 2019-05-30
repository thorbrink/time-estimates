import React from 'react';
import ReactDOM from 'react-dom';
import {act, isElement} from 'react-dom/test-utils';
import TimeTableRow from './TimeTableRow';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('renders TimeTableRow and outputs correct values', () => {
    // Test first render and componentDidMount
    act(() => {
        ReactDOM.render(
            <table>
                <tbody>
                <TimeTableRow
                    taskName="Task Test Name"
                    description="Task Test Description"
                    bestCase={1}
                    probableCase={2}
                    worstCase={3}
                    addOns={["0.30", "0.40"]}
                    total={3}
                />
                </tbody>
            </table>,
            container);
    });

    const td = container.querySelectorAll('tr td');
    const inputs = container.querySelectorAll('tr td input');
    expect(inputs[0].value).toBe('Task Test Name');
    expect(inputs[1].value).toBe('Task Test Description');
    expect(inputs[2].value).toBe('1');
    expect(inputs[3].value).toBe('2');
    expect(inputs[4].value).toBe('3');
    expect(td[5].textContent).toBe('0.30');
    expect(td[6].textContent).toBe('0.40');
    expect(td[7].textContent).toBe('3');

    // const label = container.querySelector('p');
    // expect(label.textContent).toBe('You clicked 0 times');
    // expect(document.title).toBe('You clicked 0 times');
    //
    // // Test second render and componentDidUpdate
    // act(() => {
    //     button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    // });
    // expect(label.textContent).toBe('You clicked 1 times');
    // expect(document.title).toBe('You clicked 1 times');
});