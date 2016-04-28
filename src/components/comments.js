import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Comments extends Component {
  componentWillMount() {
    this.props.fetchComments();  
  }

  render() {
    return (
      <div>{this.props.message}</div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message}
}

export default connect(mapStateToProps, actions)(Comments);