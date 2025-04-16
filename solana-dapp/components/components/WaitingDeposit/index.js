import React from 'react'

import LoadingGame from '../LoadingGame'

const WaitingDeposit = ({gameMode, gameValue, jackpot, jackpotSelected}) => {
  let _gameMode = ''
  switch (gameMode) {
    case 0:
      _gameMode = 'Seven' 
      break;
    case 1:
      _gameMode = 'Under Seven' 
      break;
    case 2:
      _gameMode = 'Over Seven' 
      break;
    case 3:
      _gameMode = 'Low' 
      break;
    case 4:
      _gameMode = 'High' 
      break;
  
    default:
      break;
  }

  let jackpotNumber = ''

  switch (jackpotSelected) {
    case 1:
      jackpotNumber = '2'
      break;
    case 2:
      jackpotNumber = '12'
      break;
    case 3:
      jackpotNumber = '3'
      break;
    case 4:
      jackpotNumber = '11'
      break;
  
    default:
      break;
  }

  return (
    <div className="px-10 mt-5">
      <div className="flex flex-col justify-center items-center">
        <LoadingGame containerStyle={{height: 'auto'}} />
        <p className="home-title">WAITING FOR</p>
        <p className="home-title">DEPOSIT...</p>
        <p className='waiting-text mt-5'>{_gameMode} for {gameValue} SOL</p>
        {
          jackpotSelected !== 0 && <p className='waiting-text'>Jackpot {jackpotNumber} for {jackpot} SOL</p>
        }
      </div>
    </div>
  )
}

export default WaitingDeposit
