import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Seven from './components/Game/Seven'
import G5050 from './components/Game/G5050'
import GameButton from './components/GameButton'
import LoadingDice from './components/LoadingDice'
import LoadingGame from './components/LoadingGame'
import ResultGame from './components/ResultGame'
import WaitingDeposit from './components/WaitingDeposit'
import ErrorDice from './components/ErrorDice'
import JackpotBetButton from './components/JackpotBetButton'
import ButtonGradient from './components/ButtonGradient'
import TutorialModal from './components/TutorialModal'

import LBDH_WEB_GRAPHIC_GRAPHIC_2 from '../public/assets/svg/LBDH_WEB_GRAPHIC_GRAPHIC 2.svg'
import { isJackpotOpen } from '../config/config'

interface props {
  gameMode: number
  betOption: number
  betAmount: number
  betAmountJack: number
  betOptionJack: number
  gameStatus: {
    error: boolean
    waitingDeposit: boolean
    loadingGame: boolean
    showResultGame: boolean
    dice1: number
    dice2: number
    userRooled: number
    winner: boolean
    jackpot: boolean
    amountWining: string
    transactionDelay: boolean
    tx: string
  }
  rollAgain: () => void
  setGameMode: (option: number) => void
  setBetAmount: Dispatch<SetStateAction<number>>
  setBetOption: Dispatch<SetStateAction<number>>
  setBetAmountJack: Dispatch<SetStateAction<number>>
  setBetOptionJack: Dispatch<SetStateAction<number>>
  play: () => {}
}

const Game = ({
  betOption,
  betAmount,
  betAmountJack,
  betOptionJack,
  rollAgain,
  gameStatus,
  gameMode,
  setGameMode,
  setBetAmount,
  setBetOption,
  setBetAmountJack,
  setBetOptionJack,
  play
}: props) => {
  const _isJackpotOpen = isJackpotOpen()
  const [isTutorialShow, setIsTutorialShow] = useState(false)

  const showModalTutorial = () => setIsTutorialShow(true)
  const closeModalTutorial = () => setIsTutorialShow(false)

  useEffect(() => {
    const showTutorial = localStorage.getItem('showTutorial')
    if (!showTutorial) {
      showModalTutorial()
    }
  }, [])

  const isPlaying5050 = betOption > 2
  const isPlayingSeven = betOption <= 2 && betOption >= 0

  let activeOpacity5050 = !isPlaying5050 && gameMode === 2
  let activeOpacitySeven = !isPlayingSeven && gameMode === 1

  if (!_isJackpotOpen) {
    activeOpacity5050 = false
    activeOpacitySeven = false
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mb-20 lg:mb-0">
      <TutorialModal
        isModalOpen={isTutorialShow}
        closeModal={closeModalTutorial}
      />
      {
        gameStatus.error
          ? <ErrorDice rollAgain={rollAgain} />
          : (gameStatus.waitingDeposit)
            ? <WaitingDeposit
              gameMode={betOption}
              gameValue={betAmount}
              jackpot={betAmountJack}
              jackpotSelected={betOptionJack}
            />
            : gameStatus.loadingGame
              ?
              <div className="px-10 mt-5">
                <div className="flex flex-col justify-center items-center">
                  <LoadingGame containerStyle={{ height: 'auto' }} />
                  {
                    gameStatus.transactionDelay &&
                    <div style={{maxWidth: 600}}>
                      <p className='waiting-text mb-3'>
                        Please don't close the window
                      </p>
                      <p className='you-rolled-text'>
                        You can always check the result in solscan.io by clicking <a className='you-rolled-text'
                        style={{color: 'rgb(220,209,141)'}} 
                        href={process.env.NEXT_PUBLIC_ENVIRONMENT === 'Mainnet' 
                        ? `https://solscan.io/tx/${gameStatus.tx}`
                        : `https://explorer.solana.com/tx/${gameStatus.tx}?cluster=devnet`
                      }
                        target='_blank' 
                        rel="noreferrer">here</a>
                      </p>
                    </div>
                  }
                </div>
              </div>
              : gameStatus.showResultGame
                ? <ResultGame rollAgain={rollAgain} resultGame={gameStatus} />
                :
                <>
                  <LBDH_WEB_GRAPHIC_GRAPHIC_2 className='pointer-events-none' style={{ position: 'fixed', height: '100vh', width: '100vw', zIndex: -1 }} />
                  <div className='flex flex-row items-center justify-center lg:hidden mb-10 relative w-full'>
                    <div className='flex flex-row items-center'>
                      <>
                        <GameButton
                          onClick={() => setGameMode(1)}
                          text='Lucky 7'
                          className={`hidden sm:inline-flex items-center my-5 ${gameMode === 1 ? ' game-button-hover' : ''}`}
                        />
                        <GameButton
                          onClick={() => setGameMode(1)}
                          text='Lucky 7'
                          className={`sm:hidden absolute left-5 z-10 top-28 items-center mt-10 ${gameMode === 1 ? ' game-button-hover' : ''}`}
                        />
                      </>
                      <LoadingDice />
                      <>
                        <GameButton
                          onClick={() => setGameMode(2)}
                          text='50 / 50'
                          className={`hidden sm:inline-flex items-center ${gameMode === 2 ? ' game-button-hover' : ''}`}
                        />
                        <GameButton
                          onClick={() => setGameMode(2)}
                          text='50 / 50'
                          className={`sm:hidden absolute right-5 z-10 top-28 items-center mt-10 ${gameMode === 2 ? ' game-button-hover' : ''}`}
                        />
                      </>
                    </div>
                  </div>
                  <div className='flex flex-row items-center hidden lg:inline-flex mb-5'>
                    <div className='flex flex-col mr-10'>
                      <GameButton
                        onClick={() => setGameMode(1)}
                        text='Lucky 7'
                        className={`my-5 ${gameMode === 1 ? ' game-button-hover' : ''}`}
                      />
                      <GameButton
                        onClick={() => setGameMode(2)}
                        text='50 / 50'
                        className={`${gameMode === 2 ? ' game-button-hover' : ''}`}
                      />
                    </div>
                    <div className="">
                      <LoadingDice />
                    </div>
                    <JackpotBetButton
                      text='Jackpot Bet'
                      className={`ml-10 ${activeOpacity5050 || activeOpacitySeven ? 'opacity-30 pointer-events-none' : ''}`}
                    />
                  </div>
                  <div className='mt-10 sm:mt-0' />
                  {
                    gameMode === 1 && (
                      <Seven
                        activeOpacity={activeOpacitySeven}
                        playGame={play}
                        setBetOption={setBetOption}
                        setBetAmount={setBetAmount}
                        setBetOptionJack={setBetOptionJack}
                        setBetAmountJack={setBetAmountJack}
                        betAmount={betAmount}
                        betOption={betOption}
                        betAmountJack={betAmountJack}
                        betOptionJack={betOptionJack}
                      />)
                  }
                  {
                    gameMode === 2 && (
                      <G5050
                        activeOpacity={activeOpacity5050}
                        setBetOption={setBetOption}
                        setBetAmount={setBetAmount}
                        setBetOptionJack={setBetOptionJack}
                        setBetAmountJack={setBetAmountJack}
                        betAmount={betAmount}
                        betOption={betOption}
                        betAmountJack={betAmountJack}
                        betOptionJack={betOptionJack}
                      />)
                  }
                  {
                    gameMode !== 0 &&
                    <ButtonGradient
                      onClick={play}
                      text='Roll the dice!'
                      style={{ maxWidth: 300 }}
                      className="mt-12"
                    />
                  }
                </>
      }

    </div>
  )
}

export default Game