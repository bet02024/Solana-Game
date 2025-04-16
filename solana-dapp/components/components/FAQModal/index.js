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

const FAQModal = ({ isModalOpen = false, closeModal = () => { } }) => {
  Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.9)';
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <p className='responsibly-title'>What is Lucky Bastards Dice Roll?</p>
      <p className='responsibly-text'>Lucky Bastards Dice Roll is a smart contract that allows users to play Lucky 7 (Over 7, under 7, equals 7) as well as Double or Nothing (High or Low) with their Solana tokens.</p>

      <p className='responsibly-text mt-10'>Lucky 7 game odds are as follows:</p>
      <p className='responsibly-text'>Over 7 = 15/36 or 41.66% </p>
      <p className='responsibly-text'>Under 7 = 15/36 or 41.66% </p>
      <p className='responsibly-text'>Equals 7 = 6/36 or 16.68% </p>

      <p className='responsibly-text mt-10'>Double or nothing (50|50) game odds are follows:</p>
      <p className='responsibly-text'>High = 15/30 or 50%</p>
      <p className='responsibly-text'>Low = 15/30 or 50%</p>
      
      <p className='responsibly-text mt-10'>When playing Double or nothing, the smart contract will automatically re-roll if the sum of dice is equal to 7 and will do this until the sum of the dice result is not 7.</p>

      <p className='responsibly-text mt-10'>Each game has a 3.5% fee.</p>

      <p className='responsibly-text mt-10'>Lucky Bastard Dice Roll also allows users to play jackpot for a chance to multiply their Solana up to 36x. The jackpot odds depend on the main game’s odds either Lucky 7 or Double or nothing (50|50).</p>

      <p className='responsibly-text mt-10'>Lucky 7 Jackpot game odds</p>
      <p className='responsibly-text'>Dice roll 12 = 1/36 = 2.78%</p>
      <p className='responsibly-text'>Dice roll 2 = 1/36 = 2.78%</p>

      <p className='responsibly-text mt-10'>Dice roll 11 = 1/18 or 5.56%</p>
      <p className='responsibly-text'>Dice roll 3 = 1/18 or 5.56%</p>

      <p className='responsibly-text mt-10'>Double or Nothing Jackpot game odds</p>
      <p className='responsibly-text'>Dice roll 12 = 1/30 or 3.33%</p>
      <p className='responsibly-text'>Dice roll 2 = 1/30 or 3.33%</p>

      <p className='responsibly-text mt-10'>Dice roll 11 = 1/15 or 6.66%</p>
      <p className='responsibly-text'>Dice roll 3 = 1/15 or 6.66%</p>

      <p className='responsibly-title mt-20'>How do I know I can Trust LBDR?</p>

      <p className='responsibly-text mt-10'>The LBDH Team and LBDH community have aligned incentives for the game to have 0 HOUSE EDGE. This is achieved through payment multipliers offer in each main game and jackpot bets.</p>

      <p className='responsibly-text mt-10'>Lucky 7 winning multipliers:</p>
      <p className='responsibly-text'>Over 7 = x2.4 (More than double of nothing)</p>
      <p className='responsibly-text'>Under 7 = x2.4 (More than double of nothing)</p>
      <p className='responsibly-text'>Equals 7 = x6 (Way more than double of nothing)</p>

      <p className='responsibly-text mt-10'>Lucky 7 jackpot winning multipliers:</p>
      <p className='responsibly-text'>Dice roll 12 = (x36)</p>
      <p className='responsibly-text'>Dice roll 2 = (x36)</p>
      <p className='responsibly-text'>Dice roll 11 = (x18)</p>
      <p className='responsibly-text'>Dice roll 3 = (x18)</p>


      <p className='responsibly-text mt-10'>Double or nothing (50|50) winning multipliers:</p>
      <p className='responsibly-text'>High = x2</p>
      <p className='responsibly-text'>Low = x2</p>

      <p className='responsibly-text mt-10'>Double or nothing jackpot winning multipliers:</p>
      <p className='responsibly-text'>Dice roll 12 = (x30)</p>
      <p className='responsibly-text'>Dice roll 2 = (x30)</p>
      <p className='responsibly-text'>Dice roll 11 = (x15)</p>
      <p className='responsibly-text'>Dice roll 3 = (x15)</p>


      <p className='responsibly-text mt-10'>Our House and Fee wallets are all public and every transaction can be reviewed by anyone.</p>


      <p className='responsibly-title mt-20'>Where can I track transactions?</p>
      <p className='responsibly-text'>House Wallet: </p>
      <p className='responsibly-text'>Por definir</p>
      <p className='responsibly-text'>Fee Wallet: </p>
      <p className='responsibly-text'>Por definir</p>


      <p className='responsibly-title mt-20'>Where can I learn more?</p>
      <p className='responsibly-text'>Join us on discord, there will always be someone to help you out. <a href='https://discord.gg/dbTgUq2SG8' target='_blank' rel="noreferrer">https://discord.gg/dbTgUq2SG8</a></p>

      
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

export default FAQModal