import 'typeface-roboto';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import './App.css';
import TimeEstimates from './components/TimeEstimates';


function App() {
    return (
        <div className="App">
            <Typography component="h1" variant="h2" gutterBottom>
                Time Estimates
            </Typography>
            <TimeEstimates/>
        </div>
    );
}

export default App;
