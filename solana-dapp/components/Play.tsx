import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, Fragment, useMemo } from "react";
import { useProgram } from "../hooks/useProgram";
import * as anchor from "@project-serum/anchor";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Dialog, Transition } from '@headlessui/react';
import { db } from './firebase';
import { collection, onSnapshot, serverTimestamp, addDoc, query, limit, orderBy, Timestamp, where } from 'firebase/firestore';
import Home from '../components/Home'
import mixpanel  from 'mixpanel-browser';
import ConffetiComponent from './components/ConffetiComponent'

import LeftTopLine from '../public/assets/svg/LBDH_WEB_GRAPHIC_CORNER 1.svg'
import RightTopLine from '../public/assets/svg/LBDH_WEB_GRAPHIC_CORNER 2.svg'
import BottomLeftLine from '../public/assets/svg/LBDH_WEB_GRAPHIC_CORNER 3.svg'
import BottomRightLine from '../public/assets/svg/LBDH_WEB_GRAPHIC_CORNER 4.svg'
import MiddleLeft from '../public/assets/svg/LBDH_WEB_GRAPHIC_ORNAMENT LEFT.svg'
import MiddleLeftRight from '../public/assets/svg/LBDH_WEB_GRAPHIC_ORNAMENT RIGHT.svg'
import LineTop from '../public/assets/svg/LBDH_WEB_GRAPHIC_ORNAMENT TOP.svg'
import LineBottom from '../public/assets/svg/LBDH_WEB_GRAPHIC_ORNAMENT BOTTOM.svg'
import toast, { Toaster } from 'react-hot-toast';
import CloseButtonTicket from '../public/assets/svg/LBDH_WEB_GRAPHIC_CLOSE BUTTON.svg'
import TicketSVG from '../public/assets/svg/LBDH_WEB_GRAPHIC_TICKET.svg'
import SparkRightSVG from '../public/assets/svg/LBDH_WEB_GRAPHIC_SPARK RIGHT.svg'
import SparkLeftSVG from '../public/assets/svg/LBDH_WEB_GRAPHIC_SPARK LEFT.svg'

import BetaPopup from './components/BetaPopup'

const notify = () => toast.custom((t) => (
  <div
    className={`${t.visible ? 'animate-in fade-in' : 'animate-out fade-out'
      }
     max-w-xl w-full shadow-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 background-get-ticket py-1`}
  >
    <div className="flex-1 my-auto">
      <div className="flex items-center">
        <div className="flex-1 flex flex-row items-center justify-center">
          <SparkLeftSVG style={{ width: 20, height: 20 }} />
          <p className="text-get-ticket text-center mx-2">
            You just got a ticket! Keep rolling!
          </p>
          <SparkRightSVG style={{ width: 20, height: 20 }} />
        </div>
      </div>
    </div>
    <div className="flex my-auto mr-2">
      <CloseButtonTicket
        onClick={() => toast.remove(t.id)}
        className="text-white cursor-pointer"
        aria-hidden="true"
        style={{
          height: 20
        }}
      />
    </div>
  </div>
),{
  duration: Infinity
})


export interface recentPlay {
  id: string
  amount: number
  amountJack: number
  amountWon: string
  betOption: number
  betOptionJack: number
  date: number
  dice1: number
  dice2: number
  jackpot: boolean
  wallet: string
  winner: boolean
}


mixpanel.init('8ecc59580789805b7d536651fb4951ff', { debug: true });

const Play: NextPage = () => {
  const { program, wallet, connection, provider, balance } = useProgram();
  const [betAmount, setBetAmount] = useState(Number(0.05));
  const [betOption, setBetOption] = useState(-1);
  const [betAmountJack, setBetAmountJack] = useState(Number(0.01));
  const [betOptionJack, setBetOptionJack] = useState(0);
  const [dice1, setDice1] = useState(0);
  const [dice2, setDice2] = useState(0);
  const [account, setAccount] = useState("");
  const [statusInfo, setStatusInfo] = useState("Idle");
  const [gameMode, setGameMode] = useState(1)
  const [balanceWallet, setBalanceWallet] = useState(0);
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [userTickets, setUserTickets] = useState(0)

  const [recentPlays, setRecentPlays] = useState<recentPlay[]>([])

  const q = query(collection(db, 'seven'), orderBy('date', 'desc'), limit(20));

  useEffect(() => {

    onSnapshot(q, (snapshot) => {
      setRecentPlays(snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          amount: data.amount,
          amountJack: data.amountJack,
          amountWon: data.amountWon,
          betOption: data.betOption,
          betOptionJack: data.betOptionJack,
          date: data.date,
          dice1: data.dice1,
          dice2: data.dice2,
          jackpot: data.jackpot,
          wallet: data.wallet,
          winner: data.winner,
        }
      }))
    })
  }, [gameMode, balanceWallet, dice1, dice2, betOption, betAmount]);

  useEffect(() => {
    if(wallet) {
      getUserTickets()
    }
  }, [wallet]);

  const getUserTickets = async(showNotify = false) => {
    if(wallet) {
      const f = await fetch("/api/userRolls", {
        method: "POST",
        body: JSON.stringify({wallet:wallet.publicKey.toString()}),
      })
      const data = await f.json()
      if(data.tickets > userTickets && showNotify) {
        notify()
      }
      setUserTickets(data.tickets)
    }
  }




  useEffect(() => {
    setBalanceWallet(balance);
  }, [balance]);


  const fetchBalance = async () => {
    if (wallet) {
      const _balance = await connection.getBalance(wallet.publicKey);
      setBalanceWallet(_balance);
    }
  }

  const [gameStatus, setGameStatus] = useState({
    error: false,
    waitingDeposit: false,
    loadingGame: false,
    showResultGame: false,
    dice1: 1,
    dice2: 1,
    userRooled: 1,
    winner: false,
    jackpot: false,
    amountWining: "0",
    transactionDelay: false,
    tx: ''
  })

  const rollAgain = () => {
    setGameStatus({
      error: false,
      waitingDeposit: false,
      loadingGame: false,
      showResultGame: false,
      dice1: 0,
      dice2: 0,
      userRooled: 0,
      winner: false,
      jackpot: false,
      amountWining: "0",
      transactionDelay: false,
      tx: ''
    })
  }

  const play = async () => {
    if (gameMode === 1) {
      if (betOption > 2 || betOption === -1) {
        setStatusInfo("Please select +7, 7 or -7.");
        setShowErrorModal(true)
        return;
      }
    }
    if (gameMode === 2) {
      if (betOption < 3) {
        setStatusInfo("Please select high or low.");
        setShowErrorModal(true)
        return;
      }
    }

    if (betAmount < 0.05 || betAmount > 0.1) {
      setStatusInfo("Please enter a bet between 0.05 and 0.1 SOL.");
      setShowErrorModal(true)
      return;
    }
    if (betAmountJack < 0.01 || betAmountJack > 0.025) {
      setStatusInfo("Please enter a JackPot Bet between 0.01 and 0.025 SOL.");
      setShowErrorModal(true)
      return;
    }
    if (wallet && program && connection) {
      const amount = betAmount * anchor.web3.LAMPORTS_PER_SOL;
      const amountJack = betAmountJack * anchor.web3.LAMPORTS_PER_SOL;
      const data = {
        playerPublicKey: wallet.publicKey.toString(),
      };
      try {
        setStatusInfo("Generating a random seed");
        setGameStatus({
          ...gameStatus,
          waitingDeposit: true,
          transactionDelay: false,
          tx: ''
        })
        console.log("/start");
        const response = await fetch("/api/start", {
          method: "POST",
          body: JSON.stringify(data),
        });
        const rJson = await response.json();
        console.log("Start", program.programId.toString());
        setStatusInfo("#Confirm Transaction (user)");
        const setupTx = await program.rpc.setup(
          new anchor.web3.PublicKey(rJson.vendorAccountPDA),
          new anchor.BN(amount),
          new anchor.BN(amountJack),
          new anchor.BN(betOption),
          new anchor.BN(betOptionJack),
          new anchor.BN(rJson.userRandomSeed), {
          accounts: {
            seventy: rJson.sevenPDA,
            player: wallet.publicKey,
            vault: rJson.vsigner,
            systemProgram: anchor.web3.SystemProgram.programId,
          },
        });
        const latestBlockHash = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: setupTx,
        });
        console.log("setupTx: ",setupTx);
        setStatusInfo("TX id: \n https://solscan.io/tx/" + setupTx);
        let success1 = false;
        let counter1 = 0;
        while (!success1 || counter1 < 40) {
          try {
            const r = await fetch("/api/setup", {
              method: "POST",
              body: JSON.stringify({
                playTx: setupTx,
                playerPublicKey: wallet.publicKey.toString(),
                amount: amount,
                amountJack: amountJack,
                betOption: betOption,
                betOptionJack: betOptionJack,
              }),
            });
            let parseR = await r.json();
            counter1++;
            console.log("parseR: ", parseR);
            if(!parseR.error){
              success1 = true
            }else {
              await wait(500)
            }
          } catch(e) {
            setStatusInfo("Error " + new String(e));
          }
        }
        console.log("## Confirmed Transaction");
        fetchBalance();
        setStatusInfo("Rolling the dice ...");
        setGameStatus({
          ...gameStatus,
          loadingGame: true,
          waitingDeposit: false,
          transactionDelay: false,
          tx: ''
        })
        const dataPlay = {
          playerPublicKey: wallet.publicKey.toString(),
          amount: amount,
          amountJack: amountJack,
          betOption: betOption,
          betOptionJack: betOptionJack,
        };
        console.log("/play");
        console.log("## Rolling the dice");
        const responseData = await fetch("/api/play", {
          method: "POST",
          body: JSON.stringify(dataPlay),
        });
        let result = await responseData.json();
        let playTX1 = result.tx;
        console.log("##result:", result);
        let counter2 =0;
        if(result.code === 600) {
           setStatusInfo("Confirming TX:\n https://solscan.io/tx/" + result.tx);
          let success = false
          while (!success || counter2 < 40) {
            try {
              counter2++;
              if (counter2 > 3){
                setGameStatus({
                  ...gameStatus,
                  loadingGame: true,
                  waitingDeposit: false,
                  transactionDelay: true,
                  tx: playTX1
                });
              }
              const r = await fetch("/api/result", {
                method: "POST",
                body: JSON.stringify({
                  playTx: playTX1,
                  playerPublicKey: wallet.publicKey.toString(),
                  amount: amount,
                  amountJack: amountJack,
                  betOption: betOption,
                  betOptionJack: betOptionJack,
                }),
              });
              let parseR = await r.json();
              if(!parseR.error){
                result = parseR;
                success = true;
              } else {
                await wait(800)
              }
            } catch(e) {
              setStatusInfo("Error2 " + new String(e));
            }
          }
        }
        fetchBalance();
        const winner = result.result.finished.winner.toString();
        const winnerJack = result.result.finished.winnerJack.toString();
        setDice1(result.result.finished.dice1);
        setDice2(result.result.finished.dice2);

        setGameStatus({
          ...gameStatus,
          loadingGame: false,
          waitingDeposit: false,
          showResultGame: true,
          dice1: result.result.finished.dice1,
          dice2: result.result.finished.dice2,
          userRooled: Number(result.result.finished.dice1) + Number(result.result.finished.dice2),
          winner: winner === wallet.publicKey.toString(),
          jackpot: winnerJack === wallet.publicKey.toString(),
          amountWining: String(result.result.finished.amountWon / LAMPORTS_PER_SOL),
          transactionDelay: false,
          tx: ''
        });
        if (winner === wallet.publicKey.toString() || winnerJack === wallet.publicKey.toString()) setStatusInfo(`You WON! ` + String(result.result.finished.amountWon / LAMPORTS_PER_SOL) + " SOL");
        else setStatusInfo(`You lost :( sum = ` + (result.result.finished.dice1 + result.result.finished.dice2));

        const isPlaying5050 = betOption > 2
        const isPlayingSeven = betOption <= 2
        let jackpot_result = 0
        switch (betOptionJack) {
          case 1:
            jackpot_result = 2
            break;
          case 2:
            jackpot_result = 12
            break;
          case 3:
            jackpot_result = 3
            break;
          case 4:
            jackpot_result = 11
            break;
          default:
            break;
        }

        let distribution7 = 'no play'
        if (isPlayingSeven) {
          switch (betOption) {
            case 2:
              distribution7 = 'Over 7'
              break;
            case 0:
              distribution7 = 'Equals 7'
              break;
            case 1:
              distribution7 = 'Under 7'
              break;

            default:
              break;
          }
        }

        let distribution5050 = 'no play'
        if (isPlaying5050) {
          switch (betOption) {
            case 3:
              distribution5050 = 'high'
              break;
            case 4:
              distribution5050 = 'low'
              break;

            default:
              break;
          }
        }

        // TODO: cuando se debe mostrar?
        // notify()

        try {
          mixpanel.identify(wallet.publicKey.toString());
          mixpanel.people.set({ "wallet": wallet.publicKey.toString() });
          mixpanel.track('Result', {
            wallet: wallet.publicKey.toString(),
            userBet: {
              gameMode,
              betOption,
              amount: Number(amount / LAMPORTS_PER_SOL),
              amountJack: Number(amountJack / LAMPORTS_PER_SOL),
              betOptionJack,
              jackpot_choice: jackpot_result
            },
            gameResult: {
              dice1: Number(result.result.finished.dice1),
              dice2: Number(result.result.finished.dice2),
              userRooled: Number(result.result.finished.dice1) + Number(result.result.finished.dice2),
              winner: winner === wallet.publicKey.toString() ? 'win' : 'lose',
              jackpot: winnerJack === wallet.publicKey.toString() ? 'win' : 'lose',
              amountWining: Number(result.result.finished.amountWon / LAMPORTS_PER_SOL),
            },
            overall: {
              dice: Number(result.result.finished.dice1) + Number(result.result.finished.dice2)
            },
            jackpot_results: {
              result: jackpot_result,
            },
            jackpot_win_lose: winnerJack === wallet.publicKey.toString() ? 'win' : 'lose',
            isPlayingSeven,
            distribution7,
            lucky7: {
              'Over 7': betOption === 2 ? 1 : 0,
              'Equals 7': betOption === 0 ? 1 : 0,
              'Under 7': betOption === 1 ? 1 : 0,
            },
            isPlaying5050,
            distribution5050,
            fifty: {
              'high': betOption === 4 ? 1 : 0,
              'low': betOption === 3 ? 1 : 0,
            }
          });

          await addDoc(collection(db, "seven"), {
            date: Date.now(),
            wallet: wallet.publicKey.toString(),
            winner: winner === wallet.publicKey.toString(),
            jackpot: winnerJack === wallet.publicKey.toString(),
            amountWon: String(result.result.finished.amountWon / LAMPORTS_PER_SOL),
            dice1: result.result.finished.dice1,
            dice2: result.result.finished.dice2,
            amount: amount,
            amountJack: amountJack,
            betOption: betOption,
            betOptionJack: betOptionJack,
          });
          getUserTickets(true)
        } catch (err) {
          console.log(err)
        }
      } catch (error) {
        console.log(error);
        setStatusInfo("Something went wrong, please try again.");
        fetchBalance()
        setGameStatus({
          ...gameStatus,
          loadingGame: false,
          waitingDeposit: false,
          showResultGame: false,
          error: true,
          transactionDelay: false,
          tx: ''
        })
      }
    }
  };


  const wait = (milliseconds: number) =>{
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
  }

  const _setGameMode = (option: number) => {
    setGameMode(option)
    if (option === 1) {
      setBetAmount(0.05)
    }
    if (option === 2) {
      setBetAmount(0.05)
    }
  }

  const getBalance = useMemo(() => {
    let num = Number(balanceWallet / LAMPORTS_PER_SOL)
    //previene el redondeo de decimales
    var re = /^-?\d+(?:\.\d{0,3})?/ig;
    return re.exec(num.toString())
  }, [balanceWallet, LAMPORTS_PER_SOL]);
  return (
    <div className=' min-h-screen'>
      <BetaPopup />
      <ConffetiComponent
        startAnimation={gameStatus.showResultGame}
        jackpot={gameStatus.jackpot}
        winner={gameStatus.winner}
        show={gameStatus.showResultGame}
      />
      {
        (wallet && program && connection)
          ?
          (gameStatus.showResultGame || gameStatus.waitingDeposit || gameStatus.loadingGame) ?
            <>
              <h1 className='inline-block md:hidden absolute top-3 left-16 sol-title text-center z-10 mt-0 pt-0 text-4xl'>
                {getBalance} SOL
              </h1>
              <div className="inline-flex md:invisible absolute top-12 left-16 flex flex-row items-center">
                <p className="sol-title text-4xl mr-4">
                  {userTickets}
                </p>
                <TicketSVG className='' style={{ height: 30, width: 'auto' }} />
              </div>
              <h1 className='hidden md:inline-block absolute top-16 right-5 sol-title text-center z-10 mt-0 pt-0 text-4xl'>
                {getBalance} SOL
              </h1>
              <div className="hidden md:inline-flex absolute top-28 right-5 flex flex-row items-center">
                <p className="sol-title text-4xl mr-4">
                  {userTickets}
                </p>
                <TicketSVG className='' style={{ height: 30, width: 'auto' }} />
              </div>
            </>
            :
            <>
              <h1 className='absolute top-16 right-5 sol-title text-center z-10 mt-0 pt-0 text-4xl'>
                {getBalance} SOL
              </h1>
              <div className="absolute top-28 right-5 flex flex-row items-center">
                <p className="sol-title text-4xl mr-4">
                  {userTickets}
                </p>
                <TicketSVG className='' style={{ height: 30, width: 'auto' }} />
              </div>
            </>
          : null
      }
      <LeftTopLine className='pointer-events-none' style={{ position: 'fixed', left: 10, top: 10, width: '125px', }} />
      <RightTopLine className='pointer-events-none' style={{ position: 'fixed', right: 10, top: 10, width: '125px', }} />
      <BottomLeftLine className='pointer-events-none bottom-6 lg:bottom-12' style={{ position: 'fixed', left: 10, width: '125px', }} />
      <BottomRightLine className='pointer-events-none bottom-6 lg:bottom-12' style={{ position: 'fixed', right: 10, width: '125px', }} />
      <MiddleLeft className='pointer-events-none' style={{ position: 'fixed', left: -40, width: '75px', bottom: '50vh', }} />
      <MiddleLeftRight className='pointer-events-none' style={{ position: 'fixed', right: -40, width: '75px', bottom: '50vh', }} />

      <div className='flex items-center justify-center pointer-events-none' style={{ position: 'fixed', right: 0, left: 0, top: 20, zIndex: -1 }} >
        <LineTop className='pointer-events-none' style={{ width: '30vw' }} />
      </div>
      <div className='flex items-center justify-center pointer-events-none' style={{ position: 'fixed', right: 0, left: 0, bottom: 60, zIndex: -1 }} >
        <LineBottom className='pointer-events-none' style={{ width: '30vw' }} />
      </div>
      <Home
        recentPlays={recentPlays}
        betOption={betOption}
        betAmount={betAmount}
        betAmountJack={betAmountJack}
        betOptionJack={betOptionJack}
        gameStatus={gameStatus}
        rollAgain={rollAgain}
        gameMode={gameMode}
        setGameMode={_setGameMode}
        setBetAmount={setBetAmount}
        setBetOption={setBetOption}
        setBetAmountJack={setBetAmountJack}
        setBetOptionJack={setBetOptionJack}
        play={play}
      />

      <Transition appear show={showErrorModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => { setShowErrorModal(false) }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {statusInfo}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">

                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => { setShowErrorModal(false) }}
                    >
                      Ok
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* <div className="max-w-7xl mx-auto py-4 px-4  sm:px-6 lg:px-8"></div>
      <div className="flex justify-center">
        <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-16 dark:bg-gray-800 dark:border-gray-700 w-1/2">
          <div className="space-y-6 pb-3" >
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sev7n!</h5>
            <div>
              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Bet amount in SOL
              </label>

              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {dice1 > 0 ? "Dice one " + dice1 : ""}
              </label>

              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {dice2 > 0 ? "Dice two " + dice2 : ""}
              </label>
              <input
                type="number"
                id="amount"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                placeholder="0.1"
                step="0.1"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
              />
            </div>

            <div className="flex gap-2">

              <button
                className={`w-full text-white ${betOption === 1 ? "bg-blue-700" : "bg-gray-500"
                  } hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                onClick={() => setBetOption(1)}
              >
                Under Seven (2.4x)
              </button>
              <button
                className={`w-full text-white ${betOption === 0 ? "bg-blue-700" : "bg-gray-500"
                  } hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                onClick={() => setBetOption(0)}
              >
                Seven (6x)
              </button>
              <button
                className={`w-full text-white ${betOption === 2 ? "bg-blue-700" : "bg-gray-500"
                  } hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                onClick={() => setBetOption(2)}
              >
                Over Seven (2.4x)
              </button>
            </div>

            <div className="flex gap-2">
              <button
                className={`w-full text-white ${betOption === 3 ? "bg-blue-700" : "bg-gray-500"
                  } hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                onClick={() => setBetOption(3)}
              >
                Double or Nothing, Under Seven (2x)
              </button>
              <button
                className={`w-full text-white ${betOption === 4 ? "bg-blue-700" : "bg-gray-500"
                  } hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                onClick={() => setBetOption(4)}
              >
                Double or Nothing, Over Seven (2x)
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                id="amountJack"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                placeholder="0.1"
                step="0.1"
                value={betAmountJack}
                onChange={(e) => setBetAmountJack(Number(e.target.value))}
              />
            </div>

            <div className="flex gap-2">
              <button
                className={`w-full text-white ${betOptionJack === 1 ? "bg-blue-700" : "bg-gray-500"
                  } hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                onClick={() => setBetOptionJack(1)}
              >
                {betOption > 2 ? "JackPot 2 (30x)" : "JackPot 2 (36x)"}
              </button>
              <button
                className={`w-full text-white ${betOptionJack === 2 ? "bg-blue-700" : "bg-gray-500"
                  } hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                onClick={() => setBetOptionJack(2)}
              >
                {betOption > 2 ? "JackPot 12 (30x)" : "JackPot 12 (36x)"}
              </button>
              <button
                className={`w-full text-white ${betOptionJack === 3 ? "bg-blue-700" : "bg-gray-500"
                  } hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                onClick={() => setBetOptionJack(3)}
              >
                {betOption > 2 ? "JackPot 3 (15x)" : "JackPot 3 (18x)"}
              </button>
              <button
                className={`w-full text-white ${betOptionJack === 4 ? "bg-blue-700" : "bg-gray-500"
                  } hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                onClick={() => setBetOptionJack(4)}
              >
                {betOption > 2 ? "JackPot 11 (15x)" : "JackPot 11 (18x)"}
              </button>
            </div>


            <button
              onClick={() => play()}
              className={`w-full text-white  ${betAmount !== 0 ? "bg-blue-700" : "bg-gray-500"
                } focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              disabled={betAmount === 0}
            >
              Play
            </button>
          </div>
          <p className="block text-sm font-medium text-gray-900 dark:text-gray-300 mt-3">Status: {statusInfo}</p>
        </div>
      </div> */}
      <Toaster />
    </div>
  );
};

export default Play;
