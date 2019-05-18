import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';

const ITEM_HEIGHT = 48;

export default class TimeTableRow extends React.Component {

    constructor(props) {
        super(props);
        this.handleClickOnDelete = this.handleClickOnDelete.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
    }

    handleClickOnDelete() {
        this.props.onRemoveRow();
    };

    onChangeData = name => event => {
        this.props.onUpdate(name, event.target.value);
    };

    render() {

        const {
            taskName,
            description,
            bestCase,
            probableCase,
            worstCase,
            onDelete
        } = this.props;

        const average = Math.round((Number(bestCase) + Number(probableCase) + Number(worstCase)) / 3);

        return (
            <TableRow>
                <TableCell>
                    <TextField
                        label="Task name"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={taskName}
                        onChange={this.onChangeData('name')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        label="Description"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={description}
                        onChange={this.onChangeData('description')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        label="Best (h)"
                        margin="normal"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={bestCase}
                        onChange={this.onChangeData('bestCase')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        label="Probable (h)"
                        margin="normal"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={probableCase}
                        onChange={this.onChangeData('probableCase')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        label="Worst (h)"
                        margin="normal"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={worstCase}
                        onChange={this.onChangeData('worstCase')}
                    />
                </TableCell>
                <TableCell align="right">
                    <strong>{average}</strong>
                </TableCell>
                <TableCell>
                    <IconButton
                        aria-label="Delete row"
                        onClick={onDelete}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    }

}