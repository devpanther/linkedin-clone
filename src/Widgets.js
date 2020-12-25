import React from 'react';
import './widget.css';
import InfoIcon from '@material-ui/icons/Info';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function Widgets() {
    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon/>
            </div>
            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );

    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <InfoIcon/>
            </div>

            {newsArticle("Godstime Is Back", "Top News - 999 Readers")}
            {newsArticle("Coronavirus - Nigeria Updates", "Top News - 349 Readers")}
            {newsArticle("Coronavirus - Nigeria Updates", "Top News - 654 Readers")}
            {newsArticle("Tesla hits new highs", "Cars & Autos - 786 Readers")}
            {newsArticle("Bitcoin breaks $22k", "Crypto - 8798 Readers")}
            {newsArticle("Is Redux too good?", "Programming - 213 Readers")}
        </div>
    )
}

export default Widgets
