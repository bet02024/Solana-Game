import React from 'react'
import ButtonGradient from '../ButtonGradient'
import LoadingDice from '../LoadingDice'

import YouWonSVG from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_YOU WON.svg'
import YouRolledLucky7SVG from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_LUCKY 7 WIN.svg'
import JackpotTitleSVG from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_JACKPOT WIN.svg'
import JackpotBackground from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_JP_FRAME.svg'
import JackpotBackgroundMobile from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_JP_FRAME_MOBIL.svg'
import BackgroundSvg from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_GRAPHIC 1.svg'

import Dice1 from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_DICE 1.svg'
import Dice2 from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_DICE 2.svg'
import Dice3 from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_DICE 3.svg'
import Dice4 from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_DICE 4.svg'
import Dice5 from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_DICE 5.svg'
import Dice6 from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_DICE 6.svg'

const dices = {
  1: <Dice1 style={{ height:230, width:230 }} />,
  2: <Dice2 style={{ height:230, width:230 }} />,
  3: <Dice3 style={{ height:230, width:230 }} />,
  4: <Dice4 style={{ height:230, width:230 }} />,
  5: <Dice5 style={{ height:230, width:230 }} />,
  6: <Dice6 style={{ height:230, width:230 }} />,
}

const ResultGame = ({ rollAgain, resultGame }) => {

  const { dice1, dice2, userRooled, winner, jackpot, amountWining } = resultGame



  return (
    <div className='flex flex-col justify-center items-center min-h-screen mt-5 sm:mt-0 w-full'>
      {
        jackpot ?
        <>
          <div style={{width:'100%', maxWidth: 600}} className='px-5' >
            <JackpotTitleSVG className='mb-5'/>
          </div>
          <JackpotBackground
            className='pointer-events-none hidden sm:inline-flex'
            style={{ 
              position: 'absolute', top: 0, bottom: 0, right: 0, left:0, zIndex: -1,
              width: '100vw',
              height: '90vh'
            }} />
          <JackpotBackgroundMobile
            className='pointer-events-none sm:hidden '
            style={{ 
              position: 'absolute', top: 0, bottom: 0, right: 0, left:0, zIndex: -1,
              width: '100vw',
              height: '100vh'
            }} />
        </>
        : 
        <>
          <BackgroundSvg className='pointer-events-none' style={{ position:'fixed', height: '100vh', width: '100vw', left:0, top:0, right:0, bottom:0 }} />
        </>
      }
      {
        (winner && !jackpot && (userRooled !== 7)) && <YouWonSVG className='mb-5' style={{maxWidth: 300}} />
      }
      {
        (winner && !jackpot && (userRooled === 7)) && <YouRolledLucky7SVG className='mb-5' style={{maxWidth: 600}} />
      }
      <LoadingDice />
      <div className='flex flex-row items-center'>
        <div className='flex flex-col items-center'>
            <p className='dice-square-bottom-text'>Die 1</p>
            <div className='dice-square flex items-center justify-center'>
              { dices[dice1] }
            </div>

            <p className='dice-square-bottom-text mt-2'>Die 2</p>
            <div className='dice-square flex items-center justify-center'>
              { dices[dice2] }
            </div>
        </div>
        <p className='rolled-equals-text mx-2'>=</p>
        <div className='flex flex-col items-center'>
          <p className='you-rolled-text'>You rolled a:</p>
          <div className='big-dice-square flex items-center justify-center'>
            <p className='big-dice-square-text'>{userRooled}</p>
          </div>
        </div>

      </div>


      <div className='flex flex-col text-center'>
        <div className='flex flex-col items-center'>
          <div className='mt-5 text-center'>
            {
              (jackpot && !winner) &&
                <p className='big-dice-square-bottom-text mt-5'>You won the jackpot!</p>     
            }
            {
              (jackpot && winner) &&
                <p className='big-dice-square-bottom-text mt-5'>You won all bets!</p>     
            }
            {
              !jackpot &&
              <>
                {
                  winner
                    ?
                    <>
                      <p className='big-dice-square-bottom-text mt-5'>You won the main bet!</p>
                    </>
                    : <p className='big-dice-square-bottom-text'>Better luck next time you son of a dice!</p>
                }
              </>
            }
          </div>
        </div>
      </div>

      <p className='reward-text'>{amountWining} SOL</p>

      <ButtonGradient
        className='mt-2'
        onClick={rollAgain}
        style={{ maxWidth: 250 }}
        text='Roll Again!'
      />

    </div>
  )
}

export default ResultGame
