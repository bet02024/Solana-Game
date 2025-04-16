import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import JackpotBetButton from '../../JackpotBetButton'
import JackpotBetSection from '../JackpotBetSection'

import PlusSeven from '../../../../public/assets/svg/LBDH_WEB_GRAPHIC_PLUS_SEVEN.svg'
import SevenImage from '../../../../public/assets/svg/LBDH_WEB_GRAPHIC_SEVEN.svg'
import PlusMinusSeven from '../../../../public/assets/svg/LBDH_WEB_GRAPHIC_MINUS_SEVEN.svg'

interface props {
  playGame: () => {}
  setBetOption: Dispatch<SetStateAction<number>>
  setBetAmount: Dispatch<SetStateAction<number>>
  setBetOptionJack: Dispatch<SetStateAction<number>>
  setBetAmountJack: Dispatch<SetStateAction<number>>
  betAmount: number
  betOption: number
  betAmountJack: number
  betOptionJack: number
  activeOpacity: boolean
}


const Seven = ({
  playGame,
  setBetOption,
  setBetAmount,
  setBetOptionJack,
  setBetAmountJack,
  betAmount,
  betOption,
  betAmountJack,
  betOptionJack,
  activeOpacity
}: props) => {
  const [slider1, setSlider1] = useState(
    betAmount === 0.05
      ? "1"
      : betAmount === 0.075
        ? "2"
        : "3"
    // betAmount === 0.05
    // ? "1"
    // : betAmount === 0.1
    // ? "2"
    // : betAmount === 0.25
    // ? "3"
    // : betAmount === 0.5
    // ? "4"
    // : betAmount === 0.75
    // ? "5"
    // : "6"
  )
  const [value, setValue] = useState(betAmount)
  const [sliderValuePosition, setSliderValuePosition] = useState(
    betAmount === 0.05
      ? 5
      : betAmount === 0.075
        ? 182
        : 370
    // betAmount === 0.05
    // ? 5
    // : betAmount === 0.1
    // ? 80
    // : betAmount === 0.25
    // ? 147
    // : betAmount === 0.5
    // ? 222
    // : betAmount === 0.75
    // ? 292
    // : 370
  )


  const onChangeSlider1 = (e: any) => {
    const value = e.target.value
    setSlider1(value)
    switch (value) {
      case "1":
        setBetAmount(0.05)
        setValue(0.05)
        setSliderValuePosition(5)
        break;
      case "2":
        setBetAmount(0.075)
        setValue(0.075)
        setSliderValuePosition(182)
        break;
      case "3":
        setBetAmount(0.1)
        setValue(0.1)
        setSliderValuePosition(370)
        break;
      // case "1":
      //   setBetAmount(0.05)
      //   setValue(0.05)
      //   setSliderValuePosition(5)
      //   break;
      // case "2":
      //   setBetAmount(0.1)
      //   setValue(0.1)
      //   setSliderValuePosition(80)
      //   break;
      // case "3":
      //   setBetAmount(0.25)
      //   setValue(0.25)
      //   setSliderValuePosition(147)
      //   break;
      // case "4":
      //   setBetAmount(0.5)
      //   setValue(0.5)
      //   setSliderValuePosition(222)
      //   break;
      // case "5":
      //   setBetAmount(0.75)
      //   setValue(0.75)
      //   setSliderValuePosition(292)
      //   break;
      // case "6":
      //   setBetAmount(1)
      //   setValue(1)
      //   setSliderValuePosition(370)
      //   break;

      default:
        break;
    }
  }


  const [sevenSelected, setSevenSelected] = useState(
    betOption === -1 ? 0
      : betOption === 2
        ? 1
        : betOption === 0
          ? 2
          : betOption === 1
            ? 3
            : 0
  )

  const _setSevenSelected = (option: number) => {
    setSevenSelected(option)
    if (option === 0) {
      setBetOption(-1)
    }
    if (option === 1) {
      setBetOption(2)
    }
    if (option === 2) {
      setBetOption(0)
    }
    if (option === 3) {
      setBetOption(1)
    }
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-6 lg:mr-10">
        <div className="flex flex-col justify-center  items-center  lg:mt-0">
          <div>
            <div className="flex flex-row">
              <p className="jackpot-section-text">+7 =8-12</p>
              <div className="flex flex-col items-center mx-8">
                <p className="jackpot-section-text">7</p>
                <div className="flex flex-row items-center">
                  <div style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: 'rgb(255,202,132)' }} />
                  <div style={{ width: 200, height: 1, backgroundColor: 'rgb(255,202,132)' }} />
                  <div style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: 'rgb(255,202,132)' }} />
                </div>
              </div>
              <p className="jackpot-section-text">-7 =2-6</p>
            </div>
            <div className="flex flex-row sevens-container justify-center">
              <PlusSeven
                onClick={() => _setSevenSelected(1)}
                className={`cursor-pointer seven-button ${sevenSelected === 1 ? 'seven-button-hover' : ''}`}
              />
              <SevenImage
                onClick={() => _setSevenSelected(2)}
                className={`cursor-pointer seven-button mx-10 sm:mx-20 ${sevenSelected === 2 ? 'seven-button-hover' : ''}`}
              />
              <PlusMinusSeven
                onClick={() => _setSevenSelected(3)}
                className={`cursor-pointer seven-button ${sevenSelected === 3 ? 'seven-button-hover' : ''}`}
              />
            </div>
          </div>

          <div className="slidecontainer relative">
            <input type="range" min="1" max="3" value={slider1} onChange={onChangeSlider1} className="slider" list="tickmarks_seven" />
            <datalist id="tickmarks_seven">
              <option value="1" />
              <option value="2" />
              <option value="3" />
              {/* <option value="3" />
              <option value="4" />
              <option value="5" />
              <option value="6" /> */}
            </datalist>
            <div className="flex flex-row justify-between">
              <p className="jackpot-section-text">0.05 SOL</p>
              <p className="jackpot-section-text">0.1 SOL</p>
            </div>
            <div style={{ position: 'absolute', top: -21, left: sliderValuePosition }}>
              <p className="slider-selected-value">{value}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`col-span-12 flex flex-row justify-center lg:hidden ${activeOpacity ? 'opacity-30 pointer-events-none' : ''}`}>
        <JackpotBetButton
          text='Jackpot Bet'
          className='my-5'
        />
      </div>
      <div className={`col-span-12 lg:col-span-6 ${activeOpacity ? 'opacity-30 pointer-events-none' : ''}`}>
        <JackpotBetSection
          betOptionJack={betOptionJack}
          betAmountJack={betAmountJack}
          setBetAmountJack={setBetAmountJack}
          setBetOptionJack={setBetOptionJack}
          multiplyValues={{
            left: 18,
            right: 36
          }} />
      </div>

    </div>
  )
}

export default Seven