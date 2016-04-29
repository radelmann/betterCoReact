import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { postComment } from '../actions/index';
import { Link } from 'react-router';

class CommentPost extends Component {
  //context from react-router
  // static contextTypes = {
  //   router: PropTypes.object
  // };

  onSubmit(props) {
    this.props.postComment(props);
  }

  getFieldClass(field) {
    return `form-group ${field.touched && field.invalid ? 'has-danger' : ''}`;
  }

  getFieldError(field) {
    return field.touched ? field.error : '';
  }

  render() {
    const { fields: {message}, handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Post a new comment</h3>

          <div className={this.getFieldClass(message)}>
            <label>Message</label>
            <textarea className="form-control" {...message}/>
            <div className="text-help">
              {this.getFieldError(message)}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.message) {
    errors.title = 'Enter a message.';
  }

  return errors;
}

// connect first arg is mapStateToProps, 2nd is mapDispatchtoProps
// reduxForm: 1st arg is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'CommentPostForm',
  fields: ['message'],
  validate
},null,{postComment})(CommentPost);
