import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  ButtonBase,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useHistory } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <React.Fragment>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </React.Fragment>
    );
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component='span'
        name='test'
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={
            postMessage.selectedFile ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post.creator) && (
          <div className={classes.overlay2}>
            <Button
              className={classes.moreHorizBtn}
              size='small'
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontSize='medium' />
            </Button>
          </div>
        )}

        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>

        <Typography className={classes.title} variant='h5' gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>

        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post.creator) && (
          <Button
            size='small'
            color='secondary'
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
