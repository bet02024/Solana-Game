import React from 'react'
import { recentPlay } from '../../../../Play'
import moment from 'moment'
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import EyeSvg from '../../../../../public/assets/svg/LBDH_WEB_GRAPHIC_DEFAULT AVATAR.svg'


const Row = ({ wallet, amount, date, winner, jackpot, betOption, betOptionJack, amountJack, dice1, dice2 }: recentPlay) => {
  const rolled = Number(amount / LAMPORTS_PER_SOL).toFixed(2)
  const rolledJackpot = Number((((betOptionJack > 0) ? amountJack : 0)) / LAMPORTS_PER_SOL).toFixed(2)
  const user = wallet.substring(0, 3)
  const time = moment(date).fromNow()
  let result = 'got rugged'
  const winnerWithSeven = (dice1 + dice2) === 7 && winner

  let jackpotMultiplier = ''
  if (winner) {
    result = (winnerWithSeven && winner) ? 'got a lucky 7!' : 'got lucky'
    switch (betOption) {
      case 0:
        result += ' x6'
        // Seven (6x)
        break;
      case 1:
        result += ' x2.4'
        // Under Seven (2.4x)
        break;
      case 2:
        result += ' x2.4'
        // Over Seven (2.4x)
        break;
      case 3:
        result += ' x2'
        // Double or Nothing, Under Seven (2x)
        break;
      case 4:
        result += ' x2'
        // Double or Nothing, Over Seven (2x)
        break;

      default:
        break;
    }
  }
  if (jackpot) {
    // 50/50 x15 x30
    if (betOption > 2) {
      switch (betOptionJack) {
        case 1:
          jackpotMultiplier = 'x30'
          break;
        case 2:
          jackpotMultiplier = 'x30'
          break;
        case 3:
          jackpotMultiplier = 'x15'
          break;
        case 4:
          jackpotMultiplier = 'x15'
          break;

        default:
          break;
      }
    }
    // seven x18 x36
    else {
      switch (betOptionJack) {
        case 1:
          jackpotMultiplier = 'x36'
          break;
        case 2:
          jackpotMultiplier = 'x36'
          break;
        case 3:
          jackpotMultiplier = 'x18'
          break;
        case 4:
          jackpotMultiplier = 'x18'
          break;

        default:
          break;
      }
    }
  }
  return (
    <>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-8'>
          <div className='flex flex-row w-full items-center'>
            <EyeSvg
              style={{ width: 20, height: 20 }}
            />
            <div className='recent-text-border-bottom ml-2 w-full'>
              <p className={`${winnerWithSeven ? 'recent-text-bold' : 'recent-text'} pb-0`}>
                {`Wallet (${user}) Rolled ${rolled} and`} <span className={winner ? 'font-bold' : ''}> {result}</span>
              </p>
            </div>
          </div>
        </div>
        <div className='recent-text-border-bottom col-span-4'>
          <p className='recent-text pb-0 text-center'>{time}</p>
        </div>
      </div>
      {
        jackpot &&
        <>
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-8'>
              <div className='flex flex-row w-full items-center'>
                <EyeSvg
                  style={{ width: 20, height: 20 }}
                />
                <div className='recent-text-border-bottom ml-2 w-full'>
                  <p className='recent-text-bold'>
                    {`Wallet (${user}) Rolled ${rolledJackpot} and won the JACKPOT ${jackpotMultiplier}`}
                  </p>
                </div>
              </div>
            </div>
            <div className='recent-text-border-bottom col-span-4'>
              <p className='recent-text pb-0 text-center'>{time}</p>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Row