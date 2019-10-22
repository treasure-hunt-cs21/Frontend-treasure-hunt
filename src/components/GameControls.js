import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.scss'

function GameControls(props) {
    return (
        <div className="controls-container">
            <button> Beep </button>
            <button> Boop </button>
            <button> Bop </button>
        </div>
    )
}

export default GameControls;