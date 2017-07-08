import React from 'react'
import style from './../css/login.scss'
import {
    Appstate
} from './Appstate.js'
import {
    observer
} from 'mobx-react';
import {
    List,
    ListItem
} from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default @observer class OnlineList extends React.Component {
    startPrivateTalk = (name) => {
        Appstate.changeTo(name)
        this.props.closeDrawer()
    }

    render() {
        var data = Appstate.onlineList.slice()
        return (
            <List>
  <ListItem onClick={this.startPrivateTalk.bind(this,'')}>Group Talk</ListItem>
  <Divider />
         {data.map((elem, index) => {
                    return <ListItem  onClick={this.startPrivateTalk.bind(this,elem)} key={index} primaryText={elem}/>
                })}
    </List>
        )
    }
}
