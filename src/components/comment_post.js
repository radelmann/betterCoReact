import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { postComment, showModal, hideModal } from '../actions/index';
import { Link } from 'react-router';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class CommentPost extends Component {
  openModal() {
    this.props.showModal();
  }

  closeModal() {
    this.props.hideModal();
  }

  onSubmit(props) {
    this.props.hideModal();
    this.props.postComment(props);
  }

  getFieldClass(field) {
    return `form-group ${field.touched && field.invalid ? 'has-danger' : ''}`;
  }

  getFieldError(field) {
    return field.touched ? field.error : '';
  }

  render() {
    const { fields: {message}, handleSubmit, modal } = this.props;

    return (
      <div>
        <div>
          <Modal
            isOpen={modal}
            onRequestClose={this.closeModal.bind(this)}
            style={customStyles} >
            <button onClick={this.closeModal.bind(this)}>close</button>
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <div className={this.getFieldClass(message)}>
                  <textarea className="form-control" {...message}/>
                  <div className="text-help">
                    {this.getFieldError(message)}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </Modal>
        </div>
        <div className="compose-button-container">  
          <div className="compose-button" onClick={this.openModal.bind(this)}></div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.message) {
    errors.message = 'Enter a message.';
  }

  return errors;
}

function mapStateToProps(state) {
  return { modal: state.modal };
}

// connect first arg is mapStateToProps, 2nd is mapDispatchtoProps
// reduxForm: 1st arg is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'CommentPostForm',
  fields: ['message'],
  validate,
},mapStateToProps,{postComment, showModal, hideModal})(CommentPost);
