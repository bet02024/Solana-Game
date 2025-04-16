import React from 'react'

const ButtonGradient = ({text, style = {}, className = '', onClick}) => {
  return (
    <button
      onClick={onClick}
      className={`button-gradient ${className}`}
      style={style}
      >
      {text}
    </button>
  )
}

export default ButtonGradient