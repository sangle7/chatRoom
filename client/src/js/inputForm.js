import React from 'react'
import style from './../css/login.scss'
import {
    Appstate
} from './Appstate.js'
import {
    observer
} from 'mobx-react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default @observer class InputForm extends React.Component {
    handleKeyup(e) {
        if (e.keyCode != 13) {
            Appstate.isTyping()
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        Appstate.sendMessage(document.getElementById('m').value)
        document.getElementById('m').value = '';
    }

    render() {
        return (
            <form className={style.inputForm} action="" onSubmit={this.handleSubmit.bind(this)}>
        <TextField id="m"
      floatingLabelText="Chat Here!" onKeyUp={this.handleKeyup.bind(this)} fullWidth={true}
    />
     <RaisedButton label="Send" primary={true} style={styleBut} onClick={this.handleSubmit.bind(this)}/>
    </form>
        )
    }
}


const styleBut = {
    margin: 12,
};
