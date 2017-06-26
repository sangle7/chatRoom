import React from 'react'
import style from './../css/login.scss'
import {
    Appstate
} from './Appstate.js'
import {
    observer
} from 'mobx-react';

export default @observer class MainPanel extends React.Component {


    render() {
        var listContent = Appstate.messages.slice()
        return (
            <ul id='messages' className={style.messages}>{listContent.map((elem,index) => {
            return <li key={index}>{elem}</li>
        })}</ul>
        )
    }
}
