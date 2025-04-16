import React, { useState } from 'react'
import FAQModal from '../FAQModal'
import HowToPlayModal from '../HowToPlayModal'
import ResponsabilityModal from '../ResponsabilityModal'

const Footer = () => {
  const [showResponsabilityModal, setShowResponsabilityModal] = useState(false)
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false)
  const [showFAQModal, setShowFAQModal] = useState(false)
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <ResponsabilityModal isModalOpen={showResponsabilityModal} closeModal={() => setShowResponsabilityModal(false)} />
      <HowToPlayModal isModalOpen={showHowToPlayModal} closeModal={() => setShowHowToPlayModal(false)} />
      <FAQModal isModalOpen={showFAQModal} closeModal={() => setShowFAQModal(false)} />
      <div className='flex flex-row w-full place-content-center lg:place-content-between px-20 bg-navbar '>
        <div className='flex flex-row items-center'>
          <a className='footer-link' href='https://magiceden.io/' target='_blank'>
            <div className='w-5 h-5 mr-4 flex items-center justify-center'>
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 82.26 49.35"
                xmlSpace="preserve">
                <path d="M0.01,24.9c0-6.05,0-12.1,0-18.14c0-3,1.43-5.2,4.08-6.3c2.33-0.97,5.16-0.34,7.15,1.61
                                      C16.62,7.37,22.01,12.68,27.39,18c0.93,0.92,1.09,0.91,1.87-0.15C32.97,12.8,36.7,7.76,40.39,2.69c1.28-1.76,2.97-2.64,5.1-2.65
                                      c10.27-0.02,20.53-0.02,30.8,0c2.95,0.01,5.41,2.08,5.88,4.84c0.46,2.69-1.09,5.45-3.72,6.39c-0.8,0.29-1.7,0.38-2.56,0.38
                                      c-5.37,0.03-10.75,0.01-16.12,0.04c-0.49,0-0.97,0.25-1.46,0.38c0.22,0.46,0.37,0.98,0.69,1.35c1.8,2.16,3.65,4.27,5.47,6.42
                                      c2.78,3.29,2.79,6.38,0.12,9.57c-1.89,2.26-3.83,4.5-5.71,6.77c-0.26,0.31-0.37,0.76-0.54,1.14c0.43,0.14,0.86,0.39,1.29,0.39
                                      c5.6,0.03,11.2,0,16.79,0.03c2.3,0.01,4.08,1.09,5.18,3.08c1.96,3.55-0.85,8.1-5.08,8.31c-0.67,0.03-1.35,0.01-2.02,0.01
                                      c-8.89,0-17.78,0.03-26.67-0.03c-1.38-0.01-2.83-0.24-4.11-0.73c-2.93-1.13-4.14-4.26-2.64-7.02c1.24-2.28,2.77-4.43,4.29-6.55
                                      c2.24-3.13,4.57-6.2,6.88-9.28c0.44-0.59,0.48-1.06-0.01-1.64c-2.08-2.4-4.12-4.84-6.19-7.25c-0.8-0.93-1.05-0.91-1.8,0.09
                                      c-3.34,4.46-6.66,8.92-9.99,13.38c-0.27,0.36-0.59,0.69-0.82,1.07c-1.93,3.33-6.91,2.83-9.06,0.61c-3.28-3.4-6.69-6.67-10.05-10
                                      c-0.2-0.2-0.39-0.41-0.61-0.58c-0.58-0.43-1.03-0.24-1.1,0.48c-0.03,0.33-0.02,0.67-0.02,1.01c0,6.55,0.01,13.11-0.01,19.66
                                      c-0.01,3.35-2.3,6.2-5.43,6.85C3.44,50,0.03,47.28,0.01,43.46C-0.01,37.28,0.01,31.09,0.01,24.9z"
                />
              </svg>
            </div>
          </a>
          <a className='footer-link' href='https://twitter.com/LuckyBastardDH' target='_blank' rel="noreferrer">
            <div className='w-5 h-5 mr-4 flex items-center justify-center'>
              <svg version="1.1" id="Capa_1"
                xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60.56 49.35"
                xmlSpace="preserve" >
                <path d="M0,43.8c6.77,0.61,12.77-1.04,18.22-5.12c-5.69-0.51-9.48-3.38-11.6-8.69c1.9,0.23,3.65,0.26,5.5-0.23
                      c-7.46-1.91-10.07-8.55-9.74-12.34c1.68,0.85,3.42,1.41,5.49,1.46c-3.12-2.27-4.91-5.18-5.37-8.82c-0.35-2.72,0.2-5.3,1.6-7.75
                      c6.73,7.93,15.24,12.3,25.56,13c-0.04-1.25-0.15-2.43-0.12-3.61c0.15-5.08,4.07-9.96,9-11.22c4.62-1.18,8.68-0.14,12.15,3.14
                      c0.27,0.25,0.49,0.29,0.84,0.21c2.41-0.54,4.69-1.38,6.84-2.6c0.14-0.08,0.28-0.14,0.51-0.25c-0.42,1.46-1.07,2.72-2,3.79
                      c-0.93,1.06-1.99,1.99-2.98,2.96c2.21-0.26,4.4-0.92,6.54-1.8c0.04,0.05,0.09,0.1,0.13,0.15c-1,1.17-1.95,2.39-3.02,3.5
                      c-0.86,0.89-1.88,1.63-2.8,2.47c-0.19,0.17-0.34,0.49-0.34,0.73C54.4,25.6,49.34,35.91,38.9,43.43c-4.42,3.18-9.48,4.9-14.88,5.6
                      c-5.09,0.66-10.1,0.33-15.03-1.09c-3.09-0.89-6-2.21-8.73-3.92C0.2,43.98,0.15,43.92,0,43.8z"
                />
              </svg>
            </div>
          </a>
          <a className='footer-link' href='https://discord.gg/dbTgUq2SG8' target='_blank' rel="noreferrer">
            <div className='w-5 h-5 flex items-center justify-center'>
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 64.83 49.33" xmlSpace="preserve">
                <path d="M0,38.1c0-1.77,0-3.55,0-5.32c0.04-0.27,0.08-0.53,0.11-0.8c0.23-1.99,0.36-3.99,0.7-5.96
                                      c1.35-7.83,4.44-14.95,8.82-21.54c0.15-0.23,0.4-0.44,0.65-0.55c4.01-1.83,8.19-3.1,12.52-3.9c0.35-0.07,0.55,0.01,0.7,0.34
                                      c0.4,0.84,0.87,1.64,1.22,2.5c0.2,0.49,0.45,0.57,0.95,0.53c1.93-0.19,3.86-0.46,5.8-0.44c2.59,0.02,5.17,0.27,7.76,0.45
                                      c0.44,0.03,0.67-0.04,0.85-0.48c0.37-0.87,0.83-1.7,1.24-2.56c0.15-0.33,0.36-0.39,0.71-0.33c4.27,0.78,8.39,2.04,12.34,3.82
                                      c0.34,0.15,0.68,0.43,0.88,0.74c7.34,10.94,10.54,22.95,9.32,36.11c-0.02,0.24-0.17,0.53-0.36,0.67
                                      c-4.77,3.49-9.96,6.14-15.6,7.91c-0.42,0.13-0.61,0.02-0.82-0.31c-0.77-1.23-1.56-2.45-2.33-3.69c-0.3-0.48-0.54-0.99-0.8-1.48
                                      c1.84-0.88,3.61-1.74,5.4-2.6c-0.77-1.1-1.17-1.22-2.16-0.79c-7.18,3.11-14.61,4.05-22.33,2.65c-3.08-0.56-6.05-1.49-8.92-2.75
                                      c-0.25-0.11-0.61-0.24-0.81-0.14c-0.4,0.19-0.72,0.54-1.25,0.95c1.94,0.94,3.72,1.8,5.65,2.73c-1.14,1.8-2.25,3.53-3.35,5.27
                                      c-0.23,0.36-0.49,0.21-0.77,0.12c-5.57-1.77-10.72-4.37-15.43-7.83c-0.23-0.17-0.39-0.52-0.44-0.81C0.13,39.77,0.08,38.93,0,38.1
                                      z M49.13,27.08c-0.17-0.8-0.25-1.63-0.51-2.39c-1.4-4.09-6.15-5.4-9.16-2.55c-2.74,2.6-2.76,7.33-0.04,9.95
                                      c2.24,2.15,5.53,2.11,7.71-0.11C48.45,30.63,49.01,28.97,49.13,27.08z M27.64,27.04c-0.27-0.99-0.41-2.03-0.83-2.95
                                      c-1.74-3.86-6.41-4.66-9.22-1.63c-2.44,2.64-2.31,7.14,0.29,9.63c2.23,2.13,5.48,2.1,7.66-0.09
                                      C26.89,30.65,27.46,28.98,27.64,27.04z"
                />
              </svg>
            </div>
          </a>
        </div>
        <div className='flex flex-row place-content-around flex-1 hidden lg:inline-flex'>
          <p className='navbar-text cursor-pointer'>About</p>
          <p className='navbar-text cursor-pointer' onClick={() => setShowFAQModal(true)}>FAQ</p>
          <p className='navbar-text cursor-pointer' onClick={() => setShowResponsabilityModal(true)}>Roll Responsibly</p>
          <p className='navbar-text cursor-pointer' onClick={() => setShowHowToPlayModal(true)}>How to play</p>
          <a className='footer-link' href='https://mixpanel.com/public/Q731WuydtZJTuxZJp1tuze' target='_blank' rel="noreferrer">
            <p className='navbar-text cursor-pointer'>
              Stats
            </p>
          </a>
        </div>
        <div>
          <p className='navbar-text cursor-pointer hidden lg:inline-flex'>Top Streaks</p>
        </div>
      </div>
    </div>
  )
}

export default Footer