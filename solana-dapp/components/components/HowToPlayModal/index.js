import React from 'react'
import Modal from 'react-modal'
import ButtonGradient from '../ButtonGradient'


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(0,0,0)',
    maxHeight: '80vh',
    width: '100vw',
    maxWidth: '80vw',
  },
};

const HowToPlayModal = ({ isModalOpen = false, closeModal = () => { } }) => {
  Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.9)';
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <p className='responsibly-title mb-4'>How to play Lucky 7</p>
      <p className='responsibly-text'>You will roll 2 dice</p>
      <p className='responsibly-text'>Guess what the roll will be:</p>
      <p className='responsibly-text'>• + 7 (8 - 12)</p>
      <p className='responsibly-text'>• - 7 (2 - 6)</p>
      <p className='responsibly-text'>• = 7</p>
      <p className='responsibly-text mb-4'>If you guess it right, you win the multiplier!</p>
      
      <p className='responsibly-text'>-</p>
      <p className='responsibly-text'>1. Connect your Phantom Wallet. (Get Phantom @ <a href='https://phantom.app' target='_blank' rel="noreferrer" className='underline '>phantom.app</a>)</p>
      <p className='responsibly-text'>2. Select Lucky 7 as a game mode.</p>
      <p className='responsibly-text'>3. Pick either Over 7, Under 7 or Equals 7</p>
      <p className='responsibly-text'>4. Select your desires roll amount.</p>
      <p className='responsibly-text'>5. Click “Roll the dice!”.</p>
      <p className='responsibly-text'>6. Click approve and wait for dice to be rolled.</p>
      <p className='responsibly-text'>7. Congrats, you’re now a Lucky Bastard.</p>


      <p className='responsibly-title mt-10 mb-4'>How to play 50|50 (Double or Nothing)</p>

      <p className='responsibly-text'>You will roll 2 dice.</p>
      <p className='responsibly-text'>Guess what the roll will be:</p>
      <p className='responsibly-text'>• High ( 8 - 12)</p>
      <p className='responsibly-text'>• Low (2 - 6) If the roll is 7 = Auto-reroll until a result is not 7.</p>
      <p className='responsibly-text mb-4'>If you guess it right, you win the multiplier!</p>
      <p className='responsibly-text'>-</p>

      <p className='responsibly-text'>1. Connect your Phantom Wallet. (Get Phantom @ <a href='https://phantom.app' target='_blank' rel="noreferrer" className='underline '>phantom.app</a>)</p>
      <p className='responsibly-text'>2. Select 50|50 as a game mode.</p>
      <p className='responsibly-text'>3. Pick either High or Low</p>
      <p className='responsibly-text'>4. Select your desires roll amount.</p>
      <p className='responsibly-text'>5. Click “Roll the dice!”.</p>
      <p className='responsibly-text'>6. Click approve and wait for dice to be rolled.</p>
      <p className='responsibly-text'>7. Congrats, you’re now a Lucky Bastard.</p>

      <p className='responsibly-title mt-10'>How to play Jackpot Bets</p>

      <p className='responsibly-text mb-4'><span className='font-bold'>These are optional:</span> Only for Degen Bastards!</p>
      <p className='responsibly-text'>You can add a Jackpot Bet to guess if the sum of the dice will result in a specific number:</p>
      <p className='responsibly-text'>• 3 (1 | 2)</p>
      <p className='responsibly-text'>• 11 (5 | 6) </p>
      <p className='responsibly-text'>• 2 (1 | 1) </p>
      <p className='responsibly-text'>• 12 (6 | 6) </p>
      <p className='responsibly-text'>If you guess it right, you win the jackpot multiplier!</p>
      <p className='responsibly-text mb-4'>You can play to win a Jackpot while rolling the dice in any game mode, but you can’t play jackpot by itself.</p>
      <p className='responsibly-text'>-</p>

      <p className='responsibly-text'>1. Connect your Phantom Wallet. (Get Phantom @ <a href='https://phantom.app' target='_blank' rel="noreferrer" className='underline '>phantom.app</a>)</p>
      <p className='responsibly-text'>2. Select your desired game mode (Lucky 7 or 50|50)</p>

      <p className='responsibly-text'>3.1 If playing Lucky 7, pick either Over 7, Under 7 or Equals 7 </p>
      <p className='responsibly-text'>3.2 If playing 50|50, pick either High or Low.</p>

      <p className='responsibly-text'>4. Select your desires roll amount.</p>
      <p className='responsibly-text'>5. Now select a jackpot option, pick either 12, 2, 11, or 3.</p>
      <p className='responsibly-text'>6. Select your desires jackpot roll amount.</p>
      <p className='responsibly-text'>7. Click “Roll the dice!”.</p>
      <p className='responsibly-text'>8. Click approve and wait for dice to be rolled.</p>
      <p className='responsibly-text'>9. Congrats, you’re now a Lucky Bastard.</p>




      <p className='responsibly-title mt-20'>What is a Phantom Wallet?</p>
      <p className='responsibly-text'>Phantom wallet is a browser extension to manage your digital assets on the Solana blockchain network. Visit <a href='https://phantom.app' target='_blank' rel="noreferrer">phantom.app</a>, add the wallet to chrome or Firefox, and follow the instructions to create a wallet.</p>
      <p className='responsibly-text'><span className='font-bold'>How Do I fund my Phantom Wallet?</span></p>
      <p className='responsibly-text'>Use a central exchange such as Binance, FTX, or Coinbase to fund your wallet. Purchase Solana using fiat currency. Then withdraw Solana to your Phantom wallet. </p>

      
      <div className="flex flex-row items-center justify-center mt-5 mb-10">
        <ButtonGradient
          text='OK!'
          onClick={closeModal}
          style={{ width: 500 }}
        />
      </div>
    </Modal>
  )
}

export default HowToPlayModal