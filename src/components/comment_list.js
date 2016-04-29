import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PostComment from './comment_post'

class CommentList extends Component {
  componentWillMount() {
    this.props.fetchComments();  
  }

  renderList() {
    return this.props.comments.map((comment, i)=> {
      return (
        <li className="list-group-item" key={i}>
          <div>{comment.email}</div>
          <div>{comment.message}</div>
        </li>
      );
    })
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.renderList()}
        </ul>
        <PostComment></PostComment>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}

export default connect(mapStateToProps, actions)(CommentList);