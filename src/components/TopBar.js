import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss'

const TopBar = props => {
    console.log(props)
        return (
            <div className="topbar-container">
               <h1 className="game-title">
                    Treasure Island
                </h1>
            </div>
        )
}


export default TopBar;