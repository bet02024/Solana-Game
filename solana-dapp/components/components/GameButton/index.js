import React from 'react'

const GameButton = ({text = '',onClick = () => {}, className = '', style = {}}) => {
  return (
    <button
      onClick={onClick}
      className={`game-button ${className}`}
      style={style}
      >
        {text}
    </button>
  )
}

export default GameButton