import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";
import { useProgram } from "../../../hooks/useProgram";
import { recentPlay } from "../../Play";
import ButtonGradient from "../ButtonGradient";
import LoadingDice from "../LoadingDice";
import RecentPlays from "./RecentPlays";
import LBDH_WEB_GRAPHIC_GRAPHIC from '../../../public/assets/svg/LBDH_WEB_GRAPHIC_GRAPHIC 2.svg'
interface props { 
  startGame: () => void
  recentPlays: recentPlay[]
}

const Home = ({startGame, recentPlays}: props) => {
  const { program, wallet, connection, provider, balance } = useProgram();
  return (
    <div className="px-10 mt-20">
      <LBDH_WEB_GRAPHIC_GRAPHIC className='pointer-events-none' style={{ position:'fixed', height: '100vh', width: '100vw' }} />
      <div className="flex flex-col justify-center items-center">
        <LoadingDice />
        <h1 className="home-title text-center">Are you ready to roll the dice?</h1>
        <div className="flex items-center mt-6">
          <div className="line w-16 mr-5" />
          <p className="home-subtitle">0% HOUSE EDGE</p>
          <div className="line w-16 ml-5" />
        </div>
        {
          (wallet && program && connection)
          ?
          <ButtonGradient
            onClick={startGame}
            text='Start rolling'
            style={{ width: 300 }}
            className='mt-12'
          />
          :
            <WalletMultiButton className="reset-this mt-12">
              <ButtonGradient
                onClick={() => {}}
                text={'Connect Wallet'}
                style={{ width: 300 }}
              />
            </WalletMultiButton>
        }
        {
          recentPlays.length > 0 &&
          <>
            <p className="home-recent-text mt-12 mb-5">Recent Plays</p>
            <RecentPlays
              recentPlays={recentPlays}
            />
          </>
        }
      </div>
    </div>
  )
}

export default Home
