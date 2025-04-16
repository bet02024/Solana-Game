import React, { useState } from 'react'
import Modal from 'react-modal'
import { XMarkIcon } from '@heroicons/react/20/solid'
import ModalBackground from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_T2E FRAME.svg'
import Test2Earn from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_TEST2EARN.svg'
import Prizes from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_PRIZES.svg'
import NFTPrizesSVG from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_NFT PRIZES.svg'
import DiceRolling from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_DICE ROLLING.svg'


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0,0,0,0.9)',
    maxHeight: '100vh',
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center'
  },
};

const BetaPopup = () => {
  Modal.defaultStyles.overlay.backgroundColor = 'transparent';
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [checked, setChecked] = useState(false)

  const closeModal = () => setIsModalOpen(false)

  return (
    <>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div
          onClick={closeModal}
          className="flex flex-col items-center"
          style={{
            width: '100vw',
            minHeight: '100vh'
          }}
        >
          <div
          onClick={(e) => { e.stopPropagation()} }
           style={{
            width: 400
          }}>
            <div
              style={{
                width: 400,
                position: 'absolute', 
                top: 22
              }}
            >
              <XMarkIcon
              onClick={closeModal}
              className="text-white cursor-pointer"
              aria-hidden="true"
              style={{
                position: 'absolute',
                zIndex: 3,
                top: 2,
                right: 8,
                height: 30
              }}
            />
            </div>
            <div
              className="flex justify-center"
              style={{
                position: 'absolute',
                right:0,
                left:0,
                zIndex: -1,
              }}
            >
            <ModalBackground
              style={{
                width: 380,
                height: 930,
                backgroundColor: 'rgba(0,0,0,1)',
              }}
              className='pointer-events-none '
            />

            </div>
            <div className='flex flex-col h-full mb-5 mt-10 w-full w-full'>
              <div className='flex flex-col w-full items-center justify-center' >
                <Test2Earn style={{ width: 150 }} className='' />
                <p className='tutorial-title'>Win special NFT prizes!</p>
              </div>
              <div className='flex flex-row items-center justify-center mt-5'>
                <NFTPrizesSVG style={{width: 230}} />
              </div>
              <div className='px-16'>

                <p className='tutorial-title mt-10'>How to participate?</p>
                <p className='tutorial-text mt-5'>Roll 30 times = 1 Lottery Ticket</p>
                <p className='tutorial-text'>Roll 50 times = 2 Lottery Ticket</p>
                <p className='tutorial-text'>Roll 80 times = 3 Lottery Ticket</p>
                
                <p className='tutorial-text mt-5'>Each lottery ticket gives you an entry to win the NFTs.</p>
                <p className='tutorial-text'>At the end of the contest, we'll do a raffle between all ticket holders.</p>

                <p className='tutorial-text mt-5'>Winners will be announced in out discord and Twitter.</p>

                <p className='tutorial-title mt-10'>Start Rolling!</p>

                <div className='w-full relative'>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -80,
                      right: -30,
                    }}
                  >
                    <DiceRolling style={{ width: 120 }} />
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default BetaPopup