import './TimeTable.css';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import TimeTableRow from './TimeTableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';

export default class TimeTable extends React.Component {

    constructor(props) {
        super(props);
        this.removeRow = this.removeRow.bind(this);
        this.onRowUpdate = this.onRowUpdate.bind(this);
        this.calculateRowsAverage = this.calculateRowsAverage.bind(this);
    }

    removeRow(index) {
        this.props.onRemove(index);
    }

    onRowUpdate(index, name, value) {
        this.props.onUpdate(index, name, value);
    }

    calculateRowsAverage() {
        const {tasks} = this.props;
        let total = 0;

        tasks.map((row) => {
            total += Math.round((Number(row.bestCase) + Number(row.probableCase) + Number(row.worstCase)) / 3);
        });

        return total;
    }

    render() {

        const {tasks, addOns} = this.props;
        const averageTotal = this.calculateRowsAverage();

        return (
            <div className="TimeTable">
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Task name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Best case (h)</TableCell>
                                <TableCell>Probable (h)</TableCell>
                                <TableCell>Worst case (h)</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Average of best, worst and probable case." placement="top-end">
                                        <span>Estimate (h)</span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task, i) => {
                                return (
                                    <TimeTableRow
                                        key={i}
                                        taskName={task.name}
                                        description={task.description}
                                        bestCase={task.bestCase}
                                        probableCase={task.probableCase}
                                        worstCase={task.worstCase}
                                        onDelete={() => this.removeRow(i)}
                                        onUpdate={(name, value) => {
                                            this.onRowUpdate(i, name, value)
                                        }}
                                    />
                                );
                            })}
                            <TableRow>
                                <TableCell align="right" colSpan={6}>
                                    <strong>{averageTotal}</strong>
                                </TableCell>
                                <TableCell align="right" padding="dense">
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                <Fab className="addRow" size="small" color="primary" aria-label="Add" onClick={this.props.addTask}>
                    <AddIcon/>
                </Fab>
                <pre>{JSON.stringify(addOns, null, 4)}</pre>
            </div>
        );
    }

}