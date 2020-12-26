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
import Modal from 'react-modal';
import { Avatar } from '@material-ui/core';

const customStyles = {
    content : {
      top                   : '40%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      padding               : '0',
      width                 : '37%',
      borderBottom          : '20px'
    }
  };
   
Modal.setAppElement('#root')

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


    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
 
    function closeModal(){
        setIsOpen(false);
    }

    const sendPost = e => {
        e.preventDefault();
        db.collection('posts').add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoURL || '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function(dataa){
            db.collection('postLikes').doc(dataa.id).set({
                
            })
        });
        setInput('');
        setIsOpen(false);
    }

    const likePost = (id) => {
        let userID = firebase.auth().currentUser.uid;
        console.log(userID)
        db.collection('postLikes').doc(id).update({
            [userID]: true
        })
        const sound = new Howl({
            src: likeSound
        })
        sound.play()
    }

    const unlikePost = (id) => {
        let userID = firebase.auth().currentUser.uid;
        console.log(userID)
        db.collection('postLikes').doc(id).update({
            [userID]: false
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
                    <form onClick={openModal}>
                        <input placeholder="Start Post" type="text"/>
                    </form>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="header__modal">
                        <h2>Create a post</h2>
                        <div onClick={closeModal} style={{cursor: 'pointer'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                          <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
                        </svg>
                        </div>
                    </div>
                    <div className="post__header__modal">
                        <Avatar src={user.photoURL}>{user.displayName[0]}</Avatar>
                        <div className="post__info__modal">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">
                                <path d="M5 4a3 3 0 113 3 3 3 0 01-3-3zm3.75 4h-1.5A2.25 2.25 0 005 10.25V15h6v-4.75A2.25 2.25 0 008.75 8z"></path>
                            </svg>
                            <h2>{user.displayName}</h2>
                        </div>
                        <div className="post__info__modal">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">
                                <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"></path>
                            </svg>
                            <h2>Anyone</h2>
                        </div>
                    </div>
                    <form>
                        <textarea value={input} onChange={e => setInput(e.target.value)} name="" id="" cols="30" class="type__in" rows="8" placeholder="What do you want to talk about?"></textarea>
                        <div class="post__others">
                            <div class="icon__post">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                                        <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                                        <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                                        <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                                        <path d="M3 3v15a3 3 0 003 3h9v-6h6V3zm9 8H6v-1h6zm6-3H6V7h12zm-2 8h5l-5 5z"></path>
                                    </svg>
                                </div>
                            </div>
                            {input.length > 2 ? <button class="submit" onClick={sendPost} type="submit">Send</button> : <button class="submit-greyed" disabled type="submit">Send</button>}
                        </div>
                    </form>
                </Modal>
                <div className="feed__inputOptions">
                    <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9"/>
                    <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E"/>
                    <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD"/>
                    <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7FC15E"/>
                </div>
            </div>
            <FlipMove>
                {posts.map(({id, data: { name, description, message, photoUrl }}) => 
                    <Post key={id} id={id} name={name} description={description} message={message} photoUrl={photoUrl} onLike={likePost} onUnlike={unlikePost}/>
                )}
            </FlipMove>
        </div>
    )
}

export default Feed
