import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1>POSTS</h1>
      <Post />
      <Post />
    </React.Fragment>
  );
};

export default Posts;
