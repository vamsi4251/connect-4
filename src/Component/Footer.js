import React from 'react'
import {
  GAME_STATE_PLAYING,

} from '../Constants.js'

const Fotter = ({onNewGameClick,onSuggestClick,gameState}) => {
  const renderButtons = () =>{
    if(gameState === GAME_STATE_PLAYING){
      return <button onClick={onSuggestClick}>Suggest</button>
    }
    return  <button onClick={onNewGameClick}>New Game</button>
  }
  return (
    <>
    <div className="fotter panel">
        {renderButtons()}
    </div>
    </>
  )
}

export default Fotter