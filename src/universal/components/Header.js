import React, { cloneElement, Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { isAuthenticated, getCurrentUser } from '../utils/authHelper';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import FlatButton from 'material-ui/lib/flat-button';

/*
 * Main view colors.
 */
const colors = {
  white: '#FFFFFF',
  pink: '#D381C3',
  blue: '#6FB3D2',
  green: '#A1C659',
  darkGrey: '#2A2F3A',
  lightGrey: '#4F5A65'
};
/**
 * Main view styles.
 */
const styles = {
  base: {
    fontFamily: 'sans-serif',
    color: colors.white,
    padding: '10px 30px 30px',
    width: '380px',
    margin: '0 auto 10px',
    background: 'white'
  },
  link: {
    color: colors.white,
    textDecoration: 'none',
  },
  navLink: {
    fontFamily: 'sans-serif',
    color: colors.lightGrey,
    textDecoration: 'none',
    padding: '0 30px'
  },
  nav: {
    height: 20,
    width: '600px',
    margin: '10px auto 0',
    padding: '10px 30px 30px',
    color: 'white',
    textTransform: 'uppercase'
  },
  list: {
    display: 'inline-block',
    listStyle: 'none',
  },
  feature: {
    color: colors.pink,
  },
  github: {
    position: 'absolute',
    top: 0,
    right: 0,
    border: 0,
  },
  avatar: {
    borderRadius: '50%',
    width: 32,
    height: 32,
    margin: '0 2px 2px 0',
  },
};

/**
 * Main component
 */
class Header extends Component {
  static propTypes = {
    children: PropTypes.object,
    isAuthenticated: PropTypes.bool
  }

  render() {
    const loggedIn = isAuthenticated();
    const currentUser = getCurrentUser();

    return (
		<div>
      <div style={{ maxWidth: 960, marginLeft: 'auto', marginRight: 'auto' }}>
        <Toolbar style={{ background: colors.white }}>
          <ToolbarGroup firstChild float="left" >
            <Link to="/" activeClassName="active" style={{ background: 'url(sprite-global.svg) 0 0 no-repeat', width: 230, height: 70, margin: 10 }} />
          </ToolbarGroup>
          <ToolbarGroup lastChild float="right">
            {!loggedIn && <FlatButton label="Log in" containerElement={<Link to="/login" activeClassName="active" />} />}
            {!loggedIn && <FlatButton label="Register" containerElement={<Link to="/register" activeClassName="active" />} />}
            {loggedIn && currentUser && <FlatButton label={`@${currentUser.username}`} containerElement={<Link to="/account" activeClassName="active" />} />}
            {loggedIn && <FlatButton label="Log out" containerElement={<Link to="/logout" activeClassName="active" />} />}
          </ToolbarGroup>
        </Toolbar>
        <div style={styles.base}>
          { cloneElement(this.props.children, Object.assign({}, { styles, colors })) }
        </div>
      </div>
		</div>);
  }
}

export default Header;
