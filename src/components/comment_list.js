import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PostComment from './comment_post';
import { Link } from 'react-router';


class CommentList extends Component {
  componentWillMount() {
    this.props.fetchComments();  
  }

  renderList() {
    return this.props.comments.map((comment, i) => {
      return (
        <li className="comment" key={i}>
          <div className="font-bold">{comment.email}</div>
          <div className="message grey">{comment.message}</div>
        </li>
      );
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="comments">
            <a onClick={this.props.signoutUser}><span className="fa fa-arrow-left white"></span></a>
            <ul>
              {this.renderList()}
            </ul>
            <PostComment></PostComment>
          </div>
        </div>
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