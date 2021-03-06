import React from 'react'
import style from './../css/login.scss'
import {Appstate} from './Appstate.js'
import {observer} from 'mobx-react';

export default @observer class PrivatePanel extends React.Component {

    render() {
        let listContent
        if (!Appstate.to) {
            listContent = Appstate.messages
        } else {
            listContent = Appstate.privateMessage.get(Appstate.to)|| []
        }
        console.log(listContent)
        listContent=listContent.slice()
        console.log(listContent)
        return (
            <ul id='messages' className={style.messages}>{listContent.map((elem, index) => {
                    if (elem.username == Appstate.username) {
                        return <li key={index} className={style.selfBubble}>
                            <strong>{elem.username}</strong>
                            <span>{elem.msg}</span>
                        </li>

                    } else {
                        return <li key={index} className={style.otherBubble}>
                            <strong>{elem.username}</strong>
                            <span>{elem.msg}</span>
                        </li>

                    }
                })}</ul>
        )
    }
}
