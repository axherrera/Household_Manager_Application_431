import React from 'react';
import Alert from '@mui/material/Alert';
import { Collapse, Stack } from '@mui/material';

const ErrorAlerts = ({ alerts, setAlerts }) => {
    const handleCloseAlert = (alertIndex) => {
        setAlerts((prevAlerts) => {
            const updatedAlerts = [...prevAlerts];
            updatedAlerts[alertIndex].open = false;
            return updatedAlerts;
        });
    };

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            {
                alerts.map((alert, index) =>
                    <Collapse in={alert.open} key={index}>
                        <Alert key={index} onClose={() => handleCloseAlert(index)} severity={"error"}>{alert.message}</Alert>
                    </Collapse>)
            }
        </Stack>
    );
};

export default ErrorAlerts;