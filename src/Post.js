import { Avatar } from '@material-ui/core';
import React, {forwardRef} from 'react';
import InputOption from './InputOption';
import './post.css';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

const Post = forwardRef(({ id, name, description, message, photoUrl, liked, onLike, onUnlike }, ref) => {
    return (
        <div ref={ref} className="post">
            <div className="post__header">
                <Avatar src={photoUrl}>{name[0]}</Avatar>
                <div className="post__info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>
            <div className="post__body">
                <p>{message}</p>
            </div>

            <div className="post__buttons">
                {liked ? <div onClick={() => {onUnlike(id)}}><InputOption Icon={ThumbUpAltIcon} title="Like" color="#0a66c2"/></div> : <div onClick={() => {onLike(id)}}><InputOption Icon={ThumbUpAltOutlinedIcon} title="Like" color="gray"/></div>}
                <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray"/>
                <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray"/>
                <InputOption Icon={SendOutlinedIcon} title="Send" color="gray"/>
            </div>
        </div> 
    )
});

export default Post
