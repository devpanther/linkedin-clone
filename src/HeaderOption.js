import React from 'react';
import './HeaderOption.css';
import Avatar from '@material-ui/core/Avatar';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';

function HeaderOption({ avatar, title, Icon }) {
    const user = useSelector(selectUser);

    return (
        <div className="headerOption">
            {Icon && <Icon className="headerOption__icon"/>}
            {avatar && (
                <Avatar src={user?.photoURL} className="headerOption__icon" />
            )}
            <h3 className="headerOption__title">{title}</h3>
        </div>
    )
}

export default HeaderOption;