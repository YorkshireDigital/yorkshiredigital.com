import React, { Component, PropTypes } from 'react';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

class RegisterForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.object
  }

  render() {
    const { fields: { username, email, password }, handleSubmit, submitting, error } = this.props;

    const usernameError = username.error || error && error.username;
    const emailError = email.error || error && error.email;
    const passwordError = password.error || error && error.password;
    const globalError = error && error.global;

    return (
    <form onSubmit={handleSubmit}>
      <Card zDepth={2}>
        <CardHeader title="Register" />
        <CardText>
          <TextField floatingLabelText="Username" name="username" hintText="joebloggs" {...username}
            errorText={username.touched && usernameError ? usernameError : ''}
          />
          <TextField floatingLabelText="Email" name="email" hintText="joe@bloggs.com" {...email}
            errorText={email.touched && emailError ? emailError : '' }
          />
          <TextField floatingLabelText="Password" name="password" type="password" {...password}
            errorText={password.touched && passwordError ? passwordError : ''}
          />
          { globalError && <p style={{ color: '#f44336' }}>{globalError}</p>}
          </CardText>
        <CardActions>
          { submitting && <RaisedButton label="Register" disabled fullWidth type="submit" /> }
          { !submitting && <RaisedButton label="Register" primary fullWidth type="submit" /> }
        </CardActions>
      </Card>
    </form>
    );
  }
}
export default RegisterForm;
