import React from 'react'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {hideSnackbar} from "../../Models/app/actions";

function Alert(props) {
    return <MuiAlert elevation={6} {...props} />;
}

export const AppSnackBar =  () => {
    const snackbar = useSelector(({app}) => app.snackbar)
    const dispatch = useDispatch()

    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => dispatch(hideSnackbar())}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
        >
            <Alert onClose={() => dispatch(hideSnackbar())} severity={snackbar.variant}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    )
}