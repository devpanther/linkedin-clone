import { Avatar } from '@material-ui/core';
import React, {forwardRef, useState, useEffect} from 'react';
import InputOption from './InputOption';
import './post.css';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { db } from './firebase';
import firebase from 'firebase';


const Post = forwardRef(({ id, name, description, message, photoUrl, onLike, onUnlike }, ref) => {
    const [liked, setliked] = useState(false);
    const [likeCount, setlikeCount] = useState('');

    useEffect(() => {
        let userID = firebase.auth().currentUser.uid;
        let x;
        
        db.collection('postLikes').doc(id).onSnapshot(docRef => {
            x = docRef.data()
            setliked(x[userID])
            setlikeCount(Object.keys(x).length)
        })
    }, [])

    var filter = message.replace(/(^|\W)(#[a-z\d][\w-]*)/ig, '$1<span>$2</span>');


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
                <p dangerouslySetInnerHTML={{__html: filter}}></p>
            </div>
            <div className="likeCount">
                <img style={{marginRight: '5px'}} src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt=""/>
                {likeCount}
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
