import React from 'react'
import style from './../css/login.scss'
import {
    Appstate
} from './Appstate.js'
import {
    observer
} from 'mobx-react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default @observer class Login extends React.Component {
    handleClick() {
        document.getElementById('login').style.display = 'none'
        Appstate.setUserName(document.querySelector('input[name=username]').value)
    }

    render() {
        return (
            <div className={style.login} id='login'>
        <div className={style.loginForm}>
        <TextField name="username" style={{'fontSize':'30px','textAlign':'center'}}
      hintText="What's your name?" fullWidth={true}
    />
    <FlatButton  fullWidth={true} label="Enter Room" style={styleBut} primary={true} onClick={this.handleClick.bind(this)}/>
    </div>
    </div>
        )
    }
}

const styleBut = {
    fontSize: 20,
};
