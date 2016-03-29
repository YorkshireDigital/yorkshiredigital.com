import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import { register } from '../actions/authActions';
import { validateRegister } from '../validation/authValidation';

class Register extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    validationErrors: PropTypes.object
  }

  _onSubmit(props) {
    this.props.register(props);
  }

  render() {
    const { fields: { username, email, password }, handleSubmit, isLoading, validationErrors } = this.props;

    const usernameError = username.error || validationErrors && validationErrors.username;
    const emailError = email.error || validationErrors && validationErrors.email;
    const passwordError = password.error || validationErrors && validationErrors.password;

    return (
    <form onSubmit={handleSubmit(this._onSubmit.bind(this))}>
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
          </CardText>
        <CardActions>
          {isLoading &&
            <RaisedButton label="Register" disabled fullWidth type="submit" />
          }
          {!isLoading &&
            <RaisedButton label="Register" primary fullWidth type="submit" />
          }
        </CardActions>
      </Card>
    </form>
    );
  }
}

const validate = (values) => {
  const errors = validateRegister(values.username, values.password, values.email);
  return errors || {};
};

function mapStateToProps(state) {
  const { auth } = state;
  const { isLoading, validationErrors } = auth;
  return { isLoading, validationErrors };
}

export default reduxForm({
  form: 'RegisterForm',
  fields: ['username', 'email', 'password'],
  validate
}, mapStateToProps, { register })(Register);
