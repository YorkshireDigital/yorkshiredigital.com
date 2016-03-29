import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';

import { login } from '../actions/authActions';
import { validateLogin } from '../validation/authValidation';

class Login extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    validationErrors: PropTypes.object
  }

  _onSubmit(props) {
    this.props.login(props);
  }

  render() {
    const { fields: { username, password }, handleSubmit, validationErrors } = this.props;

    const usernameError = username.error || validationErrors && validationErrors.username;
    const passwordError = password.error || validationErrors && validationErrors.password;

    return (
      <form onSubmit={handleSubmit(this._onSubmit.bind(this))}>
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
          </CardText>
          <CardActions>
            <RaisedButton label="Login" primary fullWidth type="submit" />
          </CardActions>
        </Card>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = validateLogin(values.username, values.password, values.email);
  return errors || {};
};

function mapStateToProps(state) {
  const { auth } = state;
  const { validationErrors } = auth;
  return { validationErrors };
}

export default reduxForm({
  form: 'RegisterForm',
  fields: ['username', 'password'],
  validate
}, mapStateToProps, { login })(Login);
