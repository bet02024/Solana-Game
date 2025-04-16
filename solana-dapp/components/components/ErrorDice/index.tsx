import React from 'react'
import ButtonGradient from '../ButtonGradient'

import ErrorTitle from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_STUCK TEXT.svg'
import ErrorImage from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_LOST DICE.svg'
import BackgroundSvg from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_GRAPHIC 1.svg'

const ErrorDice = ({rollAgain = () => {}}) => {
  return (
    <div className="flex flex-col justify-center items-center w-fulll" style={{ height:'80vh', width:'90vw' }}>
      <BackgroundSvg className='pointer-events-none' style={{ position: 'fixed', height: '100vh', width: '100vw', left: 0, top: 0, right: 0, bottom: 0, zIndex: -1 }} />
      <ErrorTitle className='' style={{ maxHeight:90, maxWidth: 495 }} />
      <ErrorImage className='my-20' style={{ maxHeight:112, maxWidth: 294 }} />
      <ButtonGradient
        onClick={rollAgain}
        style={{ maxWidth: 300 }}
        text='Roll Again!'
      />
    </div>
  )
}

export default ErrorDice
