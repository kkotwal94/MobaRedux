import React, {Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { withRouter } from 'react-router';
import classNames from 'classnames/bind';
//Material Ui stuff
import {
      IconButton,
      Drawer,
      Divider,
      RaisedButton,
      FlatButton,
      Paper} from 'material-ui';
import AppCanvas from 'material-ui/internal/AppCanvas';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem, MakeSelectable  } from 'material-ui/List'
import {Tabs, Tab} from 'material-ui/Tabs';

import Spacing from 'material-ui/styles/spacing';
import {white} from 'material-ui/styles/colors';

let SelectableList = MakeSelectable(List);

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state  = {
      open : false,
      leftNavOpen : false,
      renderTabs : true,
      tabIndex : null
    }    
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.setState({ tabIndex : this._getSelectedIndex()});
    let setTabsState = function() {
      this.setState({renderTabs: !(document.body.clientWidth <= 871)});
    }.bind(this);
    setTabsState();
    console.log(this.state.renderTabs);
    window.onresize = setTabsState;
  }

  componentWillReceiveProps(nextProps, nextContent) {
     this.setState({
      tabIndex: this._getSelectedIndex()
    });
  }
  //toggle left nav
  toggle = () => {
    this.setState({leftNavOpen: !this.state.leftNavOpen});
  }

  //opening our login dialog
  handleDialogOpen = () => {
    this.setState({open: true});
  }

  //closing our login dialog

  handleDialogClose = () => {
    this.setState({open: false});
  }

  //On the hamburger button click

  _onLeftIconButtonTouchTap = () => {
     console.log(this.refs.leftNav);
     this.refs.leftNav.toggle();
  }

  //On closing side nav
  handleClose = () => this.setState({leftNavOpen: false});

  //On handling left nav change
  handleChangeRequestLeftNav = (open) => {
    this.setState({
      leftNavOpen: open
    });
  }

  //get our selected index/tab

 _getSelectedIndex() {
    //console.log(this.context.history.isActive('/'));
    return this.props.router.isActive('/') ? '1' :
      this.props.router.isActive('/gallery') ? '2' : 
      this.props.router.isActive('/profile') ? '3' :
      this.props.router.isActive('/dashboard') ? '8' :
      this.props.router.isActive('/pitch') ? '7' :
      this.props.router.isActive('/about') ? '5' : '';
  }


  //for when we change tabs on our navbar
  _handleTabChange = (value, e, tab) => {
    //console.log(this.context.history);
    if(tab.props.route != '/login') {
      this.props.router.pushState(null, tab.props.route);
      this.setState({tabIndex: this._getSelectedIndex()});
    }
  }

  //method for handling logout
  _onLogout = () => {
 
  }

  //creating our tabs
  _getTabs() {


  let styles = {
      root: {
        backgroundColor: '#333',
        position: 'fixed',
        height: 64,
        top: 0,
        right: 0,
        zIndex: 4,
        width: '100%',
      },
      container: {
        position: 'absolute',
        right: (Spacing.desktopGutter/2) + 48,
        bottom: 0,
      },
      span: {
        color: white,
        left: 65,
        top: 18,
        position: 'absolute',
        fontSize: 26,
      },
      svgLogoContainer: {
        position: 'fixed',
        width: 300,
        left: Spacing.desktopGutter,
      },
      svgLogo: {
        width: 65,
        height: 65,
        backgroundColor: '#333',
        position: 'absolute',
        top: 0,
      },
      tabs: {
        width: 600,
        bottom:0
      },
      tab: {
        height: 64,
        backgroundColor: '#333'
      },

    };


     const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose} />,
    ];

    let renderedResult;
    let loggedIn = false
    let materialIcon = this.state.tabIndex !== '0' ? (
     <RaisedButton
        style={styles.svgLogoContainer}
        href="/">
        <img style={styles.svgLogo} />
        <span style={styles.span}>MobaRedux</span>
      </RaisedButton>) : null;

    if (loggedIn) {
    renderedResult = (
    
        <Paper zDepth={0}
             rounded={false}
             style={styles.root}
        >
          
      {materialIcon}

          <div style={styles.container}>
            <Tabs
              style={styles.tabs}
              value={this.state.tabIndex}
              onChange={this._handleTabChange}>
              <Tab
                value="8"
                label="DASHBOARD"
                style={styles.tab}
                route="/dashboard" />
                <Tab
                value="5"
                label="ABOUT"
                style={styles.tab}
                route="/about" />
            </Tabs>


          </div>

        </Paper>
      

    );
}

else {
  renderedResult = (
    
        <Paper zDepth={0}
             rounded={false}
             style={styles.root}
        >
          
            {materialIcon}

          <div style={styles.container}>
            <Tabs
              style={styles.tabs}
              value={this.state.tabIndex}
              onChange={this._handleTabChange}>
              <Tab
                value="8"
                label="DASHBOARD"
                style={styles.tab}
                route="/dashboard" />
                <Tab
                value="5"
                label="ABOUT"
                style={styles.tab}
                route="/about" />
            </Tabs>


          </div>

        </Paper>
      
    );
}
return (
      <div>
        {renderedResult}
      </div>

    );
}

  //Our appbar for when window width is too small
  _getAppBar() {
    let title =
      this.props.router.isActive('/dashboard') ? 'Dashboard' :
      this.props.router.isActive('/gallery') ? 'Gallery' : 
      this.props.router.isActive('/profile') ? 'Profile' :
      this.props.router.isActive('/pitch') ? 'Create Pitch' :
      this.props.router.isActive('/about') ? 'About' : '';
 
    let githubButton = (
      <IconButton
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}/>
    );

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.toggle}
          title={title}
          zDepth={0}
          iconElementRight={githubButton}
          style={{position: 'fixed', top: 0, backgroundColor: '#333'}}/>
      </div>);
  }




  render() { 
    let renderedresult;
    let loggedIn = false;
    let renderTabs = this.state.renderTabs;
    console.log(renderTabs);
    if(renderTabs == true){
    renderTabs = this._getTabs(); 
    }
    else {
      renderTabs = this._getAppBar();
    }

    let header = {

         root: { cursor: 'pointer',
          fontSize: 24,
          lineHeight: Spacing.desktopKeylineIncrement + 'px',
          backgroundColor: "#333",
          paddingLeft: Spacing.desktopGutter,
          marginBottom: 8 }
        };

    let dialogStyle = {

      root: {
        width: '100%'
      },

      mainDialog: {
        backgroundColor: "#2F2F2F"
      }

    };

    let title =
      this.props.router.isActive('/dashboard') ? 'Dashboard' :
      this.props.router.isActive('/gallery') ? 'Gallery' : 
      this.props.router.isActive('/profile') ? 'Profile' :
      this.props.router.isActive('/pitch') ? 'Create Pitch' :
      //this.context.history.isActive('/login') ? 'Login' : 
      this.props.router.isActive('/about') ? 'About' : '';


      if (loggedIn) {
      renderedresult = (
<Drawer width={200} docked = {false} open={this.state.leftNavOpen} onRequestChange={this.handleChangeRequestLeftNav}>
        <div style = {header.root}>
        200000Pitches
        </div>
          <SelectableList
            value = {this._getSelectedItem}
            onChange = {this.handleRequestChangeList}
          >
          
          <ListItem
            value="/"
            primaryText="Dashboard"/>

          <ListItem
            value="/gallery"
            primaryText="Gallery"/>

          <ListItem
            value="/profile"
            primaryText="Profile"/>

          <ListItem
            value="/pitch"
            primaryText="Pitch"/>

          <ListItem
            value="null"
            onClick = {this._onLogout}
            primaryText="Logout"/>

          <ListItem
            value="/about"
            primaryText="About"/>
          </SelectableList>
        </Drawer>

        );
    }

    else {
      renderedresult = (
        <Drawer width={200} docked = {false} open={this.state.leftNavOpen} onRequestChange={this.handleChangeRequestLeftNav}>
        <div style = {header.root}>
        20000Pitches
        </div>
          <SelectableList
            value = {this._getSelectedItem}
            onChange = {this.handleRequestChangeList}
          >
          
          <ListItem
            value="/"
            primaryText="Dashboard"/>

          <ListItem
            value="/gallery"
            primaryText="Gallery"/>

          <ListItem
            value="/login"
            primaryText="Login/Register"/>

          <ListItem
            value="/about"
            primaryText="About"/>
          </SelectableList>
        </Drawer>
        );
    }
 
    return (
      <div>
        {renderTabs}
        {renderedresult}
        <Dialog   
          bodyStyle={dialogStyle.mainDialog}
          contentStyle={dialogStyle.root}
          modal={false}
          onRequestClose={this.handleDialogClose}
          open={this.state.open}>
          
        </Dialog>
        </div>

    );
  };

  //get selected item
  _getSelectedItem = () => {
     return this.props.router.isActive('/') ? 'Dashboard' :
      this.props.router.isActive('/gallery') ? 'Gallery' : 
      this.props.router.isActive('/profile') ? 'Profile' :
      this.props.router.isActive('/pitch') ? 'Pitch' :
      this.props.router.isActive('/about') ? 'About' : '';
  }

   handleRequestChangeList = (event, value) => {
    if(value == "null") {
        this.setState({
        leftNavOpen: false,
      });
    }
    else {
        this.props.router.pushState(null, value);
        this.setState({
          leftNavOpen: false,
        });
    }
    
  }


}

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

Navigation = connect(mapStateToProps, { logOut })(Navigation);
export default withRouter(Navigation);
