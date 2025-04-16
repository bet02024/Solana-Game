import React from 'react'
import BetaSVG from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_BETA.svg'
const LoadingDice = () => {
  return (
    <div className="loading-dice-container">
      <div className='loading-dice-shadow' />
      <img className='loading-dice' src='/assets/gif/RENDER 20220827 - LBDH dado idle 11 v02.gif' alt="" />
      <BetaSVG className='loading-dice-beta' style={{ width: 100 }}/>
    </div>
  )
}

export default LoadingDice