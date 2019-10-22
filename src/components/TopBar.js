import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss'

const TopBar = props => {
    console.log(props)
    // set props.where to about if this is the about page.
    // if (props.where === 'about') {
    //     return(
    //         <div className="topbar-container"> 
    
    //             <h1 className="game-title">
    //                 Treasure Island
    //             </h1>
    
    //             {/* <Link to={'/'}>Back to the Game</Link> */}
    //         </div>
    //     )
    // }

    // else {
        return (
            <div className="topbar-container">
               <h1 className="game-title">
                    Treasure Island
                </h1>
                {/* <Link to={'/about'}>About</Link> */}
            </div>
        )
}


export default TopBar;