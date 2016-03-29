import React, { Component, PropTypes } from 'react';
import Radium, { Style } from 'radium';
import DevTools from '../utils/DevTools';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.object
  }

  render() {
    return (
			<div>
				<Style rules={{
  'body, html': {
    margin: 0,
    padding: 0
  },
  '.active': {
    fontWeight: 900
  }

					}}
				/>
				{this.props.children}
				<DevTools />
			</div>
		);
  }
}

/**
 * Radium connect.
 */
AppContainer = Radium(AppContainer);

/**
 * Redux connect.
 */
export default AppContainer;
