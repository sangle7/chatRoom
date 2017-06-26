import React from 'react'
import style from './../css/login.scss'
import {
    Appstate
} from './Appstate.js'
import {
    observer
} from 'mobx-react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

export default @observer class Toast extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Snackbar
          open={Appstate.toastOpen}
          message={Appstate.toastMessage}
          autoHideDuration={2000}
        />
        );
    }
}
