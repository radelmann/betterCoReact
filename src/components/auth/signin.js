import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Link } from 'react-router';

class Signin extends Component {
  handleFormSubmit({email, password}) {
    this.props.signinUser({email,password});
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
    const { handleSubmit, fields: {email, password} } = this.props;
    return (
      <div className="container form center">
        <h1 className="white">Triangle</h1>
        <p className="white">Chat with interesting people in your city</p>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          {this.renderAlert()}
          <fieldset className="form-group">
            <input {...email} className="form-control" placeholder="email" />
            <input {...password} type="password" className="form-control" placeholder="password" />
          </fieldset>
          <button action="submit" className="btn btn-primary">Sign In</button>
        </form>
        <p>
          <Link to="/signup">Create an Account</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form:'signin',
  fields: ['email','password']
}, mapStateToProps, actions)(Signin);