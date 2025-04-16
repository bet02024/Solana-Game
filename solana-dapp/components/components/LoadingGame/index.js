import React from 'react'

const DiceLoading = '/assets/gif/RENDER-20220908---LBDH-Loading-72-frames.gif'
import BackgroundSvg from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_GRAPHIC 1.svg'
const LoadingGame = ({ containerStyle = {} }) => {
  return (
    <div className="flex justify-center items-center" style={{ height: '80vh', ...containerStyle }}>
      <BackgroundSvg className='pointer-events-none' style={{ position: 'fixed', height: '100vh', width: '100vw', left: 0, top: 0, right: 0, bottom: 0, zIndex: -1 }} />
      <img className='' src={DiceLoading} alt="" style={{ height: 180, width: 320 }} />
    </div>
  )
}

export default LoadingGame