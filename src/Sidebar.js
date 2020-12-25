import { Avatar } from '@material-ui/core';
import React from 'react';
import './Sidebar.css';
import {useSelector} from 'react-redux';
import { selectUser } from './features/userSlice'; 

function Sidebar() {
    const user = useSelector(selectUser);
    
    const recentItem = (topic) => (
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">#</span>
            <p>{topic}</p>
        </div>
    );
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="https://images.unsplash.com/photo-1608780841946-4e3b6827670b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=969&q=80" alt=""/>
                <Avatar src={user.photoURL} className="sidebar__avatar" />
                <h2>{user.displayName}</h2>
                <h4>{user.email }</h4>
            </div>

            <div className="sidebar__stats">
                 <div className="sidebar__stat">
                     <p>Who viewed you</p>
                     <p className="sidebar__statNumber">
                         2,600
                     </p>
                 </div>
                 <div className="sidebar__stat">
                    <p>Views on post</p>
                     <p className="sidebar__statNumber">
                         2,200
                     </p>
                 </div>
            </div>

            <div className="sidebar__bottom">
                <p>Recent</p>
                {recentItem("reactjs")}
                {recentItem('programming')}
                {recentItem('design')}
                {recentItem('developer')}
                {recentItem('softwareengineering')}
            </div>
        </div>
    )
}

export default Sidebar
