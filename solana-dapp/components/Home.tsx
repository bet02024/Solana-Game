import React, { Dispatch, SetStateAction, useState } from "react";
import { useProgram } from "../hooks/useProgram";
import { default as HomeC } from "./components/Home/Home"
// import WaitingDeposit from "../components/WaitingDeposit";
import Game from "./Game";
import { recentPlay } from "./Play";

interface props {
  recentPlays: recentPlay[]
  betOption: number
  betAmount: number
  betAmountJack: number
  betOptionJack: number
  gameMode: number
  rollAgain: () => void
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
  setGameMode: (option: number) => void
  setBetAmount: Dispatch<SetStateAction<number>>
  setBetOption: Dispatch<SetStateAction<number>>
  setBetAmountJack: Dispatch<SetStateAction<number>>
  setBetOptionJack: Dispatch<SetStateAction<number>>
  play: () => {}
}

const Home = ({
  recentPlays,
  betOption,
  betAmount,
  betAmountJack,
  betOptionJack,
  gameStatus,
  rollAgain,
  gameMode,
  setGameMode,
  setBetAmount,
  setBetOption,
  setBetAmountJack,
  setBetOptionJack,
  play
}: props) => {
  const { program, wallet, connection, provider, balance } = useProgram();
  const [isStartGame, setIsStartGame] = useState(false)
  const startGame = () => setIsStartGame(true)
  return (
    <>
      {
        !isStartGame || !(wallet && program && connection)
          ? <HomeC startGame={startGame} recentPlays={recentPlays} />
          : (
              <Game
                betOptionJack={betOptionJack}
                betOption={betOption}
                betAmount={betAmount}
                betAmountJack={betAmountJack}
                rollAgain={rollAgain}
                gameStatus={gameStatus}
                gameMode={gameMode}
                setGameMode={setGameMode}
                setBetAmount={setBetAmount}
                setBetOption={setBetOption}
                setBetAmountJack={setBetAmountJack}
                setBetOptionJack={setBetOptionJack}
                play={play}
              />
            )
      }
    </>
  )
}

export default Home
