import React, {useState, useEffect} from 'react';
import './feed.css';
import CreateIcon from '@material-ui/icons/Create';
import InputOption from './InputOption';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import Post from './Post';
import { db } from './firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';
import likeSound from './audio/like.mp3';
import unlikeSound from './audio/unlike.mp3';
import {Howl, Howler} from 'howler';

function Feed() {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser)

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
            setPosts(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ))
    }, [])

    const sendPost = e => {
        e.preventDefault();

        db.collection('posts').add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoURL || '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            liked: false
        })

        setInput('');
    }

    const likePost = (id) => {
        db.collection('posts').doc(id).update({
            liked: true
        })
        const sound = new Howl({
            src: likeSound
        })
        sound.play()
    }

    const unlikePost = (id) => {
        db.collection('posts').doc(id).update({
            liked: false
        })
        const sound = new Howl({
            src: unlikeSound
        })
        sound.play()
    }

    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                        <path d="M19 12h2v6a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3h6v2H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1zm4-8a2.91 2.91 0 01-.87 2l-8.94 9L7 17l2-6.14 9-9A3 3 0 0123 4zm-4 2.35L17.64 5l-7.22 7.22 1.35 1.34z"></path>
                    </svg>
                    <form>
                        <input placeholder="Start Post" value={input} onChange={e => setInput(e.target.value)} type="text"/>
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9"/>
                    <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E"/>
                    <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD"/>
                    <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7FC15E"/>
                </div>
            </div>
            <FlipMove>
                {posts.map(({id, data: { name, description, message, photoUrl, liked }}) => 
                    <Post key={id} id={id} name={name} description={description} message={message} photoUrl={photoUrl} liked={liked} onLike={likePost} onUnlike={unlikePost}/>
                )}
            </FlipMove>
        </div>
    )
}

export default Feed
