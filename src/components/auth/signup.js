import React, {Component} from 'react';
import { reduxForm} from 'redux-form';
import * as actions from '../../actions';
import { Link } from 'react-router';

class Signup extends Component {
  handleFormSubmit({email, password}) {
    this.props.signupUser({email,password});
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops! </strong>{this.props.errorMessage}
        </div>
      )
    }
  }
  render() {
    const { handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
    return ( 
      <div id='signup' className="container form center">
        <h1 className="white">Create an Account</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <input  className="form-control" {...email} placeholder="email" />
            { email.touched && email.error && <div className="error">{email.error}</div> }
            <input className="form-control" {...password} type="password" placeholder="password" />
            { password.touched && password.error && <div className="error">{password.error}</div> }
            <input className="form-control" {...passwordConfirm} type="password" placeholder="password confirm" />
            { passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div> }
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign Up</button>
          <p>
            <Link to="/signin">Sign In Here</Link>
          </p>
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email.';  
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password.';  
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation.';  
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords do not match.';  
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form:'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);