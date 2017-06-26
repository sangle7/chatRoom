import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login.js'
import Toast from './toast.js'
import InputForm from './inputForm.js'
import MainPanel from './mainPanel.js'
import {
    Appstate
} from './Appstate.js'
import {
    observer
} from 'mobx-react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import {
    List,
    ListItem
} from 'material-ui/List';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

 @observer  class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

    render() {
       var data = Appstate.onlineList.slice()
        return (
        	<MuiThemeProvider>
          <div>
          <Login/>
           <AppBar
    title="ChatRoom"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    onLeftIconButtonTouchTap={this.handleToggle}
  />
  <Drawer open={this.state.open} onRequestChange={(open) => this.setState({open})} docked={false}>
  <List>
  <ListItem>See Who Is Online</ListItem>
  <Divider />
         {data.map((elem, index) => {
                    return <ListItem key={index} primaryText={elem}/>
                })}
    </List>
        </Drawer>
          <Toast/>
          <MainPanel/>
          <InputForm/></div></MuiThemeProvider>
          )
    }
}


ReactDOM.render(<Main />,document.getElementById('root'))