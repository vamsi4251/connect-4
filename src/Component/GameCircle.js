import React from 'react'
import '../Game.css';


const GameCircle = ({id,childern,className,onCircleClicked}) => {
  return (
    <div className={`gameCircle ${className}`} onClick={()=> onCircleClicked(id)}>
      {childern}
    </div>
  )
}

export default GameCircle