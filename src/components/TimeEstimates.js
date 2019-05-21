import React from 'react';
import TimeTable from './TimeTable.js';

class TimeEstimates extends React.Component {

    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.removeTask = this.removeTask.bind(this);

        this.state = {
            tasks: [],
            addOns: []
        }
    }

    componentDidMount() {

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

        this.setState({
            tasks: tasks,
            addOns: addOns
        });
    }

    addTask() {
        this.setState(state => {
            return {tasks: [...state.tasks, {}]}
        })
    }

    updateTask(index, name, value) {

        this.setState(state => {

            const tasks = state.tasks;
            tasks[index][name] = value;

            return {
                tasks: tasks
            };
        });
    }

    removeTask(index) {

        this.setState(state => {

            let tasks = state.tasks;
            tasks.splice(index, 1);

            // Prevent from removing all rows.
            if (tasks.length < 1) {
                tasks = [{}];
            }

            return {tasks: tasks};

        });
    }

    render() {

        const {
            tasks,
            addOns
        } = this.state;

        return (
            <TimeTable
                tasks={tasks}
                addTask={this.addTask}
                onUpdate={this.updateTask}
                onRemove={this.removeTask}
                addOns={addOns}
            />
        );
    }
}

export default TimeEstimates;