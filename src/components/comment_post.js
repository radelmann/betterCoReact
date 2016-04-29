import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { postComment, showModal, hideModal, resetForm } from '../actions/index';
import { Link } from 'react-router';
import Modal from 'react-modal';

const customStyles = {
  overlay : {
    backgroundColor : 'rgba(75, 75, 75, .75)'
  },
  content : {
    border : 'none',
    background  : 'transparent'
  }
};

class CommentPost extends Component {
  openModal() {
    this.props.resetForm('CommentPostForm');
    this.props.showModal();
  }

  closeModal() {
    this.props.resetForm('CommentPostForm');
    this.props.hideModal();
  }

  onSubmit(props) {
    this.props.hideModal();
    this.props.postComment(props);
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
            <div className="close-form-container">
              <button className="transparent align-right white" onClick={this.closeModal.bind(this)}>X</button>
            </div> 
            <form className="post-form" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <div className="form-group">
                  <textarea className="form-control" {...message} rows="5" placeholder="what do you want to say?"/>
                  { message.touched && message.error && <div className="error">{message.error}</div> }
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

export default reduxForm({
  form: 'CommentPostForm',
  fields: ['message'],
  validate,
},mapStateToProps,{postComment, showModal, hideModal, resetForm})(CommentPost);
