import React, { Dispatch, SetStateAction, useEffect, useState, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


import BetOneTwo from '../../../../public/assets/svg/LBDH_WEB_GRAPHIC_ONE_TWO.svg'
import BetOneOne from '../../../../public/assets/svg/LBDH_WEB_GRAPHIC_ONE_ONE.svg'
import BetFiveSix from '../../../../public/assets/svg/LBDH_WEB_GRAPHIC_FIVE_SIX.svg'
import BetSixSix from '../../../../public/assets/svg/LBDH_WEB_GRAPHIC_SIX_SIX.svg'

import DividerTop from '../../../../public/assets/svg/LBDH_WEB_GRAPHIC_DIVIDER TOP.svg'
import DividerBototm from '../../../../public/assets/svg/LBDH_WEB_GRAPHIC_DIVIDER BOTTOM.svg'

import { isJackpotOpen, showJackpotPercentage } from '../../../../config/config'
const jackpotDropdown = [
  { name: '---' },
  { name: '1 | 2' },
  { name: '5 | 6' },
  { name: '1 | 1' },
  { name: '6 | 6' },
]
const jackpotAmountDropdown = [
  { name: '0.01' },
  { name: '0.015' },
  { name: '0.025' }
]
interface props {
  setBetOptionJack: Dispatch<SetStateAction<number>>
  setBetAmountJack: Dispatch<SetStateAction<number>>
  multiplyValues: {
    left: number
    right: number
  }
  betAmountJack: number
  betOptionJack: number
}

// 50/50 x15 x30
// seven x18 x36

const JackpotBetSection = ({ setBetOptionJack, setBetAmountJack, multiplyValues = { 'left': 15, 'right': 30 }, betAmountJack, betOptionJack }: props) => {
  const [slider2, setSlider2] = useState(
    betAmountJack === 0.01
      ? "1"
      : betAmountJack === 0.015
        ? "2"
        : "3"
  )
  const [value, setValue] = useState(betAmountJack)
  const [sliderValuePosition, setSliderValuePosition] = useState(
    betAmountJack === 0.01
      ? 2
      :
      betAmountJack === 0.015
        ? 184
        : 363)

  const [selected, setSelected] = useState(
    betOptionJack === 3
      ? jackpotDropdown[1]
      : betOptionJack === 4
        ? jackpotDropdown[2]
        : betOptionJack === 1
          ? jackpotDropdown[3]
          : betOptionJack === 2
            ? jackpotDropdown[4]
            : jackpotDropdown[0]
  )
  const [selectedAmount, setSelectedAmount] = useState(
    betAmountJack === 0.01
      ? jackpotAmountDropdown[0]
      : betAmountJack === 0.015
        ? jackpotAmountDropdown[1]
        : jackpotAmountDropdown[2]
  )

  const [jackpotSelected, setJackpotSelected] = useState(betOptionJack)

  const onChangeSlider2 = (e: any) => {
    const value = e.target.value
    setSlider2(value)

    if (value === "1") {
      setBetAmountJack(0.01)
      setValue(0.01)
      setSliderValuePosition(2)
    }
    if (value === "2") {
      setBetAmountJack(0.015)
      setValue(0.015)
      setSliderValuePosition(184)
    }
    if (value === "3") {
      setBetAmountJack(0.025)
      setValue(0.025)
      setSliderValuePosition(363)
    }
  }

  const handleJackpotSelected = (option: number) => {
    if (option === jackpotSelected) {
      setJackpotSelected(0)
      setBetOptionJack(0)
    } else {
      setJackpotSelected(option)
      setBetOptionJack(option)
    }
  }

  const handleSelected = (selected: any) => {
    setSelected(selected)
    switch (selected.name) {
      case '---':
        setJackpotSelected(0)
        setBetOptionJack(0)
        break;
      case '1 | 2':
        setJackpotSelected(3)
        setBetOptionJack(3)
        break;
      case '5 | 6':
        setJackpotSelected(4)
        setBetOptionJack(4)
        break;
      case '1 | 1':
        setJackpotSelected(1)
        setBetOptionJack(1)
        break;
      case '6 | 6':
        setJackpotSelected(2)
        setBetOptionJack(2)
        break;

      default:
        break;
    }
  }
  const handleSelectedAmount = (selectedAmount: any) => {
    setSelectedAmount(selectedAmount)
    switch (selectedAmount.name) {
      case '0.01':
        setBetAmountJack(0.01)
        break;
      case '0.015':
        setBetAmountJack(0.015)
        break;
      case '0.025':
        setBetAmountJack(0.025)
        break;
      default:
        break;
    }
  }
  const _isJackpotOpen = isJackpotOpen()
  const _showJackpotPercentage = showJackpotPercentage()
  return (
    <div className="flex flex-col">
      {
        _isJackpotOpen
          ?
          <>
            <div className="flex flex-col items-center hidden lg:inline-flex">
              <div className="">
                <p className="jackpot-section-text">Bet for</p>
                <div className="flex flex-row mt-4 justify-center">
                  <div className="flex flex-col mr-5">
                    <div className="flex flex-row">
                      <BetOneTwo
                        onClick={() => handleJackpotSelected(3)}
                        className={`cursor-pointer bet-for-button mr-5 ${jackpotSelected === 3 ? 'bet-for-button-hover' : ''}`}
                      />
                      <BetFiveSix
                        onClick={() => handleJackpotSelected(4)}
                        className={`cursor-pointer bet-for-button ${jackpotSelected === 4 ? 'bet-for-button-hover' : ''}`}
                      />
                    </div>
                    <div className='flex flex-col items-center top-line mt-2'>
                      <p className='jackpot-section-text'>x{multiplyValues.left}</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className='flex flex-row'>
                      <BetOneOne
                        onClick={() => handleJackpotSelected(1)}
                        className={`cursor-pointer bet-for-button mr-5 ${jackpotSelected === 1 ? 'bet-for-button-hover' : ''}`}
                      />
                      <BetSixSix
                        onClick={() => handleJackpotSelected(2)}
                        className={`cursor-pointer bet-for-button ${jackpotSelected === 2 ? 'bet-for-button-hover' : ''}`}
                      />
                    </div>
                    <div className='flex flex-col items-center top-line mt-2'>
                      <p className='jackpot-section-text'>x{multiplyValues.right}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="slidecontainer mt-10 relative">
                <input type="range" min="1" max="3" value={slider2} onChange={onChangeSlider2} className="slider" id="myRange_jackpot" list="tickmarks_jackpot" />
                <datalist id="tickmarks_jackpot">
                  <option value="1" />
                  <option value="2" />
                  <option value="3" />
                </datalist>
                <div className="flex flex-row justify-between">
                  <p className="jackpot-section-text">0.01 SOL</p>
                  <p className="jackpot-section-text">0.025 SOL</p>
                </div>
                <div style={{ position: 'absolute', top: -21, left: sliderValuePosition }}>
                  <p className="slider-selected-value">{value}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-row w-full justify-center lg:hidden">
              <div className="flex flex-row items-center mr-20">
                <p className="jackpot-section-text mr-2">Bet for:</p>
                <Listbox value={selected} onChange={handleSelected}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative cursor-default jackpot-option w-18 py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate text-black ">{selected.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon
                          className="h-5 w-5 text-black"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options as="div" className="jackpot-options-container absolute max-h-60 w-full overflow-auto py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {jackpotDropdown.map((person, personIdx) => (
                          <Listbox.Option as="div"
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 flex flex-row justify-center w-full ${active ? 'jackpot-item-selected' : 'jackpot-item'
                              }`
                            }
                            value={person}
                          >
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                              {person.name}
                            </span>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                <p className="jackpot-section-text ml-2">
                  {
                    jackpotSelected > 0 &&
                    <>
                      x{jackpotSelected >= 3 ? multiplyValues.left : multiplyValues.right}
                    </>
                  }
                </p>
              </div>
              <div className="flex flex-row items-center">
                <p className="jackpot-section-text mr-2">Bet amount:</p>
                <Listbox value={selectedAmount} onChange={handleSelectedAmount}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative cursor-default jackpot-option w-18 py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate text-black ">{selectedAmount.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon
                          className="h-5 w-5 text-black"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options as="div" className="jackpot-options-container absolute max-h-60 w-full overflow-auto py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {jackpotAmountDropdown.map((person, personIdx) => (
                          <Listbox.Option as="div"
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 flex flex-row justify-center w-full ${active ? 'jackpot-item-selected' : 'jackpot-item'
                              }`
                            }
                            value={person}
                          >
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                              {person.name}
                            </span>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </>
          :
          _showJackpotPercentage.show
            ?
            <div className='flex flex-col items-center justify-center' style={{ height: 190 }}>
              <DividerTop style={{ width: '100%', height: 25 }} />
              <p className='responsibly-title text-center'>All Jackpot have been woon!</p>
              <p className='tutorial-subtitle mb-2'>Next Jackpot in...</p>
              <div
                className='jackpot-percentaje-bar'
                style={{
                  width: '100%',
                  backgroundColor: 'red'
                }}>
                <div
                  className='jackpot-percentaje-bar-real'
                  style={{
                    width: `${_showJackpotPercentage.percentaje}%`
                  }}
                />
              </div>
              <p className='tutorial-text mb-2'>{_showJackpotPercentage.percentaje} %</p>
              <DividerBototm style={{ width: '100%', height: 25 }} />
            </div>
            :
            <div className='flex flex-col items-center justify-center' style={{ height: 190 }}>
              <div></div>
              <p className='responsibly-title w-72 text-center'>Jackpot Bets are sporadically open in the Beta version.</p>
              <p className='tutorial-subtitle mt-2'>Keep Rolling!</p>
              <div></div>
            </div>
      }

    </div>
  )
}

export default JackpotBetSection