import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import HeaderOption from './HeaderOption';
import { useDispatch } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { auth } from './firebase';
import { logout } from './features/userSlice';
import AppsIcon from '@material-ui/icons/Apps';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';

function Header() {
    const dispatch = useDispatch();

    const logOutOfApp = () => {
        dispatch(logout());
        auth.signOut()
    }
    return (
        <div className="header">
            <div className="header__left">
                <img src="https://flaticon.com/svg/static/icons/svg/174/174857.svg" alt=""/>
                <div className="header__search">
                    <SearchIcon/>
                    <input placeholder="Search" type="text"/>
                </div>
            </div>
            <div className="header__right">
                 <HeaderOption Icon={HomeIcon} title="Home"/> 
                 <HeaderOption Icon={SupervisorAccountIcon} title="My Network"/> 
                 <HeaderOption Icon={BusinessCenterIcon} title="Jobs"/> 
                 <HeaderOption Icon={ChatIcon} title="Messaging"/> 
                 <HeaderOption Icon={NotificationsIcon} title="Notifications"/>
                 <div onClick={logOutOfApp}>
                    <HeaderOption avatar={true} title="Me"/>
                 </div>
                 <div style={{borderLeft: '1px solid lightgray', paddingRight: '20px'}}></div>
                 <HeaderOption Icon={AppsIcon} title="Work"/>
                 <HeaderOption Icon={TrackChangesIcon} title="Advertise"/>
            </div>
        </div>
    )
}

export default Header
