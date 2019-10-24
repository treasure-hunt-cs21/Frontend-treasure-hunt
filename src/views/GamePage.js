import React from 'react';
import TopBar from '../components/TopBar'
import Game from '../components/Game'

import './styles.scss'

const GamePage = () => {
    return(
        <div className="game-page">
            <TopBar where='game'/>
                <Game />
        </div>
    )
}

export default GamePage