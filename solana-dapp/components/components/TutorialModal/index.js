import React, { useState } from 'react'
import Modal from 'react-modal'
import ButtonGradient from '../ButtonGradient'
import { XMarkIcon } from '@heroicons/react/20/solid'
import ModalBackground from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_POP UP FRAME.svg'
import ModalBackgroundMobile from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_POP UP FRAME MOBIL.svg'


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0,0,0,1)',
    maxHeight: '100vh',
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center'
  },
};

const TutorialModal = ({ isModalOpen = false, closeModal = () => { } }) => {
  Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.9)';
  const [checked, setChecked] = useState(false)
  const [sttep, setSttep] = useState(1)

  const handleNextSttep = () => {
    if(sttep !== 4) {
      setSttep(sttep+1)
    } else {
      if(checked) {
        localStorage.setItem('showTutorial','false')
      }
      closeModal()
    }
  }

  const handleCloseModal = () => {
    if(checked) {
      localStorage.setItem('showTutorial','false')
    }
    closeModal()
  }

  return (
    <>
    {
      isModalOpen &&
      <>
        <ModalBackgroundMobile
            className='pointer-events-none sm:hidden'
            style={{
              position: 'fixed',
              width: '100vw',
              height: '90vh',
              zIndex: 1000,
            }}
          />
          <XMarkIcon
            onClick={handleCloseModal}
            className="text-white cursor-pointer top-28 right-14 sm:hidden"
            aria-hidden="true"
            style={{
              position: 'fixed',
              zIndex: 3,
              height: 25,
              zIndex: 1000
            }}
          />
        </>
    }
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <div
          className="relative flex flex-row modal-background"
          style={{
            width: 450,
            backgroundColor: '#0000'
          }}
        >
          <XMarkIcon
            onClick={handleCloseModal}
            className="text-white cursor-pointer hidden sm:inline-flex"
            aria-hidden="true"
            style={{
              position: 'absolute',
              zIndex: 3,
              top: 6,
              right: 6,
              height: 20
            }}
          />
          <ModalBackground
            className='pointer-events-none hidden sm:inline-flex'
            style={{
              position: 'absolute',
              width: 450,
              height: 450,
              zIndex: 2
            }}
          />
          <div className='flex flex-col justify-center sm:justify-between h-full pb-5 pt-20 sm:pt-5 w-full px-20 sm:px-10'>
            {
              sttep === 1 &&
                <div className='mt-4 '>
                  <p className='tutorial-title text-center'>Welcome you Lucky Bastard!</p>

                  <p className='tutorial-subtitle mt-2'>There are 2 types of game modes:</p>
                  <ul className='tutorial-text ml-5'>
                    <li>Lucky 7</li>
                    <li>50 | 50</li>
                  </ul>
                  <p className='tutorial-text'>You can switch between game modes any time.</p>

                  <p className='tutorial-subtitle mt-5'>Jakcpot Bets</p>
                  <p className='tutorial-text'>They are optional, and you can add them in any game mode.</p>
                </div>
            }
            {
              sttep === 2 &&
                <div className='mt-4 '>
                  <p className='tutorial-title text-center'>How to play Lucky 7</p>

                  <p className='tutorial-text mt-2'>You will roll 2 dice.</p>
                  <p className='tutorial-text'>Guess what the roll will be:</p>
                  <ul className='tutorial-text ml-5'>
                    <li>+ 7 (8 - 12)</li>
                    <li>- 7 (2 - 6)</li>
                    <li>7 = 7</li>
                  </ul>
                  <p className='tutorial-text mt-2'>If you guess it right, you win the multiplier!</p>
                </div>
            }
            {
              sttep === 3 &&
              <div className='mt-4 '>
                  <p className='tutorial-title text-center'>How to play 50 | 50</p>

                  <p className='tutorial-text mt-2'>You will roll 2 dice.</p>
                  <p className='tutorial-text'>Guess what the roll will be:</p>
                  <ul className='tutorial-text ml-5'>
                    <li>High (8 - 12)</li>
                    <li>Low (2 - 6)</li>
                  </ul>
                  <p className='tutorial-text'>If the roll is 7 = Auto-reroll until a result is not 7.</p>
                  <p className='tutorial-text mt-2'>If you guess it right, you win the multiplier!</p>
                </div>
            }
            {
              sttep === 4 &&
              <div className='mt-4 '>
                  <p className='tutorial-title text-center'>Jackpot Bets</p>
                  <p className='tutorial-title text-center' style={{fontSize: 12}}>These are optional: Only for degen bastards!</p>

                  <p className='tutorial-text mt-2'>You can add a jackpot Bet to guess if the sum of the dice will result in a specific number:</p>
                  <ul className='tutorial-text ml-5'>
                    <li>3 (1 | 2)</li>
                    <li>11 (5 | 6)</li>
                    <li>2 (1 | 1)</li>
                    <li>12 (6 | 6)</li>
                  </ul>
                  <p className='tutorial-text mt-2'>If you guess it right, you win the multiplier!</p>
                </div>
            }

            <div className='flex flex-col items-center justify-center w-full mt-20 sm:mt-0'>
              <ButtonGradient
                text={<p>{sttep === 4 ? 'Let´s Roll!' : 'Next'}</p>}
                onClick={handleNextSttep}
                style={{ width: 150, height: 35, fontSize: 16 }}
                className='flex justify-center items-center'
              />
              <div className='flex flex-row items-center justify-center mt-5'>
                <div className={`dot-tutorial mr-4 ${sttep >= 1 ? 'dot-tutorial-fill' : ''}`} />
                <div className={`dot-tutorial mr-4 ${sttep >= 2 ? 'dot-tutorial-fill' : ''}`} />
                <div className={`dot-tutorial mr-4 ${sttep >= 3 ? 'dot-tutorial-fill' : ''}`} />
                <div className={`dot-tutorial ${sttep >= 4 ? 'dot-tutorial-fill' : ''}`} />
              </div>
              <label className="checkbox-container mt-4">Don´t show next time
                <input type="checkbox" checked={checked} onClick={() => setChecked(!checked)} />
                  <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TutorialModal