import React from 'react'
import style from './../css/login.scss'
import {
    Appstate
} from './Appstate.js'
import {
    observer
} from 'mobx-react';

export default @observer class PrivatePanel extends React.Component {

    render() {
        console.log('render')
        let listContent
        if (!Appstate.to) {
            listContent = Appstate.messages.slice()
        } else {
            listContent = Appstate.privateMessage.get(Appstate.to)||[]
        }
        return (
            <ul id='messages' className={style.messages}>{listContent.map((elem,index) => {
                if(elem.username==Appstate.username){
                    return <li key={index} className={style.selfBubble}><strong>{elem.username}</strong> <span>{elem.msg}</span></li>

                }else{
                    return <li key={index} className={style.otherBubble}><strong>{elem.username}</strong> <span>{elem.msg}</span></li>

            }
        })}</ul>
        )
    }
}
