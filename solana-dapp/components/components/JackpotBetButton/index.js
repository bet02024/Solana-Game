import React from 'react'

const JackpotBetButton = ({text = '',onClick = () => {}, className = ''}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <button
        onClick={onClick}
        className={`jackpot-bet-button`}>
        {text}
      </button>
      <p className='jackpot-section-text'><span className='font-bold'>Optional</span> Only for Degen Bastards!</p>
    </div>
  )
}

export default JackpotBetButton