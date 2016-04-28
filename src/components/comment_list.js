import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CommentList extends Component {
  componentWillMount() {
    this.props.fetchComments();  
  }

  render() {
    return (
      <div>comment list will go here</div>
    );
  }
}

export default connect(null, actions)(CommentList);