import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
const ProjectDetails = (props) => {
  //const id = props.match.params.id;

  console.log(props);

  const handleClick = () => {
    props.deletePost(props.post.id);
  };

  return (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Project Title - {props.post.title}</span>
          <p>{props.post.body}</p>
          <div className="center">
            <button className="btn grey" onClick={handleClick}>Delete Post</button>
          </div>
        </div>

        <div className="card-action gret lighten-4 grey-text">
          <div>Post by The hohoya33</div>
          <div>2nd September, 2am</div>
        </div>
      </div>
    </div>
  );
}
*/

class ProjectDetails extends Component {
  handleClick = () => {
    this.props.deletePost(this.props.post.id);
    this.props.history.push('/');
  }
  render() {
    console.log(this.props);

    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">Project Title - {this.props.post.title}</span>
            <p>{this.props.post.body}</p>
            <div className="center">
              <button className="btn grey" onClick={this.handleClick}>Delete Post</button>
            </div>
          </div>
          <div className="card-action gret lighten-4 grey-text">
            <div>Post by The hohoya33</div>
            <div>2nd September, 2am</div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;

  return {
    post: state.posts.find(post => post.id === id)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => { dispatch({ type: 'DELETE_POST', id: id }) }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);