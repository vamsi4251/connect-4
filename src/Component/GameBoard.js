import React, { useEffect, useState } from 'react'
import GameCircle from './GameCircle'
import '../Game.css';
import Header from './Header';
import Fotter from './Footer';
import { isDraw, isWinner, isComputerMove } from '../healper';

import {
  NO_PLAYER,
  player_1,
  player_2,
  No_CIRCLES,
  GAME_STATE_PLAYING,
  GAME_STATE_WIN,
  GAME_STATE_DRAW,

} from '../Constants.js'
const GameBoard = () => {

  const [gameBoard,setGameBoard] = useState(Array(16).fill(NO_PLAYER));
  const [currentPlayer,setCurrentPlayer] = useState(player_1);
  const [gameState,setGameState]=useState(GAME_STATE_PLAYING);
  const [winPlayer,setWinPlayer]=useState(NO_PLAYER);

  console.log(gameBoard)

  useEffect(()=>{
    initGame();
  },[])

  const initGame = () =>{
    console.log("initgame")
    setGameBoard(Array(16).fill(NO_PLAYER));
    setCurrentPlayer(player_1);
    setGameState(GAME_STATE_PLAYING);
  }

  const initBoard = () =>{
    const circles=[]
    for(let i=0; i<No_CIRCLES; i++){
      circles.push(renderCircle(i))
    }
    return circles;
  }

  const suggestMove = () =>{
    circleClicked(isComputerMove(gameBoard));
  }

  
  const circleClicked = (id) =>{
    console.log("circle clicked :" +id);

    if(gameBoard[id] !== NO_PLAYER) return;
    if(gameState !== GAME_STATE_PLAYING) return;

    if(isWinner(gameBoard,id,currentPlayer)){
      console.log("winner");
      setGameState(GAME_STATE_WIN);
      setWinPlayer(currentPlayer)
    }

    if(isDraw(gameBoard,id,currentPlayer)){
      setGameState(GAME_STATE_DRAW);
      setWinPlayer(NO_PLAYER);
    }


    setGameBoard(prev =>{
      return prev.map((circle,pos) => {
        if(id === pos) return currentPlayer
        return circle
      })
    })



    setCurrentPlayer(currentPlayer === player_1 ? player_2 : player_1)
    console.log(gameBoard)
  }

  const renderCircle= id =>{
    return  <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked} />
  }

  return (
    <>
    <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}/>
    <div className='gameBoard'>
      {initBoard()}
    </div>
    <Fotter onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState}/>
    </>
  )
}

export default GameBoard