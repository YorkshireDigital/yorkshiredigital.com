import React, { Component, PropTypes } from 'react';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';

class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.object,
    submitting: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: { username, password },
      handleSubmit,
      error,
      submitting
    } = this.props;

    const usernameError = username.error || error && error.username;
    const passwordError = password.error || error && error.password;
    const globalError = error && error.global;

    return (
      <form onSubmit={handleSubmit}>
        <Card zDepth={2}>
          <CardTitle title="Social Log in" subtitle="Log in using one of these providers" />
          <CardActions>
            <RaisedButton label="Login with Twitter" primary fullWidth linkButton href="/auth/twitter" className="social-twitter" />
          </CardActions>
          <Divider />
          <CardTitle title="Log in" subtitle="Or log in using the details below" />
          <CardText>
            <TextField floatingLabelText="Username" name="username" hintText="joebloggs" {...username}
              errorText={username.touched && usernameError }
            />
            <TextField floatingLabelText="Password" name="password" type="password" {...password}
              errorText={password.touched && passwordError }
            />
            { globalError && <p style={{ color: '#f44336' }}>{globalError}</p>}
          </CardText>
          <CardActions>
            { submitting && <RaisedButton label="Login" disabled fullWidth type="submit" /> }
            { !submitting && <RaisedButton label="Login" primary fullWidth type="submit" /> }
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default LoginForm;
