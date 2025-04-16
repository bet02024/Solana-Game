import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import JackpotBetButton from '../../JackpotBetButton'
import JackpotBetSection from '../JackpotBetSection'

import LOW_EYE from '../../../../public/assets/svg/LBDH_WEB_GRAPHIC_LOW EYE.svg'
import OPEN_EYE_RIGHT from '../../../../public/assets/svg/LBDH_WEB_GRAPHIC_OPEN EYE_RIGHT.svg'
import OPEN_EYE_LEFT from '../../../../public/assets/svg/LBDH_WEB_GRAPHIC_OPEN EYE_LEFT.svg'
import HIGH_EYE from '../../../../public/assets/svg/LBDH_WEB_GRAPHIC_HIGH EYE.svg'

interface props {
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

const G5050 = ({
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

  const [eyeSelected, setEyeSelected] = useState(
    betOption === -1 ?
      ''
      : betOption === 3
        ? 'low'
        : betOption === 4
          ? 'hight'
          : ''
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
    let value = e.target.value
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

  useEffect(() => {
    if (eyeSelected === 'low') {
      setBetOption(3)
    }
    if (eyeSelected === 'hight') {
      setBetOption(4)
    }
  }, [eyeSelected])
  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-12 lg:col-span-6 lg:mr-10">
        <div className="flex flex-col justify-center  items-center">
          <div className="flex flex-row">
            <p className="jackpot-section-text">HIGH =8-12</p>
            <div className="flex flex-col items-center mx-8">
              <p className="jackpot-section-text">7=AUTO RE-ROLL</p>
              <div className="flex flex-row items-center">
                <div style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: 'rgb(255,202,132)' }} />
                <div style={{ minWidth: 200, height: 1, backgroundColor: 'rgb(255,202,132)' }} />
                <div style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: 'rgb(255,202,132)' }} />
              </div>
            </div>
            <p className="jackpot-section-text">LOW =2-6</p>
          </div>


          <div className="flex flex-row my-6">
            {
              eyeSelected === 'hight'
                ? <OPEN_EYE_LEFT className='cursor-pointer mr-10 eye-image z-10 eye-image-selected' onClick={() => setEyeSelected('hight')} />
                : <HIGH_EYE className='cursor-pointer mr-10 eye-image z-10' onClick={() => setEyeSelected('hight')} />
            }
            {
              eyeSelected === 'low'
                ? <OPEN_EYE_RIGHT className='cursor-pointer eye-image z-10 eye-image-selected' onClick={() => setEyeSelected('low')} />
                : <LOW_EYE className='cursor-pointer eye-image z-10' onClick={() => setEyeSelected('low')} />
            }
          </div>

          <div className="slidecontainer relative">
            <input type="range" min="1" max="3" step="1" value={slider1} onChange={onChangeSlider1} className="slider" id="myRange_5050" list="tickmarks_5050" />
            <datalist id="tickmarks_5050">
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
            'left': 15,
            'right': 30
          }}
        />
      </div>
    </div>
  )
}

export default G5050